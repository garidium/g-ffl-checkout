<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       garidium.com
 * @since      1.0.0
 *
 * @package    g_Ffl_Api
 * @subpackage g_Ffl_Api/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    g_Ffl_Api
 * @subpackage g_Ffl_Api/admin
 * @author     Big G <sales@garidium.com>
 */
class g_ffl_Api_Admin
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
     * @param string $plugin_name The name of this plugin.
     * @param string $version The version of this plugin.
     * @since    1.0.0
     */
    public function __construct($plugin_name, $version)
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

    }

    /**
     * Register the stylesheets for the admin area.
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

        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/ffl-api-admin.css', array(), $this->version, 'all');

    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in g_Ffl_Api_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The g_Ffl_Api_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_script('iris', admin_url('js/iris.min.js'), array('jquery-ui-draggable', 'jquery-ui-slider', 'jquery-touch-punch'), false, 1);
        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/ffl-api-admin.js', array('jquery'), $this->version, true);
        wp_enqueue_style('forms');

    }

    public function ffl_load_menu()
    {
        add_menu_page('g-FFL API Settings Page', 'g-FFL API', 'manage_options', 'ffl-api-settings', array($this, 'ffl_api_settings_page'), 'dashicons-location-alt', 70);
        add_action('admin_init', array($this, 'register_ffl_api_settings'));
        add_action('woocommerce_product_options_general_product_data', array($this, 'ffl_option_group'));
        add_action('woocommerce_process_product_meta', array($this, 'ffl_save_fields'), 10, 2);

    }

    function ffl_save_fields($post_id)
    {

        $woocommerce_checkbox = isset($_POST['_firearm_product']) ? 'yes' : 'no';
        update_post_meta($post_id, '_firearm_product', $woocommerce_checkbox);

    }

    function ffl_option_group()
    {
        echo '<div class="options_group">';

        woocommerce_wp_checkbox(array(
            'id' => '_firearm_product',
            'value' => get_post_meta(get_the_ID(), '_firearm_product', true),
            'label' => 'Requires FFL Shipment',
            'desc_tip' => true,
            'description' => 'Define this product as requiring FFL shipment by clicking the checkbox',
        ));

        echo '</div>';
    }

    function register_ffl_api_settings()
    {
        //register our settings
        register_setting('ffl-api-settings', 'ffl_api_key_option');
        register_setting('ffl-api-settings', 'ffl_api_gmaps_option');
        register_setting('ffl-api-settings', 'ffl_checkout_message');
        //register_setting('ffl-api-settings', 'ffl_list_background_option');
        //register_setting('ffl-api-settings', 'ffl_list_text_option');
        register_setting('ffl-api-settings', 'ffl_init_map_location');
    }

    function ffl_api_settings_page()
    {

        ?>
        <div class="wrap">
            <a href="https://garidium.com" target="_blank" style="display: inline-block">
                <img src="<?php echo plugin_dir_url(__FILE__) . 'images/ffl-logo.png' ?>" style="width: 150px">
            </a>
            <div class="postbox" style="padding: 10px;margin-top: 10px">

                <form method="post" action="options.php">

                    <?php settings_fields('ffl-api-settings'); ?>

                    <table class="form-table">

                        <tr valign="top">
                            <th scope="row">g-FFL API Key:</th>
                            <td>
                                <div class="user-pass-wrap">
                                    <div class="wp-pwd">
                                        <input type="password" style="width: 30%" name="ffl_api_key_option"
                                               aria-describedby="login_error" class="input password-input" size="20"
                                               value="<?php echo esc_attr(get_option('ffl_api_key_option')); ?>"/>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr valign="top">
                            <th scope="row">Checkout Message:</th>
                            <td>
                                <textarea rows="5" cols="50"
                                          name="ffl_checkout_message"><?php echo esc_attr(get_option('ffl_checkout_message') != '' ? get_option('ffl_checkout_message') : '<b>Federal law dictates that your online firearms purchase must be delivered to a federally licensed firearms dealer (FFL) before you can take possession.</b> This process is called a Transfer. Enter your zip code, radius, and FFL name (optional), then click the Find button to get a list of FFL dealers in your area. Select the FFL dealer you want the firearm shipped to. <b><u>Before Checking Out, Contact your selected FFL dealer to confirm they are currently accepting transfers</u></b>. You can also confirm transfer costs. If we do not have the FFL on-file, ask them to send a signed copy to <b>[update your email]</b>.</b>'); ?></textarea>
                                <p id="warnHelp" class="form-text text-muted">You can edit this message that appears on the checkout page</p>
                            </td>
                        </tr>
                        <tr valign="top">
                            <th scope="row">Form Location:</th>

                            <td>
                                <select name="ffl_init_map_location">
                                    <?php
                                    $selects = Array(
                                        'woocommerce_checkout_order_review' => 'Order Review',
                                        'woocommerce_before_checkout_billing_form' => 'Above Billing Form',
                                        'woocommerce_after_checkout_billing_form' => 'Below Billing Form',
                                        'woocommerce_before_checkout_shipping_form' => 'Above Shipping Form',
                                        'woocommerce_after_checkout_shipping_form' => 'Below Shipping Form',
                                    );
                                    foreach ($selects as $val => $key) {
                                        echo '<option value="' . $val . '" ';
                                        if (get_option('ffl_init_map_location') == $val) {
                                            echo 'selected="selected" ';
                                        }
                                        echo '> ' . $key . '</option>';
                                    }
                                    ?>
                                </select>
                                <p id="warnHelp" class="form-text text-muted"></p>
                            </td>
                        </tr>
                    </table>
                    <?php submit_button(); ?>
            </div>
            <div class="postbox" style="padding: 10px;margin-top: 10px">
                <h3 style="color: blue">To show the FFL form on a checkout page you need to enable the "Requires FFL Shipment" checkbox on your woocommerce product's general settings view. You can also do this in bulk on your main products page by using the bulk action drop-down. See the screenshots below for reference. This setting can also be set via the API by adjusting the products meta-data attribute.</h4>
                <p>Single Product Example:</p>
                <img src="<?php echo plugin_dir_url(__FILE__) . 'images/example.png' ?>">
                <p>Bulk Update Example:</p>
                <img src="<?php echo plugin_dir_url(__FILE__) . 'images/example2.png' ?>">
            </div>
            </form>
        </div>
    <?php }


}
