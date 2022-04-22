Template.resetpassword.onCreated(function() {});
Template.resetpassword.onRendered(function() {});
Template.resetpassword.helpers({});
Template.resetpassword.events({
	'click #resetPasswordButton': function(e) {
		e.preventDefault();
		var emailAddress = $(".resetpassword #userEmailAddress").val();
		if(emailAddress == "" || emailAddress == null){
			$("#userEmailAddress").parent().addClass("errorClassDiv");
			$("#userEmailAddress").addClass("errorClass");
			alert("Please enter email address to continue.");
			return;
		}
		else
		{
			$("#userEmailAddress").parent().removeClass("errorClassDiv");
			$("#userEmailAddress").removeClass("errorClass");
			if(!validateEmail(emailAddress))
			{
				$("#userEmailAddress").parent().addClass("errorClassDiv");
				$("#userEmailAddress").addClass("errorClass");
				alert("Please enter valid email address.");
				return;
			}
			else
			{
				$("#userEmailAddress").parent().removeClass("errorClassDiv");
				$("#userEmailAddress").removeClass("errorClass");
				$(e.target).html('Please Wait... <i class="fa fa-spinner fa-spin"></i>');
				Meteor.call("isUserExist", emailAddress, function(err, res){
					if(err)
					{
						$(e.target).html('Reset Password');
						alert(err.reason);
					}
					else
					{
						if(res)
						{
							if(res.exist)
							{
								Meteor.call("sendVerificationEmail", emailAddress, function(errr, ress){
									if(errr)
									{
										$(e.target).html('Reset Password');
										alert(errr.reason);
									}
									else
									{
										if(ress)
										{
											$(e.target).html('Reset Password');
											alert("Please check your email address to reset password.");
											Router.go("/");
										}
										else
										{
											$(e.target).html('Reset Password');
										}
									}
								});
							}
							else
							{
								$(e.target).html('Reset Password');
								alert("No user is registered with this email address.");
							}
						}
						else
						{
							$(e.target).html('Reset Password');
						}
					}
				});
			}
		}
	}
});