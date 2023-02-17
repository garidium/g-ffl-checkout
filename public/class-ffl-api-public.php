<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       garidium.com
 * @since      1.0.0
 *
 * @package    G_ffl_Api
 * @subpackage G_ffl_Api/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    G_ffl_Api
 * @subpackage G_ffl_Api/public
 * @author     Big G <sales@garidium.com>
 */
class G_ffl_Api_Public
{

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $plugin_name The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string $version The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @param string $plugin_name The name of the plugin.
     * @param string $version The version of this plugin.
     * @since    1.0.0
     */
    public function __construct($plugin_name, $version)
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Ffl_Api_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Ffl_Api_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

//		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/ffl-api-public.css', array(), $this->version, 'all' );

    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Ffl_Api_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Ffl_Api_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/ffl-api-widget.js', array( 'jquery' ), $this->version, false );
        wp_enqueue_script($this->plugin_name . '_init', plugin_dir_url(__FILE__) . 'js/ffl-api-public.js', array('jquery', $this->plugin_name), $this->version, false);
    }

    function ffl_woo_checkout()
    {
        $aKey = esc_attr(get_option('ffl_api_key_option'));
        
        if ($aKey === '') {
            return false;
        }

        global $woocommerce;
        $items = $woocommerce->cart->get_cart();

        $fireArmCount = 0;
        foreach ($items as $item => $values) {
            $_product = wc_get_product($values['data']->get_id());

            if (isset($_product->get_data()['parent_id']) && $_product->get_data()['parent_id'] != 0) {
                $_parent_product = wc_get_product($_product->get_data()['parent_id']);
                $firearm = $_parent_product->get_meta('_firearm_product');
            } else {
                $firearm = $_product->get_meta('_firearm_product');
            }

            if (isset($firearm)) {
                if ($firearm === 'yes') {
                    $fireArmCount++;
                }
            }
        }

        if ($fireArmCount > 0) {
            add_action(get_option('ffl_init_map_location', 'woocommerce_checkout_order_review'), array($this, 'ffl_init_map'), 10);
        }else{
            add_action('woocommerce_checkout_shipping', 'handle_no_ffl_items', 10);
                function handle_no_ffl_items(){
                    echo '
                        <script>
                            document.getElementById("ship-to-different-address-checkbox").checked = false;
                            document.getElementById("shipping_first_name").value = "";
                            document.getElementById("shipping_last_name").value = "";
                            document.getElementById("shipping_company").value = "";
                            document.getElementById("shipping_address_1").value = "";
                            document.getElementById("shipping_address_2").value = "";
                            document.getElementById("shipping_city").value = "";
                            document.getElementById("shipping_postcode").value = "";
                            document.getElementById("shipping_state").value = "";
                        </script>';
                }
        }
    }

    function ffl_init_map()
    {
        $aKey = get_option('ffl_api_key_option');
        $wMes = get_option('ffl_checkout_message') != '' ? get_option('ffl_checkout_message') : '<b>Federal law dictates that your online firearms purchase must be delivered to a federally licensed firearms dealer (FFL) before you can take possession.</b> This process is called a Transfer. Enter your zip code, radius, and FFL name (optional), then click the Find button to get a list of FFL dealers in your area. Select the FFL dealer you want the firearm shipped to. <b><u>Before Checking Out, Contact your selected FFL dealer to confirm they are currently accepting transfers</u></b>. You can also confirm transfer costs.';
        $hok = get_option('ffl_init_map_location');
        $fflIncludeMap = get_option('ffl_include_map') == "No"?false:true;
        
        echo '<div id="ffl_container"></div>';
        echo '
                <script type="text/javascript">
                    let g_ffl_plugin_directory = "' . esc_attr(plugin_dir_url(__FILE__)) . '"    
                    let aKey = "' . esc_attr($aKey) . '"
                    let wMes = `' . wp_kses_post($wMes) . '`
                    let hok = "' . esc_attr($hok) . '"
                    let fflIncludeMap = "' . esc_attr($fflIncludeMap) . '"
                    localStorage.removeItem("selectedFFL");

                    if(!document.getElementById("ffl-zip-code")) {
                        document.addEventListener("DOMContentLoaded", function() {
                            initFFLJs(aKey,wMes,hok);
                        });
                    }
                </script>';
    }


}
