<?php
// no outside access
if (!defined('WPINC')) die('No access outside of wordpress.');

add_filter('woocommerce_checkout_fields', 'ffl_checkout_fields');
function ffl_checkout_fields($fields)
{
    if (order_contain_firearms()){
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

add_action('woocommerce_after_checkout_validation', 'ffl_checkout_validation', 10, 2);
function ffl_checkout_validation($data, $errors)
{
    if (order_contain_firearms()) {

        if (empty($data['shipping_fflno'])) {
            $errors->add('validation', "You must search for and select a FFL from the list.");
            return;
        }

        if (empty($data['shipping_fflexp'])) {
            $errors->add('validation', "FFL Expiration Data Required.");
            return;
        }

    }
}

add_action('add_meta_boxes_shop_order', 'ffl_order_meta_box');
function ffl_order_meta_box()
{
    add_meta_box(
        'ffl-order-meta-box',
        __('FFL Information'),
        'ffl_order_meta_box_html',
        'shop_order',
        'normal',
        'high'
    );
}

function ffl_order_meta_box_html()
{
    global $post_id;
    $order = new WC_Order( $post_id );
    $ffl_onfile = (get_post_meta($order->get_id(), '_shipping_ffl_onfile', true ) == 'Yes');
    $ffl_license = get_post_meta($order->get_id(), '_shipping_fflno', true );
    $ffl_short = str_replace('-','',$ffl_license);  
    $ffl_short = substr($ffl_short, 0, 3) . substr($ffl_short, -5);
    $ffl_expiration = get_post_meta($order->get_id(), '_shipping_fflexp', true);
    $ffl_email = get_post_meta($order->get_id(), '_shipping_email', true);
    $ffl_customer = get_post_meta($order->get_id(), '_shipping_first_name', true) . ' ' . get_post_meta($order->get_id(), '_shipping_last_name', true);
    if ($ffl_license ==""){
        echo '<strong>FFL shipment is not required for this Order</strong>';
        return;
    }

    echo '
        <p><strong>FFL License Number:</strong> ' . esc_attr($ffl_license) . '<br>
        <strong>FFL Expiration Date:</strong> ' . esc_attr($ffl_expiration) . '<br>
        ';
    
    if ($ffl_email!=""){
        echo '<strong>FFL Email:</strong> ' . esc_attr($ffl_email) . '<br>';
    }

    echo '
        <strong>Shipment For:</strong> ' . esc_attr($ffl_customer) . '</p>
        <table>
            <tr>
                <td><div><a id="atf_ezcheck" class="button alt">ATF ezCheck</a></div></td>
                <td>&nbsp;</td>
                <td><div id="ffl_upload_download"></div></td>
            </tr>
        </table>';
        $aKey = get_option('ffl_api_key_option');
        $ezCheckLink = "https://fflezcheck.atf.gov/FFLEzCheck/fflSearch?licsRegn=" . substr($ffl_license,0,1) . "&licsDis=" . substr($ffl_license,2,2) . "&licsSeq=" . substr($ffl_license,-5,5);   
        echo '<script>
                document.getElementById("atf_ezcheck").addEventListener("click", function(){
                    window.open("',esc_url_raw($ezCheckLink),'", "_blank", "location=yes, scrollbars=yes,status=yes"); 
                });

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
                            fetch("https://ffl-api.garidium.com/garidium-ffls/uploads%2F" + file.name, { 
                                method: "PUT",
                                headers: {
                                    "x-api-key": "',esc_attr($aKey),'",
                                },
                                body: file
                            })
                            .then(
                                success => {alert("Upload Successful, we will process the FFL and make it available for the next order shipping to this FFL. Thank you for your contribution!");} 
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
              </script>';
}

function order_contain_firearms()
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
