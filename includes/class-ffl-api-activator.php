<?php

/**
 * Fired during plugin activation
 *
 * @link       garidium.com
 * @since      1.0.0
 *
 * @package    G_ffl_Api
 * @subpackage G_ffl_Api/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    G_ffl_Api
 * @subpackage G_ffl_Api/includes
 * @author     Big G <sales@garidium.com>
 */
class G_ffl_Api_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
        if (get_option('woocommerce_ship_to_destination') != 'shipping' ) {
            update_option('woocommerce_ship_to_destination', 'shipping');
        }
	}

}
