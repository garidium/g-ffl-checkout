<?php
// no outside access
if (!defined('WPINC')) die('No access outside of wordpress.');

add_filter('woocommerce_checkout_fields', 'ffl_checkout_fields');
function ffl_checkout_fields($fields)
{
    // check to see if the candr override exists
    if (isset($_COOKIE["g_ffl_checkout_candr_override"])) {
        $candr_license_value = isset($_COOKIE["candr_license"]) ? $_COOKIE["candr_license"] : '';
        $fields['billing']['candr_license'] = array(
            'type'          => 'text',
            'required'      => true, 
            'readonly'      => true, 
            'label'         => 'C&R License'
        );
        return $fields;
    }
    if (order_requires_ffl_selector()){
        return ffl_customize_checkout_fields($fields);   
    }else{
        return $fields;
    }
}

function ffl_customize_checkout_fields($fields)
{
    unset($fields['shipping']['shipping_address_2']);
    
    $fields['shipping']['shipping_company'] = array(
        'type' => 'hidden',
    );
    $fields['shipping']['shipping_address_1'] = array(
        'type' => 'hidden',
    );
    $fields['shipping']['shipping_city'] = array(
        'type' => 'hidden',
    );
    /*
    $fields['shipping']['shipping_state'] = array(
        'type' => 'hidden',
    );
    $fields['shipping']['shipping_country'] = array(
        'type' => 'hidden',
    );
    */
    $fields['shipping']['shipping_postcode'] = array(
        'type' => 'hidden',
    );

    $fields['shipping']['shipping_phone'] = array(
        'type' => 'hidden',
        'required' => false,
    );

    $fields['shipping']['shipping_email'] = array(
        'type' => 'hidden',
        'required' => false,
    );

    $fields['shipping']['shipping_fflno'] = array(
        'type'          => 'hidden',
        'required'      => true, 
        );

    $fields['shipping']['shipping_fflexp'] = array(
        'type'          => 'hidden',
        'required'      => true, 
        );

    $fields['shipping']['shipping_ffl_onfile'] = array(
        'type'          => 'hidden',
        'required'      => true, 
        );


    return $fields;
}
// Hook to add order metadata after checkout validation
add_action('woocommerce_checkout_create_order', 'add_custom_order_metadata', 10, 2);
function add_custom_order_metadata($order, $data) {
    if (isset($_COOKIE["g_ffl_checkout_candr_override"])) {
        if (isset($_COOKIE["candr_license"])){
            $order->update_meta_data('_candr_license', $_COOKIE["candr_license"]);
            // Set the cookie to expire in the past (i.e., immediately expire)
            setcookie('g_ffl_checkout_candr_override', '', time() - 3600, '/'); // Set the expiration time to a past timestamp
            setcookie('candr_license', '', time() - 3600, '/'); // Set the expiration time to a past timestamp

            // Unset the cookie from the $_COOKIE superglobal (optional but recommended for immediate effect)
            unset($_COOKIE['g_ffl_checkout_candr_override']);
            unset($_COOKIE['candr_license']);
        }
    }
}

add_action('woocommerce_after_checkout_validation', 'ffl_checkout_validation', 10, 2);
function ffl_checkout_validation($data, $errors)
{
    // check to see if the candr override exists
    if (isset($_COOKIE["g_ffl_checkout_candr_override"])) {
        if (empty($data['candr_license'])) {
            $errors->add('validation', "C&R wasn't set, please close your browser and retry.");
            return;
        }
        return;
    }

    if (order_requires_ffl_selector()) {

        if (empty($data['shipping_fflno'])) {
            $errors->add('validation', "You must search for and select a FFL from the list.");
            return;
        }else{
            // set the favorite FFL cookie for this customer
            setcookie('g_ffl_checkout_favorite_ffl', $data['shipping_fflno']);     
        }

        if (empty($data['shipping_fflexp'])) {
            $errors->add('validation', "FFL Expiration Data Required.");
            return;
        }
    }
}

use Automattic\WooCommerce\Internal\DataStores\Orders\CustomOrdersTableController;
add_action('add_meta_boxes', 'ffl_order_meta_box');
function ffl_order_meta_box()
{
    $screen = wc_get_container()->get( CustomOrdersTableController::class )->custom_orders_table_usage_is_enabled()
    ? wc_get_page_screen_id( 'shop-order' )
    : 'shop_order';

    add_meta_box(
        'ffl-order-meta-box',
        __('FFL Information'),
        'ffl_order_meta_box_html',
        $screen,
        'normal',
        'high'
    );
}

