<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              garidium.com
 * @since             1.0.0
 * @package           G_ffl_Api
 *
 * @wordpress-plugin
 * Plugin Name:       g-FFL Checkout
 * Plugin URI:        garidium.com/g-ffl-api
 * Description:       g-FFL Checkout
 * Version:           1.2.0
 * WC requires at least: 3.0.0
 * WC tested up to:   4.0
 * Author:            Garidium LLC
 * Author URI:        garidium.com
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       g-ffl-api
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

if ( ! defined('ABSPATH')) exit;  // if direct access


/**
 * Check if WooCommerce is active
 **/
if (! in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
    die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('G_FFL_API_VERSION', '1.2.0');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-ffl-api-activator.php
 */
function activate_ffl_api()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-ffl-api-activator.php';
    G_ffl_Api_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-ffl-api-deactivator.php
 */
function deactivate_ffl_api()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-ffl-api-deactivator.php';
    G_ffl_Api_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_ffl_api');
register_deactivation_hook(__FILE__, 'deactivate_ffl_api');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-ffl-api.php';
require plugin_dir_path(__FILE__) . 'includes/ffl_ordering.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_g_ffl_api()
{

    $plugin = new G_Ffl_Api();
    $plugin->run();

}

run_g_ffl_api();
