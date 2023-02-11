<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       garidium.com
 * @since      1.0.0
 *
 * @package    G_ffl_Api
 * @subpackage G_ffl_Api/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    G_ffl_Api
 * @subpackage G_ffl_Api/includes
 * @author     Big G <sales@garidium.com>
 */
class G_Ffl_Api
{

    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      G_ffl_Api_Loader $loader Maintains and registers all hooks for the plugin.
     */
    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string $plugin_name The string used to uniquely identify this plugin.
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string $version The current version of the plugin.
     */
    protected $version;

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function __construct()
    {
        if (defined('G_FFL_API_VERSION')) {
            $this->version = G_FFL_API_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = 'g-ffl-api';

        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();

    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - Ffl_Api_Loader. Orchestrates the hooks of the plugin.
     * - Ffl_Api_i18n. Defines internationalization functionality.
     * - Ffl_Api_Admin. Defines all hooks for the admin area.
     * - Ffl_Api_Public. Defines all hooks for the public side of the site.
     *
     * Create an instance of the loader which will be used to register the hooks
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function load_dependencies()
    {

//        if (get_option('woocommerce_ship_to_destination') != 'shipping') {
//            update_option('woocommerce_ship_to_destination', 'shipping');
//        }

        /**
         * The class responsible for orchestrating the actions and filters of the
         * core plugin.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-ffl-api-loader.php';

        /**
         * The class responsible for defining internationalization functionality
         * of the plugin.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-ffl-api-i18n.php';

        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-ffl-api-admin.php';

        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-ffl-api-public.php';

        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-ffl-api-customizer.php';

        $this->loader = new Ffl_Api_Loader();

    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the Ffl_Api_i18n class in order to set the domain and to register the hook
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function set_locale()
    {

        $plugin_i18n = new G_ffl_Api_i18n();

        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');

    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_admin_hooks()
    {

        $plugin_admin = new G_ffl_Api_Admin($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts');

        $this->loader->add_action('admin_menu', $plugin_admin, 'ffl_load_menu');
    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_public_hooks()
    {

        $plugin_public = new G_ffl_Api_Public($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');

        $this->loader->add_action('woocommerce_before_checkout_form', $plugin_public, 'ffl_woo_checkout', 10);
        //$this->loader->add_action('woocommerce_before_checkout_billing_form', $plugin_public, 'ffl_woo_checkout', 11);


    }


    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public function run()
    {
        $this->loader->run();
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @return    string    The name of the plugin.
     * @since     1.0.0
     */
    public function get_plugin_name()
    {
        return $this->plugin_name;
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @return    Ffl_Api_Loader    Orchestrates the hooks of the plugin.
     * @since     1.0.0
     */
    public function get_loader()
    {
        return $this->loader;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @return    string    The version number of the plugin.
     * @since     1.0.0
     */
    public function get_version()
    {
        return $this->version;
    }

}

// Set - Unset FFL Product

add_filter('bulk_actions-edit-product', 'ffl_bulk_actions');

function ffl_bulk_actions($bulk_array)
{

    $bulk_array['set_ffl'] = 'Set FFL Product';
    $bulk_array['unset_ffl'] = 'Unset FFL Product';
    return $bulk_array;

}

add_filter('handle_bulk_actions-edit-product', 'ffl_bulk_action_handler', 10, 3);

function ffl_bulk_action_handler($redirect, $doaction, $object_ids)
{

    // let's remove query args first
    $redirect = remove_query_arg(array('set_ffl_done', 'unset_ffl_done'), $redirect);

    // do something for "Set FFL Product" bulk action
    if ($doaction == 'set_ffl') {
        foreach ($object_ids as $post_id) {
            update_post_meta($post_id, '_firearm_product', 'yes');
        }

        // do not forget to add query args to URL because we will show notices later
        $redirect = add_query_arg(
            'set_ffl_done', // just a parameter for URL (we will use $_GET['set_ffl_done'] )
            count($object_ids), // parameter value - how much posts have been affected
            $redirect);

    }

    // do something for "Set price to $1000" bulk action
    if ($doaction == 'unset_ffl') {
        foreach ($object_ids as $post_id) {
            update_post_meta($post_id, '_firearm_product', 'no');
        }

        // do not forget to add query args to URL because we will show notices later
        $redirect = add_query_arg(
            'unset_ffl_done', // just a parameter for URL (we will use $_GET['unset_ffl_done'] )
            count($object_ids), // parameter value - how much posts have been affected
            $redirect);

    }

    return $redirect;

}

add_action('admin_notices', 'ffl_update_messages');

function ffl_update_messages()
{

    // first of all we have to make a message,
    // of course it could be just "Posts updated." like this:
    if (!empty($_REQUEST['set_ffl_done'])) {

        // depending on ho much posts were changed, make the message different
        printf('<div id="message" class="updated notice is-dismissible"><p>' .
            _n('%s product set as firearm.',
                '%s products set as firearm.',
                intval($_REQUEST['set_ffl_done'])
            ) . '</p></div>', intval($_REQUEST['set_ffl_done']));

    }

    // create an awesome message
    if (!empty($_REQUEST['unset_ffl_done'])) {

        // depending on ho much posts were changed, make the message different
        printf('<div id="message" class="updated notice is-dismissible"><p>' .
            _n('%s product set as unfirearm.',
                '%s products set as unfirearm.',
                intval($_REQUEST['unset_ffl_done'])
            ) . '</p></div>', intval($_REQUEST['unset_ffl_done']));

    }

}

// DONE //

// Create Sortable Firearm Column
add_filter('manage_edit-product_columns', 'firearm_product_col');

function firearm_product_col($columns)
{
    $new_columns = (is_array($columns)) ? $columns : array();
    $new_columns['FIREARM'] = 'Firearm Status';
    return $new_columns;
}

add_action('manage_product_posts_custom_column', 'firearm_product_col_data', 2);

function firearm_product_col_data($column)
{
    global $post;
    $firearm_product_ids = get_post_meta($post->ID, '_firearm_product', true);
    if ($column == 'FIREARM') {
        if (isset($firearm_product_ids) && !empty($firearm_product_ids)) {
            if ($firearm_product_ids === 'yes') echo '<strong>FFL</strong>';
            if ($firearm_product_ids === 'no') echo '<strong></strong>';
        } else {
            echo "Undefined";
        }
    }
}

add_filter("manage_edit-product_sortable_columns", 'firearm_product_col_sort');

function firearm_product_col_sort($columns)
{
    $custom = array(
        'FIREARM' => 'firearmstatus'
    );
    return wp_parse_args($custom, $columns);
}

add_action('woocommerce_admin_order_data_after_shipping_address', 'add_ffl_download', 25);
function add_ffl_download($order_id){
    $order = wc_get_order( $order_id );
    $notes = $order->get_customer_note();
    $aKey = esc_attr(get_option('ffl_api_key_option'));
    if (str_contains($notes, "FFL Number")){
        if (str_contains($notes, "On-File")){
            $fflshort = substr($notes, -8);
            echo '<a id="download_ffl" class="button alt" data-marker-id="',$fflshort,'">Download FFL</a>
                    <script>
                        document.getElementById("download_ffl").addEventListener("click", function(){
                            if (window.confirm("It is your responsibility to ensure the receiving FFL is valid (using ezCHeck) and is willing and able to accept transfers. Do not assume that is the case because this FFL is on-file. If you have an issue with a transfer and the FFL should be removed, please contact us at sales@garidium.com with the FFL number to remove. If the download is not working, try again, check popup-blockers.")){
                                fetch("https://ffl-api.garidium.com/download", {
                                    method: "POST",
                                    headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    "x-api-key": "',$aKey,'",
                                    },
                                    body: JSON.stringify({"fflno": "',$fflshort,'"})
                                })
                                .then(response=>response.json())
                                .then(data=>{ 
                                    window.open(data, "_blank", "location=yes, scrollbars=yes,status=yes");         
                                });
                            }
                        });
                    </script>';
        }else{
            echo '<strong>Upload a FFL to the g-FFL eFile System:</strong>
                  <input type="file" id="ffl_upload_filename"><a id="upload_ffl" class="button alt">Upload FFL</a>
                    <script>
                        // Select your input type file and store it in a variable
                        const input = document.getElementById("ffl_upload_filename");
                        // This will upload the file after having read it
                        const upload = (file) => {
                            console.log("Uploading File Name = " + file.name);
                            fetch("https://ffl-api.garidium.com/garidium-ffls/uploads%2F" + file.name, { 
                                method: "PUT",
                                headers: {
                                    "x-api-key": "',$aKey,'",
                                },
                                body: file
                            })
                            .then(
                                success => {alert("Upload Successful, we will process the FFL and make it available for the next order shipping to this FFL. Thank you for your contribution!");console.log(success);} 
                            ).catch(
                                error => {alert("There was an Error uploading the FFL, please try again.");console.log(error);}
                            );
                        };

                        // Event handler executed when a file is selected
                        const onSelectFile = () => upload(input.files[0]);

                        // Add a listener on your input
                        // It will be triggered when a file will be selected
                        document.getElementById("upload_ffl").addEventListener("click", onSelectFile, false);
                    </script>';
        }
        $ffl_lic = substr($notes, 13, 20);
        $ezCheckLink = "https://fflezcheck.atf.gov/FFLEzCheck/fflSearch?licsRegn=" . substr($ffl_lic,0,1) . "&licsDis=" . substr($ffl_lic,2,2) . "&licsSeq=" . substr($ffl_lic,-5,5);   
        echo '<a id="atf_ezcheck" class="button alt">ATF ezCheck</a>
                <script>
                    document.getElementById("atf_ezcheck").addEventListener("click", function(){
                        window.open("',$ezCheckLink,'", "_blank", "location=yes, scrollbars=yes,status=yes"); 
                    });
                </script>';    
    }
}

// DONE //