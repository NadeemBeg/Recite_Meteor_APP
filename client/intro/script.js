Template.appIntro.onCreated(function(){});
Template.appIntro.onRendered(function(){});
Template.appIntro.helpers({});
Template.appIntro.events({
	'click #appIntroSubmit': function(e) {
		e.preventDefault();
		console.log("test");
		localStorage.setItem("newlyInstalled","No");
		Router.go("/signin");
	}
});