function initFFLJs(fKey,message,hook) {
	// Ensure mixed cart variables are defined
	if (typeof mixedCartSupport === 'undefined') {
		mixedCartSupport = false;
	}
	if (typeof isMixedCart === 'undefined') {
		isMixedCart = false;
	}
	
	// Helper function to get the best available FFL name from data
	function getFflDisplayName(data) {
		// Try fields in order of preference
		var nameFields = ['list_name', 'company_name', 'business_name', 'name', 'trading_name', 'license_name'];
		
		for (var i = 0; i < nameFields.length; i++) {
			var field = nameFields[i];
			if (data[field] && data[field].trim() !== '') {
				return data[field].trim();
			}
		}
		
		// Last resort: try to construct from first/last name
		if (data.first_name && data.last_name) {
			var fullName = (data.first_name + ' ' + data.last_name).trim();
			if (fullName !== '') {
				return fullName;
			}
		}
		
		// Final fallback: use license number if available
		if (data.license_number) {
			return 'FFL #' + data.license_number;
		}
		
		// Absolute last resort
		return 'FFL Dealer';
	}
	
	// Always hide ship-to-different-address checkbox and set to checked for any cart with FFL items
	if (document.getElementById("ship-to-different-address") != null){
		document.getElementById("ship-to-different-address").style.display = 'none';
	}
	
	if (document.getElementById("ship-to-different-address-checkbox") != null){
		document.getElementById("ship-to-different-address-checkbox").checked = true;
	}
	
	// Only hide state/country fields if mixed cart support is disabled or it's not a mixed cart
	if (!mixedCartSupport || !isMixedCart) {
		if (document.getElementById("shipping_state_field") != null) {
			document.getElementById("shipping_state_field").style.display = 'none';
		}
		if (document.getElementById("shipping_country_field") != null) {
			document.getElementById("shipping_country_field").style.display = 'none';
		}
	}

	FFL.init({
		container : 'ffl_container',
		apiKey: fKey,
		cBack : getSelected
	});

	// set the checkout message
	jQuery('.ffl_checkout_notice').html(wMes);
	
	// Apply consistent styling to the main FFL selector message to match other notices
	jQuery(document).ready(function() {
		// Wait for the FFL widget to load, then apply consistent styling
		setTimeout(function() {
			jQuery('#ffl_container .notice').css({
				'background': '#f8f9fa',
				'border-left': '3px solid #6c757d',
				'padding': '12px',
				'margin-bottom': '15px',
				'color': '#495057',
				'line-height': '1.6',
				'border-radius': '4px',
				'box-shadow': '0 1px 3px rgba(0,0,0,0.1)'
			});
		}, 500);
	});
	
	jQuery("#ffl-map").ready(
		function(){
			 FFL.initGMap();
	});

	// Clear shipping fields only if not mixed cart
	if (!mixedCartSupport || !isMixedCart) {
		jQuery('.woocommerce-shipping-fields__field-wrapper').find('input').val(null);
	}
	
	// Add notices based on cart type
	var noticeWrapper = jQuery('.woocommerce-shipping-fields__field-wrapper');
	if (noticeWrapper.length > 0) {
		if (mixedCartSupport && isMixedCart) {
			noticeWrapper.prepend(
				'<p id="mixed_cart_notice" class="notice" style="margin-bottom: 10px; background: #e7f3ff; border-left: 4px solid #0073aa; padding: 10px;">You have both firearm and non-firearm items in your cart. <strong>Firearm items will be shipped to your selected FFL dealer</strong>, while other items will be shipped to the shipping address you enter here.</p>'
			);
		}
		
		// Add the first/last name notice after the mixed cart notice (so it appears below it)
		var firstLastNoticeHtml = '<p id="first_last_notice" class="notice" style="margin-bottom: 10px; background: #fff3cd; border-left: 4px solid #ffc107; padding: 10px;">The First and Last name below help the FFL identify your gun when it arrives at their location. Enter <b><u>your</u></b> First and Last Name.</p>';
		
		if (mixedCartSupport && isMixedCart) {
			// For mixed carts, add it after the mixed cart notice
			jQuery('#mixed_cart_notice').after(firstLastNoticeHtml);
		} else {
			// For FFL-only carts, prepend it normally
			noticeWrapper.prepend(firstLastNoticeHtml);
		}
	}

	if(jQuery("#wizard").length) {

		if(hook === "woocommerce_before_checkout_billing_form") {
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
					if (document.getElementById("ship-to-different-address-checkbox") != null){
						document.getElementById("ship-to-different-address-checkbox").disabled = false;
					}
					jQuery("#wizard .actions a[href='#']").prop('href','#next');

				}

			} );


		},1000)


	}


	jQuery('form.woocommerce-checkout').on('checkout_place_order',
		function(e) {
			// Prevent submission if FFL fields are currently being updated
			if (typeof window.fflUpdatingFields !== 'undefined' && window.fflUpdatingFields === true) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}

			if(localStorage.getItem("selectedFFL") === null) {
				alert("Please make sure that you select a FFL prior to Placing the Order. Enter a Zip Code for the location of your FFL and click on the Find FFL button. Then select an FFL by clicking on the row that displays your requested FFL.");
				e.preventDefault();
				e.stopPropagation();
				return false;
			} else {
				// Always enable all hidden fields before form submission to ensure they are included
				if (document.getElementById("ship-to-different-address-checkbox") != null){
					document.getElementById("ship-to-different-address-checkbox").disabled = false;
				}
				if (document.getElementById("shipping_country") != null) {
					document.getElementById("shipping_country").disabled = false;
				}
				if (document.getElementById("shipping_state") != null) {
					document.getElementById("shipping_state").disabled = false;
				}
				if (document.getElementById("shipping_address_1") != null) {
					document.getElementById("shipping_address_1").disabled = false;
				}
				if (document.getElementById("shipping_city") != null) {
					document.getElementById("shipping_city").disabled = false;
				}
				if (document.getElementById("shipping_postcode") != null) {
					document.getElementById("shipping_postcode").disabled = false;
				}
				if (document.getElementById("shipping_company") != null) {
					document.getElementById("shipping_company").disabled = false;
				}
				if (document.getElementById("shipping_phone") != null) {
					document.getElementById("shipping_phone").disabled = false;
				}
				if (document.getElementById("shipping_email") != null) {
					document.getElementById("shipping_email").disabled = false;
				}
				// Enable FFL-specific fields
				if (document.getElementById("shipping_fflno") != null) {
					document.getElementById("shipping_fflno").disabled = false;
				}
				if (document.getElementById("shipping_fflexp") != null) {
					document.getElementById("shipping_fflexp").disabled = false;
				}
				if (document.getElementById("shipping_ffl_onfile") != null) {
					document.getElementById("shipping_ffl_onfile").disabled = false;
				}
				if (document.getElementById("shipping_ffl_name") != null) {
					document.getElementById("shipping_ffl_name").disabled = false;
				}
				if (document.getElementById("shipping_ffl_phone") != null) {
					document.getElementById("shipping_ffl_phone").disabled = false;
				}
				
				// Allow form submission to proceed
				return true;
			}

		} );

	jQuery("#shipping_country").val(null).trigger('change');
	jQuery("#order_comments").val(null).text(null);

}

