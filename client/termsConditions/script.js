Template.termsConditions.events({
	'click #doneButton': function(e)
	{
		e.preventDefault();
		$(".copytocontacts.termsConditionspop").slideToggle();
	}
});

Template.privacyPolicy.events({
	'click #doneButton': function(e)
	{
		e.preventDefault();
		$(".copytocontacts.privacyPolicyPop").slideToggle();
	}
});