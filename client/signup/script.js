Template.appSignup.onCreated(function(){});
Template.appSignup.onRendered(function(){
	$(".copytocontacts.termsConditionspop").hide();
	$("#textEmailAddress").val('');
	$("#textPassword").val('');
	$("#textPhoneNumber").inputmask();
	$(".copytocontacts.privacyPolicyPop").hide();
	$(".copytocontacts.termsConditionspop").hide();
});
Template.appSignup.helpers({});
Template.appSignup.events({
	'click .privacyPolicyPoP': function(e){
		console.log("call");
		$(".copytocontacts.privacyPolicyPop").slideToggle();
	},
	'click .termsAndConditions': function(e){
		console.log("call");
		$(".copytocontacts.termsConditionspop").slideToggle();
	},
	'click .termsAndConditions': function(e){
		console.log("call");
		$(".copytocontacts.termsConditionspop").slideToggle();
	},
	'click #signupButton': function(e){
		e.preventDefault();
		var fullName = $("#textFullName").val();
		var phoneNumber = $("#textPhoneNumber").val();
		phoneNumber = phoneNumber.replace(/[()-]/g,"");
		var emailAddress = $("#textEmailAddress").val();
		var userPassword = $("#textPassword").val();
		var userConfirmPassword = $("#textConfirmPassword").val();
		var requiredFields = $(".isRequired");
		var error = 0;
		/*requiredFields.each(function(key, val){
			if($(val).val() == "" || $(val).val() == null)
			{
				$(val).parent().addClass("errorClassDiv");
				$(val).addClass("errorClass");
				var message = "Please enter " + $(val).attr("placeholder").toLowerCase() + ".";
				alert(message);
				error++;
				return;
			}
			else
			{
				$(val).parent().removeClass("errorClassDiv");
				$(val).removeClass("errorClass");
			}
		});*/
		var b = /^(?![0-9]*$)[a-zA-Z0-9 ]+$/
		if(fullName == "" || fullName == null)
		{
			$("#textFullName").parent().addClass("errorClassDiv");
			$("#textFullName").addClass("errorClass");
			var message = "Please enter " + $("#textFullName").attr("placeholder").toLowerCase() + ".";
			alert(message);
			error++;
			return;
		}
		else if(!b.test(fullName))
		{
			$("#textFullName").parent().addClass("errorClassDiv");
			$("#textFullName").addClass("errorClass");
			var message = "Please enter valid " + $("#textFullName").attr("placeholder").toLowerCase() + ".";
			alert(message);
			error++;
			return;
		}
		else
		{
			$("#textFullName").parent().removeClass("errorClassDiv");
			$("#textFullName").removeClass("errorClass");
		}
		var a = /^[0-9]{10}$/gm
		
		if(phoneNumber == "" || phoneNumber == null)
		{
			$("#textPhoneNumber").parent().addClass("errorClassDiv");
			$("#textPhoneNumber").addClass("errorClass");
			var message = "Please enter " + $("#textPhoneNumber").attr("placeholder").toLowerCase() + ".";
			alert(message);
			error++;
			return;
		}
		else if(!a.test(phoneNumber))
		{
			$("#textPhoneNumber").parent().addClass("errorClassDiv");
			$("#textPhoneNumber").addClass("errorClass");
			var message = "Please enter valid " + $("#textPhoneNumber").attr("placeholder").toLowerCase() + ".";
			alert(message);
			error++;
			return;
		}
		else
		{
			$("#textPhoneNumber").parent().removeClass("errorClassDiv");
			$("#textPhoneNumber").removeClass("errorClass");
		}

		if(emailAddress == "" || emailAddress == null)
		{
			$("#textEmailAddress").parent().addClass("errorClassDiv");
			$("#textEmailAddress").addClass("errorClass");
			var message = "Please enter " + $("#textEmailAddress").attr("placeholder").toLowerCase() + ".";
			alert(message);
			error++;
			return;
		}
		else
		{
			$("#textEmailAddress").parent().removeClass("errorClassDiv");
			$("#textEmailAddress").removeClass("errorClass");
		}

		if(userPassword == "" || userPassword == null)
		{
			$("#textPassword").parent().addClass("errorClassDiv");
			$("#textPassword").addClass("errorClass");
			var message = "Please enter " + $("#textPassword").attr("placeholder").toLowerCase() + ".";
			alert(message);
			error++;
			return;
		}
		else
		{
			$("#textPassword").parent().removeClass("errorClassDiv");
			$("#textPassword").removeClass("errorClass");
		}

		if(userConfirmPassword == "" || userConfirmPassword == null)
		{
			$("#textConfirmPassword").parent().addClass("errorClassDiv");
			$("#textConfirmPassword").addClass("errorClass");
			var message = "Please enter " + $("#textConfirmPassword").attr("placeholder").toLowerCase() + ".";
			alert(message);
			error++;
			return;
		}
		else
		{
			$("#textConfirmPassword").parent().removeClass("errorClassDiv");
			$("#textConfirmPassword").removeClass("errorClass");
		}

		if(error > 0)
		{
			//alert("Please enter all the fields.");
			return;
		}
		else if(userConfirmPassword != userPassword)
		{
			$("#textPassword").parent().addClass("errorClassDiv");
			$("#textPassword").addClass("errorClass");
			$("#textConfirmPassword").parent().addClass("errorClassDiv");
			$("#textConfirmPassword").addClass("errorClass");
			alert("Password and confirm password should be same.");
		}
		else
		{
			$("#textPassword").parent().removeClass("errorClassDiv");
			$("#textPassword").removeClass("errorClass");
			$("#textConfirmPassword").parent().removeClass("errorClassDiv");
			$("#textConfirmPassword").removeClass("errorClass");
			if(!validateEmail(emailAddress.trim()))
			{
				$("#textEmailAddress").parent().addClass("errorClassDiv");
				$("#textEmailAddress").addClass("errorClass");
				alert("Please enter valid email address.");
				return;
			}
			else
			{
				
				$("#textEmailAddress").parent().removeClass("errorClassDiv");
				$("#textEmailAddress").removeClass("errorClass");
				$(e.target).html('Please Wait... <i class="fa fa-spinner fa-spin"></i> ');
				var userData = {
					fullName: fullName,
					phoneNumber: phoneNumber
				};
				var registerData = {
					profile: userData,
					email: emailAddress,
					username: emailAddress,
					password: userPassword,
					roles:["user"]
				};
				Accounts.createUser(registerData, function(error){
					if(error)
					{
						alert(error.reason);
						$(e.target).html('Submit');
					}
					else
					{
						if (Meteor.user()) {
							//alert("Sign Up was successful.");
							$(e.target).html('Submit');
							var html = "Hello " + fullName;
							//html += "\n\nWelcome to Recite App. \n\nThank You,\nRecite App Team.";
							html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html style="width:100%;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New email template 2019-09-26</title><style type="text/css">@media only screen and (max-width:600px){p, ul li, ol li,a{font-size:16px!important;line-height:150%!important}h1{font-size:30px!important;text-align:center;line-height:120%!important}h2{font-size:26px!important;text-align:center;line-height:120%!important}h3{font-size:20px!important;text-align:center;line-height:120%!important}h1 a{font-size:30px!important}h2 a{font-size:26px!important}h3 a{font-size:20px!important}.es-menu td a{font-size:14px!important}.es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a{font-size:14px!important}.es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a{font-size:14px!important}.es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a{font-size:12px!important}*[class="gmail-fix"]{display:none!important}.es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3{text-align:center!important}.es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3{text-align:right!important}.es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3{text-align:left!important}.es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img{display:inline!important}.es-button-border{display:inline-block!important}a.es-button{font-size:20px!important;display:inline-block!important}.es-btn-fw{border-width:10px 0px!important;text-align:center!important}.es-adaptive table,.es-btn-fw,.es-btn-fw-brdr,.es-left,.es-right{width:100%!important}.es-content table, .es-header table, .es-footer table,.es-content,.es-footer,.es-header{width:100%!important;max-width:600px!important}.es-adapt-td{display:block!important;width:100%!important}.adapt-img{width:100%!important;height:auto!important}.es-m-p0{padding:0px!important}.es-m-p0r{padding-right:0px!important}.es-m-p0l{padding-left:0px!important}.es-m-p0t{padding-top:0px!important}.es-m-p0b{padding-bottom:0!important}.es-m-p20b{padding-bottom:20px!important}.es-mobile-hidden,.es-hidden{display:none!important}.es-desk-hidden{display:table-row!important;width:auto!important;overflow:visible!important;float:none!important;max-height:inherit!important;line-height:inherit!important}.es-desk-menu-hidden{display:table-cell!important}table.es-table-not-adapt, .esd-block-html table{width:auto!important}table.es-social{display:inline-block!important}table.es-social td{display:inline-block!important}}#outlook a{padding:0}.ExternalClass{width:100%}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%}.es-button{mso-style-priority:100!important;text-decoration:none!important}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.es-desk-hidden{display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all}</style></head><body style="width:100%;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;"><div class="es-wrapper-color" style="background-color:#FFFFFF;"> <!--[if gte mso 9]> <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#ffffff"></v:fill> </v:background> <![endif]--><table class="es-wrapper" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;" width="100%" cellspacing="0" cellpadding="0"><tr style="border-collapse:collapse;"><td valign="top" style="padding:0;Margin:0;"><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tr style="border-collapse:collapse;"><td class="es-adaptive" align="center" style="padding:0;Margin:0;"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr style="border-collapse:collapse;"><td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;"> <!--[if mso]><table width="560"><tr><td width="268" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"><tr style="border-collapse:collapse;"><td width="268" align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:14px;color:#CCCCCC;"></p></td></tr></table></td></tr></table> <!--[if mso]></td><td width="20"></td><td width="272" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;"><tr style="border-collapse:collapse;"><td width="272" align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td class="es-infoblock es-m-txt-c" align="right" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:12px;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:14px;color:#CCCCCC;"><a href="#" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:12px;text-decoration:none;color:#CCCCCC;"></a></p></td></tr></table></td></tr></table> <!--[if mso]></td></tr></table><![endif]--></td></tr></table></td></tr></table><table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top;"><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td width="600" valign="top" align="center" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px;"><a href="https://recite-app.herokuapp.com" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img src="https://ecjuei.stripocdn.email/content/guids/81c066bb-0f74-4f26-bef3-04e2c6643ca1/images/86661569480292938.png" alt="Recite" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Recite" width="104"></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td width="600" valign="top" align="center" style="padding:0;Margin:0;"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:3px;background-color:#FCFCFC;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc"><tr style="border-collapse:collapse;"><td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;"><h2 style="Margin:0;line-height:31px;mso-line-height-rule:exactly;font-family:roboto, \'helvetica neue\', helvetica, arial, sans-serif;font-size:26px;font-style:normal;font-weight:normal;color:#333333;">Welcome!</h2></td></tr><tr style="border-collapse:collapse;"><td bgcolor="#fcfcfc" align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px;"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;line-height:21px;color:#333333;">Hi '+ Meteor.user().profile.fullName +', We are excited to have you. Please reach out to us by replying to this email for any questions or suggestions to improve your experience..<br><br>Thank you,<br>The Recite Team @TribeAppsLLC.</p></td></tr></table></td></tr></table></td></tr></table></td></tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FCFCFC;" width="600" cellspacing="0" cellpadding="0" bgcolor="#fcfcfc" align="center"><tr style="border-collapse:collapse;"><td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-bottom:25px;padding-top:40px;"> <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="274" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"><tr style="border-collapse:collapse;"><td class="es-m-p0r es-m-p20b" width="254" align="center" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><h3 style="Margin:0;line-height:20px;mso-line-height-rule:exactly;font-family:roboto, \'helvetica neue\', helvetica, arial, sans-serif;font-size:17px;font-style:normal;font-weight:normal;color:#333333;"></h3></td></tr></table></td><td class="es-hidden" width="20" style="padding:0;Margin:0;"></td></tr></table> <!--[if mso]></td><td width="133" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left;"><tr style="border-collapse:collapse;"><td class="es-m-p20b" width="133" align="center" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img src="https://ecjuei.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/92051534250512328.png" alt="App Store" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" class="adapt-img" title="App Store" width="133"></a></td></tr></table></td></tr></table> <!--[if mso]></td><td width="20"></td><td width="133" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right;"><tr style="border-collapse:collapse;"><td width="133" align="center" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img class="adapt-img" src="https://ecjuei.stripocdn.email/content/guids/CABINET_e48ed8a1cdc6a86a71047ec89b3eabf6/images/82871534250557673.png" alt="Google Play" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;" title="Google Play" width="133"></a></td></tr></table></td></tr></table> <!--[if mso]></td></tr></table><![endif]--></td></tr></table></td></tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tr style="border-collapse:collapse;"><td align="center" style="padding:0;Margin:0;"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td width="600" valign="top" align="center" style="padding:0;Margin:0;"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFF4F7;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fff4f7"><tr style="border-collapse:collapse;"><td align="center" style="Margin:0;padding-bottom:5px;padding-top:20px;padding-left:20px;padding-right:20px;"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:roboto, \'helvetica neue\', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:normal;color:#333333;">Let\'s get social</h3></td></tr></table></td></tr></table></td></tr></table></td></tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;"><tr style="border-collapse:collapse;"><td style="padding:0;Margin:0;background-color:#FFFFFF;" bgcolor="#ffffff" align="center"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr style="border-collapse:collapse;"><td align="left" style="padding:0;Margin:0;"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td width="600" valign="top" align="center" style="padding:0;Margin:0;"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FFF4F7;border-radius:3px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fff4f7"><tr style="border-collapse:collapse;"><td bgcolor="#fff4f7" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td style="padding:0;Margin:0px;border-bottom:1px solid #FFF4F7;background:rgba(0, 0, 0, 0) none repeat scroll 0% 0%;height:1px;width:100%;margin:0px;"></td></tr></table></td></tr><tr style="border-collapse:collapse;"><td align="center" style="Margin:0;padding-top:5px;padding-left:20px;padding-right:20px;padding-bottom:25px;"><table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;"><tr style="border-collapse:collapse;"><td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img title="Facebook" src="https://ecjuei.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a></td><td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img title="Twitter" src="https://ecjuei.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a></td><td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img title="Instagram" src="https://ecjuei.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a></td><td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px;"><a target="_blank" href="#" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-size:14px;text-decoration:none;color:#F6A1B4;"><img title="Youtube" src="https://ecjuei.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;"></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>';
							//html.replace("{{username}}", Meteor.user().profile.fullName);
							Meteor.call("sendEmail", emailAddress, "recite.app.2019@gmail.com", "Welcome to Recite!!!", html);
							setTimeout(function(){Router.go("/verify-number");},500);
							
						}
					}
				});
			}
		}
	},
	'click #googleLogin': function(e) {
		e.preventDefault();
		Meteor.loginWithGoogle(function(err)
		{
			if(err){
				console.log(err);
				//sAlert.error("<b>" + err.reason + "</b>", {});
			}
			else{
				/*setTimeout(function(){
                	Router.go("/dashboard");
                },500);*/
                console.log("login successful.");
			}

		});
	},
	'click #facebookLogin': function(e) {
		e.preventDefault();
		Meteor.loginWithFacebook({
			requestPermissions: ['public_profile', 'email']
		},
		function(err)
		{
			if (err) {
				console.log(err);
				//sAlert.error("<b>" + err.reason + "</b>", {});
			}
			else
			{
				/*setTimeout(function(){
                	Router.go("/dashboard");
                },500);*/
                console.log("facebook login was successful.");
			}
	    });
	},
});