function getSelected(data) {
	// Ensure mixedCart variables are defined
	if (typeof mixedCartSupport === 'undefined') {
		mixedCartSupport = false;
	}
	if (typeof isMixedCart === 'undefined') {
		isMixedCart = false;
	}
	
	// Prevent any automatic form submission during FFL selection
	if (typeof window.fflUpdatingFields === 'undefined') {
		window.fflUpdatingFields = false;
	}
	window.fflUpdatingFields = true;
	
	jQuery("#shipping_country").prop("disabled",false);
	jQuery("#shipping_state").prop("disabled",false);
	
	var elemsActive = document.querySelectorAll(".selectedFFLDivButton");

	[].forEach.call(elemsActive, function(el) {
		el.classList.remove("selectedFFLDivButton");
	});

	document.getElementById(data.license_number).childNodes[0].classList.add('selectedFFLDivButton');
	localStorage.setItem("selectedFFL",data.license_number);
	document.getElementById( "place_order" ).disabled = false

	// For mixed carts, don't overwrite shipping address fields
	if (mixedCartSupport && isMixedCart) {
		// Only set FFL-specific fields, leave shipping address fields alone
		var fflEmail = document.getElementById("shipping_email");
		if (fflEmail) {
			setNativeValue(fflEmail,data.email);
			fflEmail.readOnly = false;
		}

		var fflPhone = document.getElementById("shipping_phone");
		if (fflPhone) {
			setNativeValue(fflPhone,data.voice_phone);
			fflPhone.readOnly = true;
		}
	} else {
		// Original FFL-only behavior - set all shipping fields to FFL address
		var company = document.getElementById("shipping_company");
		if (company) {
			setNativeValue(company,data.list_name);
			company.readOnly = true;
		}

		var address1 = document.getElementById("shipping_address_1");
		if (address1) {
			setNativeValue(address1,data.premise_street);
			address1.readOnly = true;
		}

		var city = document.getElementById("shipping_city");
		if (city) {
			setNativeValue(city,data.premise_city);
			city.readOnly = true;
		}

		var postalCode = document.getElementById("shipping_postcode");
		if (postalCode) {
			setNativeValue(postalCode,data.premise_zip_code);
			postalCode.readOnly = true;
		}

		var fflEmail = document.getElementById("shipping_email");
		if (fflEmail) {
			setNativeValue(fflEmail,data.email);
			fflEmail.readOnly = false;
		}

		var fflPhone = document.getElementById("shipping_phone");
		if (fflPhone) {
			setNativeValue(fflPhone,data.voice_phone);
			fflPhone.readOnly = true;
		}
	}

	// Always set FFL-specific fields regardless of cart type
	var fflLicense = document.getElementById("shipping_fflno");
	if (fflLicense) {
		setNativeValue(fflLicense,data.license_number);
		fflLicense.readOnly = true;
	}

	var fflExpiry = document.getElementById("shipping_fflexp");
	if (fflExpiry) {
		setNativeValue(fflExpiry, data.expiration_date.substring(0,10));
		fflExpiry.readOnly = true;
	}
	
	var fflOnFile = document.getElementById("shipping_ffl_onfile");
	if (fflOnFile) {
		if (data.ffl_on_file){	
			setNativeValue(fflOnFile, "Yes");
		}else{
			setNativeValue(fflOnFile, "No");
		}		
		fflOnFile.readOnly = true;
	}

	// Always set FFL name and phone for order tracking
	var fflName = document.getElementById("shipping_ffl_name");
	if (fflName) {
		// Use fallback logic to get the best available FFL name
		var nameFields = ['list_name', 'company_name', 'business_name', 'name', 'trading_name', 'license_name'];
		var displayName = 'FFL Dealer'; // fallback
		
		for (var i = 0; i < nameFields.length; i++) {
			var field = nameFields[i];
			if (data[field] && data[field].trim() !== '') {
				displayName = data[field].trim();
				break;
			}
		}
		
		// Last resort: try to construct from first/last name
		if (displayName === 'FFL Dealer' && data.first_name && data.last_name) {
			var fullName = (data.first_name + ' ' + data.last_name).trim();
			if (fullName !== '') {
				displayName = fullName;
			}
		}
		
		// Final fallback: use license number if available
		if (displayName === 'FFL Dealer' && data.license_number) {
			displayName = 'FFL #' + data.license_number;
		}
		
		setNativeValue(fflName, displayName);
		fflName.readOnly = true;
	}

	var fflPhoneField = document.getElementById("shipping_ffl_phone");
	if (fflPhoneField) {
		setNativeValue(fflPhoneField, data.voice_phone);
		fflPhoneField.readOnly = true;
	}
	
	// Always set shipping_state field when FFL is selected
	var shippingState = document.getElementById("shipping_state");
	if (shippingState) {
		setNativeValue(shippingState, data.premise_state);
		shippingState.readOnly = true;
		shippingState.disabled = false;
	}
	
	// Set values without triggering automatic form submission
	// Use a flag to temporarily disable checkout processing
	window.fflUpdatingFields = true;
	
	// Set values using native setters to avoid triggering validation
	jQuery("#shipping_state").val(data.premise_state);
	jQuery("#shipping_country").val("US");
	
	// Re-enable processing after a short delay and trigger change events safely
	setTimeout(function() {
		window.fflUpdatingFields = false;
		jQuery("#shipping_state").trigger("change");
		jQuery("#shipping_country").trigger("change");
	}, 250);

	//jQuery("#shipping_country").prop("disabled",true);
	//jQuery("#shipping_state").prop("disabled",true);
	
	// Only hide state and country fields if not a mixed cart
	if (!mixedCartSupport || !isMixedCart) {
		if (document.getElementById("shipping_state_field") != null) {
			document.getElementById("shipping_state_field").style.display = 'none';
		}
		if (document.getElementById("shipping_country_field") != null) {
			document.getElementById("shipping_country_field").style.display = 'none';
		}
	}
	
	// Prevent any automatic form submission
	return false;
}

function setNativeValue(element, value) {
	// Check if element exists and is not null
	if (!element || element === null || element === undefined) {
		console.warn('setNativeValue: Element is null or undefined');
		return;
	}

	var _ref = Object.getOwnPropertyDescriptor(element, 'value') || {},
		valueSetter = _ref.set;

	var prototype = Object.getPrototypeOf(element);

	var _ref2 = Object.getOwnPropertyDescriptor(prototype, 'value') || {},
		prototypeValueSetter = _ref2.set;

	if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
		prototypeValueSetter.call(element, value);
	} else if (valueSetter) {
		valueSetter.call(element, value);
	} else {
		// Fallback for elements that don't have value setters
		element.value = value;
	}
}

function autoSelectSingleFFL() {
    var fflRows = document.querySelectorAll(".ffl-list-div");
    if (fflRows.length === 1) {
        var singleFFL = fflRows[0];
        singleFFL.click();
    }
}

// Trigger autoSelectSingleFFL after FFL list is populated
jQuery(document).on('fflListPopulated', function() {
    autoSelectSingleFFL();
});



