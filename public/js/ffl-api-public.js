function initFFLJs(fKey,message,hook) {

	if(hook === "woocommerce_before_checkout_billing_form") {
		setTimeout(function() {
			document.getElementById("ship-to-different-address-checkbox").disabled = true;
		},1000);
	} else {
		document.getElementById("ship-to-different-address-checkbox").disabled = true;
	}


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
	
	jQuery("#shipping_country").val("US"); // Change the value or make some change to the internal state
	jQuery("#shipping_country").trigger("change");
	//jQuery("#shipping_country").prop("disabled",true);

	var elemsActive = document.querySelectorAll(".selectedFFLDivButton");

	[].forEach.call(elemsActive, function(el) {
		el.classList.remove("selectedFFLDivButton");
	});

	document.getElementById(data.license_number).childNodes[0].classList.add('selectedFFLDivButton');
	localStorage.setItem("selectedFFL",data.license_number);
	document.getElementById( "place_order" ).disabled = false

	var company = document.getElementsByName("shipping_company")[0];
	setNativeValue(company,data.list_name);
	company.readOnly = true;

	var address1 = document.getElementsByName("shipping_address_1")[0];
	setNativeValue(address1,data.premise_street);
	address1.readOnly = true;

	var city = document.getElementsByName("shipping_city")[0];
	setNativeValue(city,data.premise_city);
	city.readOnly = true;

	var postalCode = document.getElementsByName("shipping_postcode")[0];
	setNativeValue(postalCode,data.premise_zip_code);
	postalCode.readOnly = true;

	var fflEmail = document.getElementsByName("shipping_email")[0];
	setNativeValue(fflEmail,data.email);
	fflEmail.readOnly = false;

	var fflPhone = document.getElementsByName("shipping_phone")[0];
	setNativeValue(fflPhone,data.voice_phone);
	fflPhone.readOnly = true;

	var fflLicense = document.getElementsByName("shipping_fflno")[0];
	setNativeValue(fflLicense,data.license_number);
	fflLicense.readOnly = true;

	var fflExpiry = document.getElementsByName("shipping_fflexp")[0];
	var expiration_date = "2025-4-01";
	setNativeValue(fflExpiry, data.expiration_date.substring(0,10));
	fflExpiry.readOnly = true;
	
	var fflOnFile = document.getElementsByName("shipping_ffl_onfile")[0];
	if (data.ffl_on_file){	
		setNativeValue(fflOnFile, "Yes");
	}else{
		setNativeValue(fflOnFile, "No");
	}		
	fflOnFile.readOnly = true;
	

	jQuery("#shipping_state").val(data.premise_state); // Change the value or make some change to the internal state
	jQuery("#shipping_state").trigger("change");

	jQuery("#shipping_country").prop("disabled",true);
	jQuery("#shipping_state").prop("disabled",true);

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


