=== g-FFL Checkout ===
Contributors: garidium
Tags: FFL, eCommerce checkout, WooCommerce, FFL gun dealers, map api, google maps, gun dealer
Donate link: https://garidium.com/product/g-ffl-api-key/
Requires at least: 5.0
Tested up to: 6.1.1
Requires PHP: 7.0
Stable tag: 1.1.2
License: GPL v3+
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Built by a FFL, for FFL's. This plugin will help to streamline the firearm purchasing and fulfillment processes.

== Description ==
The g-FFL Checkout plugin supports the ordering checkout process for items requiring a FFL. It provides customers an intuitive search tool which includes a map, a zip code search, and a FFL name search option. The mapping technology we use does not require a Google Maps key, which helps avoid unexpected API charges. FFL's are ordered in the search results based on whether or not we have a signed copy of the FFL on-file.  In addition to helping customers through the FFL selection and checkout process, we also include tools for the dealer to optimize their fulfillment process. In the order details page you will see a FFL Download or Upload feature depending on if we have a signed copy of the FFL, on-file and available for download. We also provided a one-click ezCheck link, based on the FFL the customer selected. As a FFL myself, I built this plugin to support my business and I hope it can support yours. 

== API Subscription Required ==
While the plugin is free to download and install, it does require you to purchase a license for a personalized API key. The plugin will not be useful without this key. The API key allows the plugin to connect to the required data services, providing the following features:
* Access to the Synchronized ATF FFL database, with real-time opt-in/out features for FFL's
* Access to the eFile system to download and upload FFL documentation
* Access to Mapping and Geocoding features for displaying FFL locations

To purchase a key, visit the g-FFL API product page:
* https://garidium.com/g-ffl-api/

Please review our Terms and Conditions:
* https://garidium.com/terms_of_sale/


== Installation ==
1. Log in to the administrator panel.
2. Go to Plugins Add > New > Upload.
3. Locate g-ffl-checkout.zip file you downloaded
4. Click \"Install Now\" button.
5. Upon successful installation of the plugin, select “Activate Plugin” button
6. After the plugin is activated,  “g-FFL Checkout” will appear on the left menu
7. Select the “g-FFL Checkout" link
8. Fill in the following information:
**g-FFL API Key
**Set Checkout Message (change email in the message)
9. Select “Save Changes” to save the changes
10. If the installation does not succeed, please reach out to sales@garidium.com for assistance. We will respond as soon as we can.


== Frequently Asked Questions ==
= How do I flag a product as FFL required? =
The plugin provides two tools to do this, first you can check the \"Requires FFL Shipment\" checkbox on each individual product. This is located in the product data section. Secondly, on the main products list you can check 1-to-many products and use the bulk actions to set them all as FFL required products. In addition to these features, there is also a way to programmatically set products as FFL required. If you have questions about this option, please reach out to us.
=Why is this plug better than the alternatives?=
* It was built by a FFL, actively used by that FFL. I know what the industry needs, especially those first starting out with smaller budgets.
* The data services are built on state-of-the-art cloud-based technologies hosted on Amazon Web Services. This basically means that downtime will be minimal, and performance will be consistent.
* The plugin doesn't require a Google Maps API key, which adds additional cost and complexity to the installation process of other plugins
* We maintain a database of signed FFL copies for dealers that perform transfers. While its still your responsibility to ensure that the firearms your mailing go to a willing and able transfer FFL, having these FFL's on file and available for download is a big time saver in the fulfillment process
* The Order Details page provides you the ability to Upload FFL's and also quickly check the ATF ezCheck site for the FFL the customer selected during checkout


== Screenshots ==
1. Here is what the plugin looks like on the checkout page. You will have the option to place the component in different locations. After the user enters in a zip code, a distance to search in miles, and an optional Name search, a list and map appear. The list will show FFL's in the zip code provided, along with any nearby zip codes within the distance selected. There is an indicator in the list as to whether or not we have the signed copy of the FFL on file. If it's green, we do... otherwise it's red. The customer will then select a FFL from either the list or the map, and the shipping details will be auto-populated. The shipping address fields non-editable, except by selecting a FFL via the plugin component.
2. Using the top-right control in the map, you can go into a full screen map mode. You can hit the escape key or click on the same icon to revert back.
3. Once a customer has placed an order, in the order details view we add two buttons, one for downloading the FFL if it;s on file, and the 2nd to Launch the ATF's ezCheck site to validate the FFL selected.
4. If the customer selected a FFL where there is no signed FFL on-file, we allow you to upload that copy once you receive it. This will help streamline the process for the next time someone asks to ship to this FFL. 
5. The FFL ezCheck Button is a quick way to load ezCheck for the FFL selected by the customer, one-click.  
6. The Download FFL will securely retrieve the FFL copy on-file. These links are not shareable and work for you as a subscriber to the g-FFL API

== Changelog ==
v1.1.2 Mapbox conversion, removing need for Google Maps API key and also adding eFile FFL upload/download/ezCheck features to orders details view
v1.0.1 Bug Fixes
v1.0.0 Initial Release of the g-FFL API & Plugin