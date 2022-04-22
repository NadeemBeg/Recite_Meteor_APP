
Template.accountsTab.onCreated(function(){});
Template.accountsTab.onRendered(function(){
	appHistoryPush("/accounts");
	$(".copytocontacts.privacyPolicyPop").hide();
	$(".copytocontacts.termsConditionspop").hide();

	/*var windowHeight = $(window).height();
	var topHeader = $(".topHeader").outerHeight();
	var belowTab = $(".belowTab").outerHeight();
	$(".userAccount").css("height",windowHeight+"px");
	$(".accountRows").css("height", (windowHeight - topHeader - belowTab)+"px") ;
	$(".accountRows").css("overflow", "auto");
	$(".accountRows").css("display", "inline-block");*/
	$(".selectFileOverlay .overlayBackground").hide();



	
	
});
Template.accountsTab.helpers({
	getLoggedInUserDetails: function()
	{
		if(Meteor.userId() !== null)
		return Meteor.user();
	},
	isCordova: function()
	{
		return Meteor.isCordova;
	},
});
Template.accountsTab.events({
	'click .addNewCollaborator':function(e){
		Session.set("previousURLApp","/collaboratorsPage");
		appHistoryPush("/collaboratorsPage");
		Router.go("/collaboratorsPage");
	},
	'click .gotoPayment':function(e){
		Session.set("previousURLApp","/payment");
		appHistoryPush("/payment");
		Router.go("/payment");
	},
	'click .termsAndConditions': function(e){
		console.log("call");
		$(".copytocontacts.termsConditionspop").slideToggle();
	},
	'click .privacyPolicyPoP': function(e){
		console.log("call");
		$(".copytocontacts.privacyPolicyPop").slideToggle();
	},
	'click .belloringalarmvoicereminder':function(e){
		e.preventDefault();
		Session.set("previousURLApp","/notifications");
		appHistoryPush("/notifications");
		Router.go("/notifications");
	},
	'click #shareApp': function(e){
		e.preventDefault();
		var platform = device.platform;
		if(platform.toLowerCase() == "android")
		{
			window.plugins.socialsharing.share('Share App', null, null, 'http://www.testinglink-android.com');
		}
		else
		{
			window.plugins.socialsharing.share('Share App', null, null, 'http://www.testinglink-ios.com');
		}
	},
	'click #notificatinSettings': function(e)
	{
		e.preventDefault();
		Session.set("previousURLApp","/settings");
		appHistoryPush("/settings");
		Router.go("/settings");
	},
	'click #upgradeStorage': function(e)
	{
		e.preventDefault();
		Session.set("previousURLApp","/upgrade");
		appHistoryPush("/upgrade");
		Router.go("/upgrade");
	},
	'click #logoutItem': function(e)
	{
		e.preventDefault();
		var c = confirm("Are you sure you want to sign out? \n\n The app will be redirected to sign-in.");
		if(c)
		{
			Meteor.logout(function(){
				Router.go("/login");
			});
		}
	},
	'click #resetPasswordItem': function(e)
	{
		e.preventDefault();
		Session.set("previousURLApp","/reset-password");
		appHistoryPush("/reset-password");
		Router.go("/reset-password");
	},
	'click #editProfile': function(e)
	{
		Session.set("previousURLApp","/edit-profile/" + Meteor.userId());
		appHistoryPush("/edit-profile/" + Meteor.userId());
		Router.go("/edit-profile/" + Meteor.userId());

	},
	'click #emailSupportDiv': function(e)
	{
		Session.set("previousURLApp","/email-support");
		appHistoryPush("/email-support");
		Router.go("/email-support");
	}
});