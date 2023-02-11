# g-ffl-api
g-FFL API WooCommerce Plugin

THIS PLUGIN UI CODE IS A HEAVILY MODIFIED VERSION OF FFL-API by Optimum7
AND IS PROVIDED FREE OF USE FOR ALL THOSE INTERESTED THIS DOES NOT INCLUDE BACKEND DATA SERVICES.

=== g-FFL API - Federal Firearm E-commerce Store Checkout Plugin ===
Contributors: Garidium LLC, Optimum7
Tags: FFL, eCommerce checkout, WooCommerce, FFL gun dealers, map api, google maps, gun dealer
Requires at least: 5.0
Tested up to: 6.1.1
Requires PHP: 7.0
Stable tag: 1.1.2
License: GPL version 3 or any later version
License URI: https://www.gnu.org/licenses/gpl-3.0.html


g-FFL API WooCommerce plugin has been created to improve WooCommerce online stores. Selecting a Federal Firearms Licensee (FFL) is a critical step when purchasing firearms, as most firearms require shipping to a FFL to perform background checks on the customer prior to transferring the firearm.


== Description ==

This plugin simplifies the checkout phase for online gun dealer websites. The g-FFL API WooCommerce plugin only works on the websites that have the WooCommerce plugin installed. 

As a now (two)-of-a-kind software in the online gun dealer sector, g-FFL API provides a service that everybody needs in the process of buying FFL products online.

g-FFL API provides user-friendly checkout process. Visitors know whether their products are FFL-required and can select where to ship their purchase.

== Screenshots ==

1. Setup g-FFL API WooCommerce Plugin
2. Set the products as firearms
3. Bulk update the products
4. FFL dealers appear on the map via zip code, and an optional FFL name search

==Features==

==List and Map-based Interface==
Search for and retrieve a list of FFL within a specified radius of your provided zip code. You can also filter this list down by FFL name if you'd like. The map interface is built without the need for a Google Maps API like others. This streamlines the setup process and eliminates any potential Google API costs on your end.

==Ability to Define FFL Products==
g-FFL API WooCommerce plugin provides an easy-to-use interface for shop owners to mark products as FFL-required. You can either do this at the individual product level, or in bulk on the product list page. You also have the ability to update the indicator using the WooCommerce API. 


==Auto-Update Functionality==

When a new release is published g-FFL API WooCommerce Plugin sends an update notification to the admin of the website. With this feature, the g-FFL API makes sure that websites are up to date.

==Checkout Message Customization==

g-FFL API WooCommerce Plugin provides the ability to change the message that appears to the customer on the checkout page relating to selecting a FFL.

==The Ability to Place the FFL plugin in different places on the checkout page==

This feature provides the ability to set the position of g-FFL API Plugin where admin wants on the websites. There are 5 options for g-FFL API Plugin position:
* Order Review
* Above Billing Form
* Below Billing Form
* Above Shipping Form
* Below Shipping Form


###IMPORTANT:
If you think you found a bug in  g-FFL API, or have a problem/question concerning the plugin, send us an email at sales@garidium.com

###IMPORTANT-2:
If you don't have WooCommerce plugin on your website, g-FFL API will not work. g-FFL API WooCommerce Plugin has been created only to launch with WooCommerce plugin.


== Frequently Asked Questions ==


= 1. CAN I USE THE SAME API KEY FOR MULTIPLE WEBSITES? =

No. For each website, you need to have a unique API key. Therefore, you need to buy a unique one when integrating a new website.

= 2. DOES THE API REQUEST NUMBERS TRANSFER TO THE NEXT MONTH'S USAGE? =
r
No. Each package price is monthly. We provide an API request number for the purchased month. These numbers reset at the beginning of your package renewal date and do not transfer to the new month’s numbers.


= 3. HOW DO I KNOW IF A GUN DEALER HAS FFL LICENSE OR NOT =

g-FFL API data services update weekly against the ATF database, and are updated in real-time as we receive new FFL information and documents.



== Installation ==


#### Thank you for your interest in g-FFL API WooCommerce Plugin.

### Minimum requirements.
*   Wordpress 5.0+
*   PHP 7.x
*   MySQL 5.x
*   WooCommerce Plugin

In order to use g-FFL Api, you need an API Key
g-FFL API: Please go to [https://garidium.com/g-ffl-api/) and complete the subscription purchase. Once you checkout we will be in contact with you to get you a key.
You can follow the steps below for the setup process.

### Perform a new installation
After downloading the ZIP file 

1. Log in to the administrator panel.
2. Go to Plugins Add > New > Upload.
3. Locate g-ffl-api.zip file you downloaded
4. Click "Install Now" button.
5. Upon successful installation of the plugin, select “Activate Plugin” button
6. After the plugin is activated,  “g-FFL API” will appear on the left menu
7. Select the “g-FFL API” link
8. Fill in the following information:
**g-FFL API Key
**Set Checkout Message (change email in the message)
9. Select “Save Changes” to save the changes
10. If the installation does not succeed, please reach out to sales@garidium.com for assistance. We will respond as soon as we can.


== How To Assign a Product as Firearm ==
1. Navigate to “Products -> All Product”
2. Select “Edit” button below the product title for the products that will be assigned as Firearm
3. Scroll down to “Product Data” section
4. Check “Requires FFL Shipment" checkbox
5. Select “Update” button.


== How FFL Search Box Works ==
1. Add a product that was assigned as a firearm in the cart
2. Navigate to the Checkout
3. FFL Dealer Search Box will appear
4. Enter the Zipcode and the Radius information which FFL dealer you want the firearm to be shipped
5. Select Find. Based on the Zipcode entered, FFL dealers located within the radius will appear on the map
6. Optionally enter a FFL name to filter the list further
7. Select an FFL Dealer from the map or the list and the shipping information of the selected FFL dealer will be auto-populated.

== Changelog ==
v1.1.2 Mapbox conversion, removing need for Google Maps API key and also adding eFile FFL upload/download/ezCheck features to orders details view
v1.0.1 Bug Fixes
v1.0.0 Initial Release of the g-FFL API & Plugin
