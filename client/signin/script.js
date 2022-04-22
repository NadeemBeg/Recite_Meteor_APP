Template.appLogin.onCreated(function(){

});
Template.appLogin.onRendered(function(){
	$(".copytocontacts.privacyPolicyPop").hide();
	$(".copytocontacts.termsConditionspop").hide();
});
Template.appLogin.helpers({});
Template.appLogin.events({
	'click .privacyPolicyPoP': function(e){
		console.log("call");
		$(".copytocontacts.privacyPolicyPop").slideToggle();
	},
	'click .termsAndConditions': function(e){
		console.log("call");
		$(".copytocontacts.termsConditionspop").slideToggle();
	},
	'click #loginButton': function(e){
		e.preventDefault();
		var userEmail = $("#userEmailAddress").val();
		var userPassword = $("#userPassword").val();
		var requiredFields = $(".isRequired");
		var error = 0;
		requiredFields.each(function(key, val){
			if($(val).val() == "" || $(val).val() == null)
			{
				$(val).parent().addClass("errorClassDiv");
				$(val).addClass("errorClass");
				error++;
			}
			else
			{
				$(val).parent().removeClass("errorClassDiv");
				$(val).removeClass("errorClass");
			}
		});
		if(error > 0)
		{
			alert("Please enter all the fields.");
			return;
		}
		else
		{
			if(!validateEmail(userEmail.trim()))
			{
				$("#userEmailAddress").parent().addClass("errorClassDiv");
				$("#userEmailAddress").addClass("errorClass");
				alert("Please enter valid email address.");
				return;
			}
			else
			{
				$(e.target).html('<i class="fa fa-spinner fa-spin"></i> Please Wait...');
				Meteor.call("isDeletedAccount", $("#userEmailAddress").val(), function(err, res){
					if(err)
					{
						$(e.target).html('Login');
						alert(err.reason);
					}
					else
					{
						if(!res)
						{
							Meteor.loginWithPassword({"username":userEmail.trim()}, userPassword, function(error){
								if(error)
								{
									alert(error.reason);
									$(e.target).html('Login');
								}
								else
								{
									//alert("You are successfully logged in.");
									//$(e.target).html('Login');
									console.log(Meteor.user());
									//Router.go("/filelistview");
									Router.go("/folders/" + Meteor.userId());
								}
							});
						}
						else
						{
							$(e.target).html('Login');
							alert("Your account was deleted. Please contact to administrator.");
						}
					}
				})
				
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
				Meteor.call("isDeletedAccount", Meteor.user().username, function(err, res){
					if(err)
					{
						$(e.target).html('Login');
						alert(err.reason);
					}
					else
					{
						if(!res)
						{
							setTimeout(function(){
			                	//Router.go("/filelistview");
			                	Router.go("/folders/" + Meteor.userId());
			                },500);
			                console.log("login successful.");
						}
						else
						{
							$(e.target).html('Login');
							alert("Your account was deleted. Please contact to administrator.");
							Meteor.logout(function(){
								Router.go("/login");
							});
						}
					}
				})
				
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
				Meteor.call("isDeletedAccount", Meteor.user().username, function(err, res){
					if(err)
					{
						$(e.target).html('Login');
						alert(err.reason);
					}
					else
					{
						if(!res)
						{
							setTimeout(function(){
			                	//Router.go("/filelistview");
			                	Router.go("/folders/" + Meteor.userId());
			                },500);
			                console.log("facebook login was successful.");
						}
						else
						{
							$(e.target).html('Login');
							alert("Your account was deleted. Please contact to administrator.");
							Meteor.logout(function(){
								Router.go("/login");
							});
						}
					}
				})
				
			}
	    });
	},
});