add_action( 'wp_ajax_update_order_ffl', 'update_order_ffl' );
function update_order_ffl()
{
    // Get the order object
    $new_ffl = $_POST['new_ffl'];
    $order_id = $_POST['order_id'];

    $order = wc_get_order($order_id);
    $aKey = get_option('ffl_api_key_option');
    
 
    // Prepare the headers for the POST request
    $headers = array(
        'origin' => get_site_url(),
        'Accept' => 'application/json',
        'Content-Type' => 'application/json',
        'x-api-key' => esc_attr($aKey)
    );

    // Call the web service with a POST request
    $api_url = 'https://ffl-api.garidium.com';
    $body = '{"action": "get_ffl_list", "data": {"license_number": "'.$new_ffl.'"}}';

    $response = wp_safe_remote_post($api_url, array(
        'headers' => $headers,
        'body' => $body
    ));
    
    $ffl = wp_remote_retrieve_body($response);
    $ffl = json_decode($ffl, true)[0];
    
    if (strlen($ffl['license_number']) == 20){
        // Update meta_data
        $new_meta_data = array(
            array('key' => '_shipping_email', 'value' => $ffl['email']),
            array('key' => '_shipping_fflno', 'value' => $ffl['license_number']),
            array('key' => '_shipping_fflexp', 'value' => $ffl['expiration_date']),
            array('key' => '_shipping_ffl_onfile', 'value' => $ffl['ffl_on_file']?"Yes":"No"),
            array('key' => 'is_vat_exempt', 'value' => 'no'),
        );
        // Update the order's meta_data and shipping fields
        $order->update_meta_data('_shipping_email', $ffl['email']);
        $order->update_meta_data('_shipping_fflno', $ffl['license_number']);
        $order->update_meta_data('_shipping_fflexp', $ffl['expiration_date']);
        $order->update_meta_data('_shipping_ffl_onfile', $ffl['ffl_on_file']?"Yes":"No");
        $order->update_meta_data('is_vat_exempt', 'no');
        
    
        // Update shipping fields
        $shipping_address = array(
            'first_name' => $order->get_shipping_first_name(),
            'last_name'  => $order->get_shipping_last_name(),
            'company'    => $ffl['list_name'],
            'address_1'  => $ffl['premise_street'],
            'address_2'  => '',
            'city'       => $ffl['premise_city'],
            'state'      => $ffl['premise_state'],
            'postcode'   => $ffl['premise_zip_code'],
            'country'    => 'US',
            'phone'      => $ffl['voice_phone']
        );
        
        $order->set_shipping_address($shipping_address);
    
        // Save the changes
        $order->save();
        echo 'success';
    }else{
        echo 'The FFL License Number provided did not match a record in our ATF database. Please try again. If the error persists please contact support@garidium.com';
    }
    wp_die(); 

}

