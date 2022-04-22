Template.verificationone.onCreated(function(){});
Template.verificationone.onRendered(function(){
	

});
Template.verificationone.helpers({
	getMobileNumber: function()
	{
		var user = Meteor.user();
		if(typeof user !== "undefined")
		{
			if(typeof user.profile !== "undefined")
			{
				if(typeof user.profile.phoneNumber !== "undefined")
				{
					return user.profile.phoneNumber;
				}
			}
		}
	}

});
Template.verificationone.events({
	'click .verifySubmitButton': function(e)
	{
		e.preventDefault();
		var phoneNumber = $("#phoneNumber").val();
		if(phoneNumber == "" || phoneNumber == null)
		{
			$(".errorSpan").html("Phone Number is required.");
		}
		else
		{
			if(phoneNumber.length < 10)
			{
				$(".errorSpan").html("Please enter valid phone number.");
			}
			else
			{
				$(".errorSpan").html("");
				/*if(phoneNumber !== Meteor.user().profile.phoneNumber)
				{
					$(".errorSpan").html("Phone number does not match with the number user for registeration.");
					return;
				}*/
				var finalNumber = "+" + $("#countryCode").val() + $("#phoneNumber").val();
				var otp = Math.floor(1000 + Math.random() * 9000);
				$(e.target).html('Please Wait... <i class="fa fa-spinner fa-spin"></i> ');
				Meteor.call("updateOTP", Meteor.userId(), otp, new Date(), phoneNumber,function(err, res){
					if(err)
					{
						alert(err.reason);
					}
					else
					{
						localStorage.setItem("phoneNumber",finalNumber);
						Meteor.call("sendSMS", finalNumber, otp + " is your Recite verification code, enter in Recite Verify Account. Expires in 10 minutes.", function(err1, res1){});
						setTimeout(function(){
							$(e.target).html('Submit');
							Router.go("/verify-code");
						},3000);
					}
				});
				
			}
		}
	}
});
Template.verificationtwo.onRendered(function(){
	var obj = document.getElementById('partitioned');
	obj.addEventListener("keydown", stopCarret); 
	obj.addEventListener("keyup", stopCarret); 

	function stopCarret() {
		if (obj.value.length > 3){
			setCaretPosition(obj, 3);
		}
	}

	function setCaretPosition(elem, caretPos) {
	    if(elem != null) {
	        if(elem.createTextRange) {
	            var range = elem.createTextRange();
	            range.move('character', caretPos);
	            range.select();
	        }
	        else {
	            if(elem.selectionStart) {
	                elem.focus();
	                elem.setSelectionRange(caretPos, caretPos);
	            }
	            else
	                elem.focus();
	        }
	    }
	}     
	$(".verify-text-box[data-no='1']").focus();
});
Template.verificationtwo.events({
	'keyup .verify-text-box': function(e)
	{
		e.preventDefault();
		var elem = $(e.target);
		console.log(elem.val());
		console.log(e.keyCode);
		var otpEntered = elem.val();
		if(otpEntered.length == 4)
		{
			$(".verificationMessage p").html("Please Wait.... <i class='fa fa-spinner fa-spin'></i>");
			
			if(Meteor.user().profile.otp == otpEntered)
			{
				var isExpired = isExpiredOTP(Meteor.user().profile.otp);
				if(!isExpired)
				{
					$(".verificationMessage p").html("<span style='color:green;'>Correct OTP!</span> Please wait for verification.");
					Meteor.call("verifyUser", Meteor.userId(), function(err,res){
						if(err)
						{
							alert(err.reason);
						}
						else
						{
							setTimeout(function(){
								$(".verificationMessage p").html("Verification was successful.");
							},2000);
							setTimeout(function(){
								Router.go("/home");
							},3000);
						}
					});
				}
				else
				{
					$(".verificationMessage p").html("<span style='color:red;'>OTP expired!</span> Please click <a href='#' id='sendAgain'> here </a> to get new otp.");
				}
			}
			else
			{
				$(".verificationMessage p").html("Invalid OTP entered.");
			}
		}




		/*if(elem.attr("data-no") == "1")
		{
			if(e.keyCode >= 48 && e.keyCode <= 57)
			{
				$(".verify-text-box[data-no='2']").focus();
			}
			else if(e.keyCode == 9) // tab
			{
				$(".verify-text-box[data-no='2']").focus();
			}
			else if(e.keyCode == 13) // enter
			{
				$(".verify-text-box[data-no='2']").focus();
			}
			else if(e.keyCode == 8) // backspace
			{
				return;
			}
			else
			{
				return;
			}
		}
		else if(elem.attr("data-no") == "2")
		{
			if(e.keyCode >= 48 && e.keyCode <= 57)
			{
				$(".verify-text-box[data-no='3']").focus();
			}
			else if(e.keyCode == 9) // tab
			{
				$(".verify-text-box[data-no='3']").focus();
			}
			else if(e.keyCode == 13) // enter
			{
				$(".verify-text-box[data-no='3']").focus();
			}
			else if(e.keyCode == 8) // backspace
			{
				$(".verify-text-box[data-no='1']").focus();
			}
			else
			{
				return;
			}
		}
		else if(elem.attr("data-no") == "3")
		{
			if(e.keyCode >= 48 && e.keyCode <= 57)
			{
				$(".verify-text-box[data-no='4']").focus();
			}
			else if(e.keyCode == 9) // tab
			{
				$(".verify-text-box[data-no='4']").focus();
			}
			else if(e.keyCode == 13) // enter
			{
				$(".verify-text-box[data-no='4']").focus();
			}
			else if(e.keyCode == 8) // backspace
			{
				$(".verify-text-box[data-no='2']").focus();
			}
			else
			{
				return;
			}
		}
		else if(elem.attr("data-no") == "4")
		{
			if(e.keyCode >= 48 && e.keyCode <= 57)
			{
				$(".verificationMessage p").html("Please Wait.... <i class='fa fa-spinner fa-spin'></i>");
				var otpEntered = "";
				otpEntered += $(".verify-text-box[data-no='1']").val();
				otpEntered += $(".verify-text-box[data-no='2']").val();
				otpEntered += $(".verify-text-box[data-no='3']").val();
				otpEntered += $(".verify-text-box[data-no='4']").val();
				if(Meteor.user().profile.otp == otpEntered)
				{
					var isExpired = isExpiredOTP(Meteor.user().profile.otp);
					if(!isExpired)
					{
						$(".verificationMessage p").html("<span style='color:green;'>Correct OTP!</span> Please wait for verification.");
						Meteor.call("verifyUser", Meteor.userId(), function(err,res){
							if(err)
							{
								alert(err.reason);
							}
							else
							{
								setTimeout(function(){
									$(".verificationMessage p").html("Verification was successful.");
								},2000);
								setTimeout(function(){
									Router.go("/filelistview");
								},3000);
							}
						});
					}
					else
					{
						$(".verificationMessage p").html("<span style='color:red;'>OTP expired!</span> Please click <a href='#' id='sendAgain'> here </a> to get new otp.");
					}
				}
				else
				{
					$(".verificationMessage p").html("Invalid OTP entered.");
				}
			}
			else if(e.keyCode == 9) // tab
			{
				//$(".verificationMessage p").html("Please Wait.... <i class='fa fa-spinner fa-spin'></i>");
			}
			else if(e.keyCode == 13) // enter
			{
				//$(".verificationMessage p").html("Please Wait.... <i class='fa fa-spinner fa-spin'></i>");
			}
			else if(e.keyCode == 8) // backspace
			{
				$(".verify-text-box[data-no='3']").focus();
			}
			else
			{
				return;
			}
		}*/
	},
	'click .didnu2019treceivecode': function(e){
		e.preventDefault();
		if($(e.target).html().trim() == "Didn’t receive code?")
		{
			$(e.target).html("Please wait.. sending new OTP.");
			var finalNumber = localStorage.getItem("phoneNumber");
			var otp = Math.floor(1000 + Math.random() * 9000);
			Meteor.call("updateOTP", Meteor.userId(), otp, new Date(), function(err, res){
				if(err)
				{
					alert(err.reason);
				}
				else
				{
					Meteor.call("sendSMS", finalNumber, otp + " is your Recite verification code, enter in Recite Verify Account. Expires in 10 minutes.", function(err1, res1){});
					setTimeout(function(){
						$(e.target).html('Didn’t receive code?');
					},3000);
				}
			});
		}
	},
	'click #sendAgain': function(e)
	{
		var finalNumber = localStorage.getItem("phoneNumber");
		var otp = Math.floor(1000 + Math.random() * 9000);
		Meteor.call("updateOTP", Meteor.userId(), otp, new Date(), function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				Meteor.call("sendSMS", finalNumber, otp + " is your Recite verification code, enter in Recite Verify Account. Expires in 10 minutes.", function(err1, res1){});
				$(".verificationMessage p").html('');
			}
		});
	}
});
function isExpiredOTP(otp)
{
	var currentTime = new Date();
	var otpTime = Meteor.user().profile.otpTime;
	var diff =  (currentTime.getTime() - otpTime.getTime()) / 1000 / 60;
	if(diff > 10)
	{
		return true;
	}
	else
	{
		return false;
	}

}