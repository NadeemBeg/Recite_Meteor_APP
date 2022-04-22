Template.storageUpgrade.onCreated(function(){
	Meteor.subscribe("getUserPlans", Meteor.userId());
});
Template.storageUpgrade.onRendered(function(){});
Template.storageUpgrade.helpers({
	getAccountType: function(){
		var userId = Meteor.userId();
		var planData = userPlans.find({
			"userId": userId,
			"isExpired": false
		},{
			sort: {
				"recordDate": -1
			}
		});
		if(planData.count() > 0)
		{
			planData = userPlans.findOne({
				"userId": userId,
				"isExpired": false
			},{
				sort: {
					"recordDate": -1
				}
			});
			if(planData.planType == "Monthly")
			{
				var returnData = {
					"type": "Monthly",
					"storage": "100 GB Total"
				}
				return returnData;
			}
			else
			{
				var returnData = {
					"type": "Yearly",
					"storage": "Unlimited Storage"
				}
				return returnData;
			}
		}
		else
		{
			var returnData = {
				"type": "Free",
				"storage": "2 GB Total"
			}
			return returnData;
		}
	},
	showUpgradeOptions: function()
	{
		var userId = Meteor.userId();
		var planData = userPlans.find({
			"userId": userId,
			"isExpired": false
		},{
			sort: {
				"recordDate": -1
			}
		});
		if(planData.count() > 0)
		{
			planData = userPlans.findOne({
				"userId": userId,
				"isExpired": false
			},{
				sort: {
					"recordDate": -1
				}
			});
			var endDate = planData.planEndDate;
			var currentDate = new Date();
			if(currentDate < endDate)
			{
				var diff = endDate.getTime() - currentDate.getTime();
				var a = diff / (1000 * 3600 * 24);
				if(a <= 2)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			else
			{
				var diff = currentDate.getTime() - endDate.getTime();
				var a = diff / (1000 * 3600 * 24);
				if(a <= 2)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		else
		{
			return true;
		}
	}
});
Template.storageUpgrade.events({
	'click .monthlySubscriptionButton': function(e){
		e.preventDefault();
		var elem = $(e.target);
		var planTypeSelected = elem.attr("data-type");
		if(planTypeSelected == "monthly")
		{
			var planPrice = 999;
			var planDesc = "Monthly Subscription ($9.99)";
			var planType = "Monthly";
		}
		else
		{
			var planPrice = 9999;
			var planDesc = "Yearly Subscription ($99.99)";
			var planType = "Yearly";
		}
		StripeCheckout.open({
		    key: 'pk_test_wP3Cj05BIWqEe4tLITHwCqSi008AAgA12c',
		    amount: planPrice,
		    name: 'Recite',
		    description: planDesc,
		    panelLabel: 'Pay Now',
		    token: function(res) {
		        // Do something with res.id
		        // Store it in Mongo and/or create a charge on the server-side
		        console.info(res);
		        if(typeof res.id !== "undefined")
		        {
		        	Meteor.call("savePayment", res, Meteor.userId(), new Date(), function(err, res1){
		        		if(err)
		        		{
		        			alert(err.reason);
		        		}
		        		else
		        		{
		        			Meteor.call("setUserPlan", Meteor.userId(), res1, planType, function(err1, res2){
		        				if(err1)
		        				{
		        					alert("Something went wrong. Please contact administrator.");
		        				}
		        				else
		        				{
		        					alert("Payment process was successful.");
		        					Router.go("/accounts");
		        				}
		        			});
		        		}
		        	});
		        }
		        else
		        {
		        	alert("Payment failed please try again after sometime.");
		        }
		    }
		});
	},
	'click #deleteAccountButton': function(e)
	{
		e.preventDefault();
		var c = confirm("Are you sure you want to delete this account? \n\n All decisions are final.");
		console.log("c",c);
		if(c)
		{
			var me = Meteor.userId();
			localStorage.setItem("deleteAccount", me);
			Meteor.logout(function(){
				Meteor.call("deleteAccount", localStorage.getItem("deleteAccount"), function(err, res){
					console.log(res,"res");
					if(err)
					{
						alert(err.reason);
					}
					else
					{
						alert("Your account was deleted successfully.",res);
					}
				});
				setTimeout(function(){
					Router.go("/signin");
				},1000);				
			});
		}
	},
	'click .backbuttontopnav': function(e)
	{
		e.preventDefault();
		Router.go("/accounts");
	}
});