function ffl_order_meta_box_html($post_or_order_object)
{
    global $post_id;
    $order = ( $post_or_order_object instanceof WP_Post ) ? wc_get_order( $post_or_order_object->ID ) : $post_or_order_object;
    $order_id = $order->get_id();
    $aKey = get_option('ffl_api_key_option');

    // Get the "_candr_license" metadata for the order
    $candr_license = get_post_meta($order_id, '_candr_license', true);

    // Check if the metadata exists and is not empty
    if (!empty($candr_license)) {
        echo 'C&R License: <a style="cursor:pointer;" id="download_candr">' . $candr_license .'</a><br>
        <script>
        document.getElementById("download_candr").addEventListener("click", function(){
            fetch("https://ffl-api.garidium.com/download", {
                method: "POST",
                headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-api-key": "',esc_attr($aKey),'",
                },
                body: JSON.stringify({"candr": "',esc_attr($candr_license),'"})
            })
            .then(response=>response.json())
            .then(data=>{ 
                window.open(data, "_blank", "location=yes, scrollbars=yes,status=yes");         
            });
        });
        </script>
        ';

        return;
    }

    $ffl_name = get_post_meta($order->get_id(), '_shipping_company', true);
    $ffl_onfile = (get_post_meta($order->get_id(), '_shipping_ffl_onfile', true ) == 'Yes');
    $ffl_license = get_post_meta($order->get_id(), '_shipping_fflno', true );
    $ffl_phone = get_post_meta($order->get_id(), '_shipping_phone', true );
    $ffl_short = str_replace('-','',$ffl_license);  
    $ffl_short = substr($ffl_short, 0, 3) . substr($ffl_short, -5);
    $ffl_expiration = get_post_meta($order->get_id(), '_shipping_fflexp', true);
    $ffl_email = get_post_meta($order->get_id(), '_shipping_email', true);
    $ffl_customer = get_post_meta($order->get_id(), '_shipping_first_name', true) . ' ' . get_post_meta($order->get_id(), '_shipping_last_name', true);

    if ($ffl_license == ""){
        if ($post_id == "") {
            echo 'You must create the order before adding a FFL';
        } else {
            echo '
            <table>
                <tr>
                    <td>
                        <div><a id="change_ffl" class="button alt">Add FFL to Order</a></div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">
                        <div id="change_ffl_form" style="display:none;">
                            <br>License Number (X-XX-XXX-XX-XX-XXXXX):<br><input style="width:200px;" maxlength=20 type="text" id="new_ffl">
                            <a id="save_new_ffl" class="button alt">Update</a>
                            <a id="cancel_new_ffl" class="button alt">Cancel</a>
                        </div>
                    </td>
                </tr>
            </table>';
        }
    } else {
        echo '
            <p>
            <strong>Name:</strong> ' . esc_attr($ffl_name) . '<br>
            <strong>License Number:</strong> ' . esc_attr($ffl_license) . '<br>
            <strong>Expiration Date:</strong> ' . esc_attr($ffl_expiration) . '<br>
            ';
        
        if ($ffl_email!=""){
            echo '<strong>Email:</strong> ' . esc_attr($ffl_email) . '<br>';
        }
        echo '<strong>Phone:</strong> ' . esc_attr($ffl_phone) . '<br>';

        echo '<strong>Shipment For:</strong> ' . esc_attr($ffl_customer) . '</p>
            <table>
                <tr>
                    <td>
                        <div><a id="change_ffl" class="button alt">Change FFL</a></div>
                    </td>
                    <td>&nbsp;</td>
                    <td><div><a id="atf_ezcheck" class="button alt">ATF ezCheck</a></div></td>
                    <td>&nbsp;</td>
                    <td><div id="ffl_upload_download"></div></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <div id="change_ffl_form" style="display:none;">
                            <br>License Number (X-XX-XXX-XX-XX-XXXXX):<br><input style="width:200px;" maxlength=20 type="text" id="new_ffl">
                            <a id="save_new_ffl" class="button alt">Update</a>
                            <a id="cancel_new_ffl" class="button alt">Cancel</a>
                        </div>
                    </td>
                </tr>
            </table>';
            $ezCheckLink = "https://fflezcheck.atf.gov/FFLEzCheck/fflSearch?licsRegn=" . substr($ffl_license,0,1) . "&licsDis=" . substr($ffl_license,2,2) . "&licsSeq=" . substr($ffl_license,-5,5);   
            echo '<script>
                    document.getElementById("atf_ezcheck").addEventListener("click", function(){
                        window.open("',esc_url_raw($ezCheckLink),'", "_blank", "location=yes, scrollbars=yes,status=yes"); 
                    });
                 </script>';
    }
    echo '<script>
            document.getElementById("change_ffl").addEventListener("click", function(){
                document.getElementById("change_ffl_form").style.display=""; 
            });

            document.getElementById("cancel_new_ffl").addEventListener("click", function(){
                document.getElementById("change_ffl_form").style.display="none"; 
            });
            document.getElementById("save_new_ffl").addEventListener("click", function(){
                var new_ffl_input = document.getElementById("new_ffl").value;
                if (new_ffl_input.length!=20 || new_ffl_input.indexOf("-") < 0){
                    alert("The FFL must be properly formatted!"); 
                    return;
                }else{
                    document.getElementById("save_new_ffl").disabled = true;
                    document.getElementById("change_ffl_form").innerHTML = "<br><span style=\"font-weight:bold;color:red;font-style:italic;\">Updating FFL Please wait...</span>";
                    jQuery.ajax({
                        type: "POST",
                        url: "',admin_url('admin-ajax.php'),'",
                        data:{action:"update_order_ffl", order_id: "',esc_attr($order_id),'" , new_ffl: new_ffl_input},
                        success:function(response) {
                            if (response!="success"){alert(response);}
                            window.location.reload();
                        }
                    });
                }    
            });
    
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            async function reload() {
                await sleep(10000);
                load_ffl();
            }
            
            function load_ffl(){
                fetch("https://ffl-api.garidium.com", {
                    method: "POST",
                    headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": "',esc_attr($aKey),'",
                    },
                    body: JSON.stringify({"action": "get_ffl_list", "data": {"license_number": "',esc_attr($ffl_license),'"}})
                })
                .then(response=>response.json())
                .then(data=>{ 
                    var onFile = data[0].ffl_on_file;  
                    if (onFile){
                        document.getElementById("ffl_upload_download").innerHTML = "<a id=\"download_ffl\" class=\"button alt\" data-marker-id=\"" + data[0].short_lic_nodash + "\">Download FFL</a>";
                        document.getElementById("download_ffl").addEventListener("click", function(){
                            if (window.confirm("It is your responsibility to ensure the receiving FFL is valid (using ezCHeck) and is willing and able to accept transfers. Do not assume that is the case because this FFL is on-file. If you have an issue with a transfer and the FFL should be removed, please contact us at sales@garidium.com with the FFL number to remove. If the download is not working, try again, check popup-blockers.")){
                                fetch("https://ffl-api.garidium.com/download", {
                                    method: "POST",
                                    headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    "x-api-key": "',esc_attr($aKey),'",
                                    },
                                    body: JSON.stringify({"fflno": "',esc_attr($ffl_short),'"})
                                })
                                .then(response=>response.json())
                                .then(data=>{ 
                                    window.open(data, "_blank", "location=yes, scrollbars=yes,status=yes");         
                                });
                            }
                        });

                    }else{
                        document.getElementById("ffl_upload_download").innerHTML = "<strong>Upload a FFL to the g-FFL eFile System:</strong><input type=\"file\" id=\"ffl_upload_filename\"><a id=\"upload_ffl\" class=\"button alt\">Upload FFL</a>";
                        // Select your input type file and store it in a variable
                        const input = document.getElementById("ffl_upload_filename");
                        // This will upload the file after having read it
                        const upload = (file) => {
                            console.log("Uploading File Name = " + file.name);
                            var ext = file.name.split(".").pop();
                            var newFileName = "',esc_attr($ffl_short),'" + "." + ext;
                            fetch("https://ffl-api.garidium.com/garidium-ffls/uploads%2F" + newFileName, { 
                                method: "PUT",
                                headers: {
                                    "x-api-key": "',esc_attr($aKey),'",
                                },
                                body: file
                            })
                            .then(
                                success => {
                                    alert("Upload Successful, we will process the FFL and make it available for the next order shipping to this FFL. Thank you for your contribution!");
                                    document.getElementById("ffl_upload_download").innerHTML = "";
                                    reload();
                                } 
                            ).catch(
                                error => {alert("There was an Error uploading the FFL, please try again.");console.log(error);}
                            );
                        };    
                        // Event handler executed when a file is selected
                        const onSelectFile = () => upload(input.files[0]);

                        // Add a listener on your input
                        // It will be triggered when a file will be selected
                        document.getElementById("upload_ffl").addEventListener("click", onSelectFile, false);
                    }    
                });
            }
            load_ffl();
            </script>';
}

function order_requires_ffl_selector()
{
    $contain_firearms = false;
    foreach (WC()->cart->get_cart() as $cart_item) {
        $_product = wc_get_product($cart_item['data']->get_id());
        if (isset($_product->get_data()['parent_id']) && $_product->get_data()['parent_id'] != 0) {
            $_parent_product = wc_get_product($_product->get_data()['parent_id']);
            $firearm = $_parent_product->get_meta('_firearm_product');
        } else {
            $firearm = $_product->get_meta('_firearm_product');
        }
        if (isset($firearm)) {
            if ($firearm === 'yes') {
                $contain_firearms = true;
                break;
            }
        }
    }
    return $contain_firearms;
}
