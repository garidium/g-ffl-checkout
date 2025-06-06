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
    
    if (order_requires_ffl_selector()) {
        $mixed_cart_support = get_option('ffl_mixed_cart_support') === 'Yes';
        $is_mixed_cart = order_contains_mixed_cart();
        
        // If mixed cart support is enabled and this is a mixed cart, show shipping fields
        if ($mixed_cart_support && $is_mixed_cart) {
            return ffl_add_mixed_cart_fields($fields);
        } else {
            // Original FFL-only behavior - hide shipping fields
            return ffl_customize_checkout_fields($fields);   
        }
    } else {
        return $fields;
    }
}

function ffl_customize_checkout_fields($fields)
{
    unset($fields['shipping']['shipping_address_2']);

    $fields['shipping']['shipping_address_1'] = array(
        'type' => 'hidden',
    );
    $fields['shipping']['shipping_city'] = array(
        'type' => 'hidden',
    );
    $fields['shipping']['shipping_state'] = array(
        'type' => 'hidden',
    );
    $fields['shipping']['shipping_country'] = array(
        'type' => 'hidden',
    );
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
        'required'      => false, 
        );

    // Add FFL name and phone fields for order tracking
    $fields['shipping']['shipping_ffl_name'] = array(
        'type'          => 'hidden',
        'required'      => false, 
        );

    $fields['shipping']['shipping_ffl_phone'] = array(
        'type'          => 'hidden',
        'required'      => false, 
        );

    return $fields;
}

function ffl_add_mixed_cart_fields($fields)
{
    // For mixed carts, keep shipping fields visible but add FFL-specific hidden fields
    unset($fields['shipping']['shipping_address_2']);

    // Add FFL-specific fields as hidden
    $fields['shipping']['shipping_fflno'] = array(
        'type'          => 'hidden',
        'required'      => true, 
        );

    $fields['shipping']['shipping_fflexp'] = array(
        'type'          => 'hidden',
        'required'      => true, 
        );

    $fields['shipping']['shipping_company'] = array(
        'type' => 'hidden',
    );

    // Add FFL name and phone fields for order tracking
    $fields['shipping']['shipping_ffl_name'] = array(
        'type'          => 'hidden',
        'required'      => false, 
        );

    $fields['shipping']['shipping_ffl_phone'] = array(
        'type'          => 'hidden',
        'required'      => false, 
        );

    $fields['shipping']['shipping_ffl_onfile'] = array(
        'type'          => 'hidden',
        'required'      => false, 
        );

    // This issue popped up on some sites where the shipping company label was still appearing for some reason
    echo '<style>
        label[for="shipping_company"] {
            display: none !important;
        }
    </style>';

    return $fields;
}

function set_secure_cookie($name, $value, $days = 90, $path = '/', $domain = '', $httponly = true) {
    $expiration = time() + (86400 * $days);
    $secure = isset($_SERVER['HTTPS']) ? true : false;
    setcookie($name, $value, $expiration, $path, $domain, $secure, $httponly);
}

