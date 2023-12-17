function initFFLJs(fKey,message,hook) {

	if(hook === "woocommerce_before_checkout_billing_form") {
		setTimeout(function() {
			document.getElementById("ship-to-different-address-checkbox").disabled = true;
		},1000);
	} else {
		document.getElementById("ship-to-different-address-checkbox").disabled = true;
	}

	document.getElementById("ship-to-different-address").style.display = 'none';
	document.getElementById("shipping_state_field").style.display = 'none';
	document.getElementById("shipping_country_field").style.display = 'none';

	FFL.init({
		container : 'ffl_container',
		apiKey: fKey,
		cBack : getSelected
	});

	// set the checkout message
	jQuery('.ffl_checkout_notice').html(wMes);
	
	jQuery("#ffl-map").ready(
		function(){
			 FFL.initGMap();
	});

	jQuery('.woocommerce-shipping-fields__field-wrapper').find('input').val(null);
	jQuery('.woocommerce-shipping-fields__field-wrapper').prepend(
		'<p id="first_last_notice" class="notice" style="margin-bottom: 10px;">The First and Last name below help the FFL identify your gun when it arrives at their location. Enter <b><u>your</u></b> First and Last Name.</p>'
	);

	if(jQuery("#wizard")) {

		if(hok === "woocommerce_before_checkout_billing_form") {
			jQuery("#ffl_container").insertBefore(".woocommerce-billing-fields");

		}



		setTimeout(function () {
			jQuery(document).on('click',"#wizard .actions a", function(e) {

				if(localStorage.getItem("selectedFFL") === null) {
					jQuery("#wizard .actions a[href='#next']").prop('href','#');
					e.preventDefault();
					e.stopPropagation();
					return false;
				} else {
					document.getElementById("ship-to-different-address-checkbox").disabled = false;
					jQuery("#wizard .actions a[href='#']").prop('href','#next');

				}

			} );


		},1000)


	}


	jQuery('form.woocommerce-checkout').on('checkout_place_order',
		function(e) {

			if(localStorage.getItem("selectedFFL") === null) {
				alert("Please make sure that you select a FFL prior to Placing the Order. Enter a Zip Code for the location of your FFL and click on the Find FFL button. Then select an FFL by clicking on the row that displays your requested FFL.");
				e.preventDefault();
				e.stopPropagation();
				return false;
			} else {

			    if(jQuery('.woocommerce-error').length === 0) {
                    document.getElementById("ship-to-different-address-checkbox").disabled = false;
                    document.getElementById("shipping_country").disabled = false;
                    document.getElementById("shipping_state").disabled = false;
                }


			}

		} );

	jQuery("#shipping_country").val(null).trigger('change');
	jQuery("#order_comments").val(null).text(null);

}

function getSelected(data) {
	jQuery("#shipping_country").prop("disabled",false);
	jQuery("#shipping_state").prop("disabled",false);
	
	var elemsActive = document.querySelectorAll(".selectedFFLDivButton");

	[].forEach.call(elemsActive, function(el) {
		el.classList.remove("selectedFFLDivButton");
	});

	document.getElementById(data.license_number).childNodes[0].classList.add('selectedFFLDivButton');
	localStorage.setItem("selectedFFL",data.license_number);
	document.getElementById( "place_order" ).disabled = false

	var company = document.getElementById("shipping_company");
	setNativeValue(company,data.list_name);
	company.readOnly = true;

	var address1 = document.getElementById("shipping_address_1");
	setNativeValue(address1,data.premise_street);
	address1.readOnly = true;

	var city = document.getElementById("shipping_city");
	setNativeValue(city,data.premise_city);
	city.readOnly = true;

	var postalCode = document.getElementById("shipping_postcode");
	setNativeValue(postalCode,data.premise_zip_code);
	postalCode.readOnly = true;

	var fflEmail = document.getElementById("shipping_email");
	setNativeValue(fflEmail,data.email);
	fflEmail.readOnly = false;

	var fflPhone = document.getElementById("shipping_phone");
	setNativeValue(fflPhone,data.voice_phone);
	fflPhone.readOnly = true;

	var fflLicense = document.getElementById("shipping_fflno");
	setNativeValue(fflLicense,data.license_number);
	fflLicense.readOnly = true;

	var fflExpiry = document.getElementById("shipping_fflexp");
	setNativeValue(fflExpiry, data.expiration_date.substring(0,10));
	fflExpiry.readOnly = true;
	
	var fflOnFile = document.getElementById("shipping_ffl_onfile");
	if (data.ffl_on_file){	
		setNativeValue(fflOnFile, "Yes");
	}else{
		setNativeValue(fflOnFile, "No");
	}		
	fflOnFile.readOnly = true;
	

	jQuery("#shipping_state").val(data.premise_state); // Change the value or make some change to the internal state
	jQuery("#shipping_state").trigger("change");
	
	jQuery("#shipping_country").val("US"); // Change the value or make some change to the internal state
	jQuery("#shipping_country").trigger("change");

	//jQuery("#shipping_country").prop("disabled",true);
	//jQuery("#shipping_state").prop("disabled",true);
	
	document.getElementById("shipping_state_field").style.display = 'none';
	document.getElementById("shipping_country_field").style.display = 'none';
	return false;
}

function setNativeValue(element, value) {
	var _ref = Object.getOwnPropertyDescriptor(element, 'value') || {},
		valueSetter = _ref.set;

	var prototype = Object.getPrototypeOf(element);

	var _ref2 = Object.getOwnPropertyDescriptor(prototype, 'value') || {},
		prototypeValueSetter = _ref2.set;

	if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
		prototypeValueSetter.call(element, value);
	} else if (valueSetter) {
		valueSetter.call(element, value);
	} else {}
}


