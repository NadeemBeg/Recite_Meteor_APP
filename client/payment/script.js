import { Promise } from 'meteor/promise';
var contactList = new ReactiveVar([]);
var contactListSearch = new ReactiveVar([]);
Template.payment.onCreated(function(){
	// Meteor.subscribe("getUserInvites", Meteor.userId());
	Meteor.subscribe("paymentDetailsUser", Meteor.userId());
	
});
Template.payment.onRendered(function(){
	
});
Template.payment.helpers({
	isIOS: function(){
		if(Meteor.isCordova)
		{
			var platform = device.platform; 
			if(platform.toLowerCase() == "ios")
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
			return false;
		}
	}
});
Template.payment.events({
	'click .backbuttontopnav': function(e){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
	},
	'click .cardPayment': function(e)
	{
		appHistoryPush("/cardPayment");
		Router.go("/cardPayment");
	},
	'keydown #cvvNumber': function(e)
	{
		console.log(e);
	}
});


//cardPaymentPage 

Template.cardPaymentPage.onCreated(function(){

});
Template.cardPaymentPage.onRendered(function(){

});

Template.cardPaymentPage.helpers({

});
Template.cardPaymentPage.events({
	'click .backbuttontopnav': function(e){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
	},
	'click .arrowright336':function(e){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
	},
	'click .saveCardDetials': function(e){
		e.preventDefault();
		var me = $(e.target);
		var NameOnCard = $("#holderName").val();
		var cardNumber = $("#cardNumber").val();
		var monthCategory = $("#monthCategory").val();
		var yearCategory = $("#yearCategory").val();
		var cvvNumber = $("#cvvNumber").val();
		var addressLineOne = $("#addressLineOne").val();
		var	addressLineTwo = $("#addressLineTwo").val();
		var	billingcity = $("#billingcity").val();
		var	stateSelectDropDwon = $("#stateSelectDropDwon").val();
		var	zipCodeSelectDropDwon = $("#zipCodeSelectDropDwon").val();
		var a = /^[0-9]{3}$/gm;
		var nameValidation = /^[a-zA-z ]*$/m;
		var checkZip = /^[0-9]{5,6}$/gm
		
		var date1 = new Date();
		var date2 = new Date();
		// console.log("date1",date1);
		date2.setMonth(monthCategory - 1);
		date2.setFullYear(yearCategory);
		// console.log("date2",date2);
		
		console.log("cvvNumber",cvvNumber);
		
		var error = 0;
		var allFields = $(".isRequired");
		allFields.each(function(key, val){
		var v = $(val).val();
		if(v == null || v == ""){
			error++;
		}
		console.log("v",v);
		});

		  var userId = Meteor.userId();

		  console.log("date1", date1);
		  console.log("date2",date2);
		  console.log(date2 < date1);
		  // var requiredError = isRequired($(".cardDetials"),true);
      if(error == 0)
      { 
      	if(!a.test(cvvNumber))
      	{
      		alert("Please Enter valid CVV");
      		return;
      	}
      	else if(!nameValidation.test(NameOnCard)){
      		alert("Please Enter valid Card Holder Name");
      		return;
      	}
      	else if(date2 < date1){
      		console.log("enter");
      		alert("Please Enter valid Date");
      		return;
      	}
      	else if(!checkZip.test(zipCodeSelectDropDwon))
		{
			alert("Please enter valid Zip/Postal Code.");
		}
      	else{
      		var arr ={
	      		"CardNumber":cardNumber,
	      		"NameOnCard":NameOnCard,
	      		"expirationMonth":monthCategory,
	      		"expirationYear":yearCategory,
				"addressLineOne":addressLineOne,
				"addressLineTwo":addressLineTwo,
				"billingcity":billingcity,
				"stateSelectDropDwon":stateSelectDropDwon,
				"zipCodeSelectDropDwon":zipCodeSelectDropDwon,
				"userId":userId
      		}; 
      		Meteor.call("insertCardDetails", arr, function(err,res){
	        	if(err){
	        		console.log(err);
	        	}
	        	else{
	        		console.log("respons",res);
	        		alert("Save Details successfully");
	        		Router.go("/payment");
	        	}
	        });
		}      	
      }
      else{
      	alert("Please Fill Up All Card Details");
      	return;
        
      }
	}
});