// Hook to add order metadata after checkout validation
add_action('woocommerce_checkout_create_order', 'add_custom_order_metadata', 10, 2);
function add_custom_order_metadata($order, $data) {
    if (isset($_COOKIE["g_ffl_checkout_candr_override"])) {
        if (isset($_COOKIE["candr_license"])){
            $order->update_meta_data('_candr_license', $_COOKIE["candr_license"]);
            // Set the cookie to expire in the past (i.e., immediately expire)
            set_secure_cookie('g_ffl_checkout_candr_override', '', -1);
            set_secure_cookie('candr_license', '', -1);
            
            // Unset the cookie from the $_COOKIE superglobal (optional but recommended for immediate effect)
            unset($_COOKIE['g_ffl_checkout_candr_override']);
            unset($_COOKIE['candr_license']);
        }
    }
    
    // Track mixed cart orders for better order management
    if (order_requires_ffl_selector()) {
        $mixed_cart_support = get_option('ffl_mixed_cart_support') === 'Yes';
        $is_mixed_cart = order_contains_mixed_cart();
        
        if ($mixed_cart_support && $is_mixed_cart) {
            $order->update_meta_data('_is_mixed_cart_order', 'yes');
            $order->add_order_note('Mixed cart order: FFL items will be shipped to selected dealer, other items to customer address.');
        }
        
        // Store FFL metadata for the order
        if (!empty($data['shipping_fflno'])) {
            $order->update_meta_data('_shipping_fflno', $data['shipping_fflno']);
        }
        if (!empty($data['shipping_fflexp'])) {
            $order->update_meta_data('_shipping_fflexp', $data['shipping_fflexp']);
        }
        if (!empty($data['shipping_ffl_onfile'])) {
            $order->update_meta_data('_shipping_ffl_onfile', $data['shipping_ffl_onfile']);
        }
        if (!empty($data['shipping_ffl_name'])) {
            $order->update_meta_data('_shipping_ffl_name', $data['shipping_ffl_name']);
        }
        if (!empty($data['shipping_ffl_phone'])) {
            $order->update_meta_data('_shipping_ffl_phone', $data['shipping_ffl_phone']);
        }
        
        // Ensure shipping state is saved for FFL orders
        if (!empty($data['shipping_state'])) {
            $order->update_meta_data('_shipping_state', $data['shipping_state']);
            // Also update the actual shipping address state
            $shipping_address = $order->get_address('shipping');
            $shipping_address['state'] = $data['shipping_state'];
            $order->set_address($shipping_address, 'shipping');
        }
        
        // Ensure shipping country is saved for FFL orders
        if (!empty($data['shipping_country'])) {
            $order->update_meta_data('_shipping_country', $data['shipping_country']);
            // Also update the actual shipping address country
            $shipping_address = $order->get_address('shipping');
            $shipping_address['country'] = $data['shipping_country'];
            $order->set_address($shipping_address, 'shipping');
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
        $mixed_cart_support = get_option('ffl_mixed_cart_support') === 'Yes';
        $is_mixed_cart = order_contains_mixed_cart();

        // Validate FFL selection
        if (empty($data['shipping_fflno'])) {
            $errors->add('validation', "You must search or and select a FFL from the list. Enter a Zip Code near your FFL and click on Find FFL. If you selected a FFL ans still see this error, go to the My Account menu item and sign in first. Then try again.");
            return;
        }else{
            // set the favorite FFL cookie for this customer
            set_secure_cookie('g_ffl_checkout_favorite_ffl', $data['shipping_fflno']);
        }

        if (empty($data['shipping_fflexp'])) {
            $errors->add('validation', "FFL Expiration Data Required.");
            return;
        }

        // Additional validation for mixed carts
        if ($mixed_cart_support && $is_mixed_cart) {
            // Ensure customer shipping address is complete for non-FFL items
            $required_fields = ['shipping_first_name', 'shipping_last_name', 'shipping_address_1', 'shipping_city', 'shipping_postcode', 'shipping_state', 'shipping_country'];
            
            foreach ($required_fields as $field) {
                if (empty($data[$field])) {
                    $field_label = str_replace('shipping_', '', $field);
                    $field_label = str_replace('_', ' ', $field_label);
                    $field_label = ucwords($field_label);
                    $errors->add('validation', "Mixed cart requires complete shipping address. Please fill in: {$field_label}");
                    break;
                }
            }

            // Warn if customer address matches FFL address (potential confusion)
            if (!empty($data['shipping_address_1']) && !empty($data['shipping_fflno'])) {
                // This is a soft warning - could be enhanced with actual FFL address comparison
                // For now, we'll add this as a comment for future enhancement
                // TODO: Compare customer address with selected FFL address and warn if they match
            }
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
        
        $order->update_meta_data('_shipping_ffl_name', ffl_get_best_name($ffl));
        $order->update_meta_data('_shipping_ffl_phone', $ffl['voice_phone']);
    
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
    $order = ( $post_or_order_object instanceof WP_Post ) ? wc_get_order( $post_or_order_object->ID ) : $post_or_order_object;
    $order_id = $order->get_id();
    $aKey = get_option('ffl_api_key_option');

    // Get the "_candr_license" metadata for the order
    $candr_license = $order->get_meta('_candr_license', true);

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

    $ffl_name = $order->get_shipping_company();
    $ffl_onfile = $order->get_meta('_shipping_ffl_onfile', true ) == 'Yes';
    $ffl_license = $order->get_meta('_shipping_fflno', true );
    $ffl_phone = $order->get_shipping_phone();
    $ffl_short = str_replace('-','',$ffl_license);  
    $ffl_short = substr($ffl_short, 0, 3) . substr($ffl_short, -5);
    $ffl_expiration = $order->get_meta('_shipping_fflexp', true);
    $ffl_email = $order->get_meta('_shipping_email', true);
    $ffl_customer = $order->get_shipping_first_name() . ' ' . $order->get_shipping_last_name();
    
    $status = $order->get_status();
    
    if ($ffl_license == ""){
        if ($status == "auto-draft") {
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

// Display FFL information in order admin area
add_action('woocommerce_admin_order_data_after_shipping_address', 'display_ffl_info_in_order_admin');
function display_ffl_info_in_order_admin($order) {
    $ffl_license = $order->get_meta('_shipping_fflno');
    $ffl_name = $order->get_meta('_shipping_ffl_name');
    $ffl_phone = $order->get_meta('_shipping_ffl_phone');
    $ffl_expiry = $order->get_meta('_shipping_fflexp');
    $ffl_on_file = $order->get_meta('_shipping_ffl_onfile');
    
    // Only display if we have FFL information
    if (!empty($ffl_license)) {
        echo '<h3>FFL Information</h3>';
        echo '<div class="ffl-info-box" style="background: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin: 10px 0;">';
        
        if (!empty($ffl_name)) {
            echo '<p><strong>Name:</strong> ' . esc_html($ffl_name) . '</p>';
        }
        
        echo '<p><strong>License Number:</strong> ' . esc_html($ffl_license) . '</p>';
        
        if (!empty($ffl_expiry)) {
            echo '<p><strong>Expiration Date:</strong> ' . esc_html($ffl_expiry) . '</p>';
        }
        
        if (!empty($ffl_phone)) {
            echo '<p><strong>Phone:</strong> ' . esc_html($ffl_phone) . '</p>';
        }
        
        if (!empty($ffl_on_file)) {
            echo '<p><strong>FFL On File:</strong> ' . esc_html($ffl_on_file) . '</p>';
        }
        
        // Show shipping information based on order type
        $is_mixed_cart = $order->get_meta('_is_mixed_cart_order');
        if ($is_mixed_cart === 'yes') {
            echo '<p style="color: #0073aa; font-weight: bold;">Mixed Cart Order: FFL items ship to dealer, other items to customer address.</p>';
        } else {
            echo '<p style="color: #d63638; font-weight: bold;">FFL-Only Order: All items ship to dealer.</p>';
        }
        
        echo '</div>';
    }
}

// Also display FFL info in order emails
add_action('woocommerce_email_order_meta', 'display_ffl_info_in_email', 10, 3);
function display_ffl_info_in_email($order, $sent_to_admin, $plain_text) {
    $ffl_license = $order->get_meta('_shipping_fflno');
    $ffl_name = $order->get_meta('_shipping_ffl_name');
    $ffl_phone = $order->get_meta('_shipping_ffl_phone');
    
    // Only display if we have FFL information
    if (!empty($ffl_license)) {
        if ($plain_text) {
            echo "\n" . "FFL INFORMATION:\n";
            if (!empty($ffl_name)) {
                echo "Name: " . $ffl_name . "\n";
            }
            echo "License Number: " . $ffl_license . "\n";
            if (!empty($ffl_phone)) {
                echo "Phone: " . $ffl_phone . "\n";
            }
            echo "\n";
        } else {
            echo '<h3>FFL Information</h3>';
            echo '<div style="background: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin: 10px 0;">';
            
            if (!empty($ffl_name)) {
                echo '<p><strong>Name:</strong> ' . esc_html($ffl_name) . '</p>';
            }
            
            echo '<p><strong>License Number:</strong> ' . esc_html($ffl_license) . '</p>';
            
            if (!empty($ffl_phone)) {
                echo '<p><strong>Phone:</strong> ' . esc_html($ffl_phone) . '</p>';
            }
            
            echo '</div>';
        }
    }
}

function order_requires_ffl_selector()
{
    // Check if WooCommerce cart is initialized
    if ( ! WC()->cart ) {
        return false; // No cart available, so no firearms in the order
    }

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

function order_contains_mixed_cart()
{
    // Check if WooCommerce cart is initialized
    if ( ! WC()->cart ) {
        return false; // No cart available
    }

    $has_firearms = false;
    $has_non_firearms = false;
    
    foreach (WC()->cart->get_cart() as $cart_item) {
        $_product = wc_get_product($cart_item['data']->get_id());
        if (isset($_product->get_data()['parent_id']) && $_product->get_data()['parent_id'] != 0) {
            $_parent_product = wc_get_product($_product->get_data()['parent_id']);
            $firearm = $_parent_product->get_meta('_firearm_product');
        } else {
            $firearm = $_product->get_meta('_firearm_product');
        }
        
        if (isset($firearm) && $firearm === 'yes') {
            $has_firearms = true;
        } else {
            $has_non_firearms = true;
        }
        
        // If we have both, it's a mixed cart
        if ($has_firearms && $has_non_firearms) {
            return true;
        }
    }
    
    return false;
}

// Debug function to check FFL field values
add_action('woocommerce_checkout_order_processed', 'debug_ffl_fields', 10, 1);
function debug_ffl_fields($order_id) {
    $order = wc_get_order($order_id);
    
    // Log FFL field values for debugging
    error_log('FFL Debug - Order ID: ' . $order_id);
    error_log('FFL License: ' . $order->get_meta('_shipping_fflno'));
    error_log('FFL Name: ' . $order->get_meta('_shipping_ffl_name'));
    error_log('FFL Phone: ' . $order->get_meta('_shipping_ffl_phone'));
    error_log('FFL Expiry: ' . $order->get_meta('_shipping_fflexp'));
    error_log('FFL On File: ' . $order->get_meta('_shipping_ffl_onfile'));
    error_log('Mixed Cart: ' . $order->get_meta('_is_mixed_cart_order'));
    error_log('Shipping State (meta): ' . $order->get_meta('_shipping_state'));
    error_log('Shipping Country (meta): ' . $order->get_meta('_shipping_country'));
    error_log('Shipping State (address): ' . $order->get_shipping_state());
    error_log('Shipping Country (address): ' . $order->get_shipping_country());
}

// Display FFL information on customer order view
add_action('woocommerce_order_details_after_customer_details', 'display_ffl_info_customer_order');
function display_ffl_info_customer_order($order) {
    $ffl_license = $order->get_meta('_shipping_fflno');
    $ffl_name = $order->get_meta('_shipping_ffl_name');
    $ffl_phone = $order->get_meta('_shipping_ffl_phone');
    
    // Only display if we have FFL information
    if (!empty($ffl_license)) {
        echo '<section class="woocommerce-customer-details">';
        echo '<h2 class="woocommerce-column__title">FFL Dealer Information</h2>';
        echo '<address>';
        
        if (!empty($ffl_name)) {
            echo '<p><strong>Dealer Name:</strong> ' . esc_html($ffl_name) . '</p>';
        }
        
        echo '<p><strong>FFL License:</strong> ' . esc_html($ffl_license) . '</p>';
        
        if (!empty($ffl_phone)) {
            echo '<p><strong>Phone:</strong> ' . esc_html($ffl_phone) . '</p>';
        }
        
        // Show shipping information based on order type
        $is_mixed_cart = $order->get_meta('_is_mixed_cart_order');
        if ($is_mixed_cart === 'yes') {
            echo '<p style="color: #0073aa;"><em>Your firearm items will be shipped to this dealer. Other items will be sent to your shipping address.</em></p>';
        } else {
            echo '<p style="color: #d63638;"><em>All items will be shipped to this FFL dealer.</em></p>';
        }
        
        echo '</address>';
        echo '</section>';
    }
}

// Helper function to get the best available FFL name from FFL data array
function ffl_get_best_name($ffl) {
    $fields = ['list_name', 'company_name', 'business_name', 'name', 'trading_name', 'license_name'];
    foreach ($fields as $field) {
        if (!empty($ffl[$field])) {
            return trim($ffl[$field]);
        }
    }
    if (!empty($ffl['first_name']) && !empty($ffl['last_name'])) {
        return trim($ffl['first_name'] . ' ' . $ffl['last_name']);
    }
    if (!empty($ffl['license_number'])) {
        return 'FFL #' . $ffl['license_number'];
    }
    return 'FFL Dealer';
}
