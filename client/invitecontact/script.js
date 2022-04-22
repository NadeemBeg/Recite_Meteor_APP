import { Promise } from 'meteor/promise';
var contactList = new ReactiveVar([]);
var contactListtemp = new ReactiveVar([]);
var contactListSearch = new ReactiveVar([]);
Template.inviteContact.onCreated(function(){
	Meteor.subscribe("getUserInvites", Meteor.userId());
});
Template.inviteContact.onRendered(function(){
	
		var options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;
		options.desiredFields = ["displayName", "phoneNumbers", "photos", "emails"];
		var filter = ["displayName", "phoneNumbers", "emails"];
		navigator.contacts.find(filter, contactSuccess, contactError, options);
	
	Session.set("paging", 10);
	contactListSearch.set([]);
	contactList.set([]);
	contactListtemp.set([]);
});
Template.inviteContact.helpers({
	showSearchBar:function(){		
		if(contactList.get().length > 0)
		{
			return true;
		}
		else
		{
			return false;
		}		
	},
	getContactList: function()
	{
		var a = contactList.get();
		var b = contactListSearch.get();
		console.log("in helper1", contactList.get());
		console.log("in helper2", contactList.get().length);
		console.log("in helper3", contactListSearch.get());
		console.log("in helper4", contactListSearch.get().length);
		var c = [];
		if(b.length > 0)
		{
			return contactListSearch.get();
		}
		else
		{
			for(var i = 0; i < Session.get("paging"); i++)
			{
				c.push(a[i]);
			}
			if(JSON.stringify(c) !== JSON.stringify(contactListtemp.get()))
			{
				contactListtemp.set(c)
			}
			return contactListtemp.get();
		}
	},
	getContactCountsNotYetInApp: function(){
		var data = userInvitess.find({
			"userId": Meteor.userId()
		},{
			sort: {
				"dateInvited": -1
			}
		}).fetch();
		var invitedArray = [];
		for(var i = 0; i < data.length; i++)
		{
			var currentdate = new Date();
			var invitedDate = data[i].dateInvited;
			var diff = (currentdate.getTime() - invitedDate.getTime()) / (1000 * 60 * 60 * 24);
			if(diff < 1)
			{
				invitedArray.push(data[i].invitedUserId);
			}
		}
		console.log(invitedArray);
		if($("#searchTextBoxInvite").val() !== "")
		{
			var contactLists = contactListSearch.get();
			var finalArr = [];
			for(var j = 0; j < contactLists.length; j++)
			{
				if(invitedArray.indexOf(contactLists[j].contactNumber) < 0)
				{
					finalArr.push(contactLists[j]);
				}
			}
		}
		else
		{
			if(contactListSearch.get().length > 0)
			{
				var contactLists = contactListSearch.get()
			}
			else
			{
				var contactLists = contactList.get();
			}
			var finalArr = [];
			console.log(contactLists);
			for(var j = 0; j < contactLists.length; j++)
			{
				console.log("contactNumber", contactLists[j].contactNumber);
				if(invitedArray.indexOf(contactLists[j].contactNumber) < 0)
				{
					finalArr.push(contactLists[j]);
				}
			}
		}
		return finalArr.length;
	},
	noInvited: function(n) {
		var userId = Meteor.userId();
		var invitedId = n;
		var data = userInvitess.findOne({
			"userId": userId,
			"invitedUserId": invitedId
		},{
			sort: {
				"dateInvited": -1
			}
		});
		if(typeof data == "undefined")
		{
			return true;
		}
		if(data !== null)
		{
			var currentdate = new Date();
			var invitedDate = data.dateInvited;
			var diff = (currentdate.getTime() - invitedDate.getTime()) / (1000 * 60 * 60 * 24);
			if(diff < 1)
			{
				return false;
			}
			else
			{
				return true;
			}
		}
		else
		{
			return true;
		}
	},
	isInvited: function(n){
		var userId = Meteor.userId();
		var invitedId = n;
		var data = userInvitess.findOne({
			"userId": userId,
			"invitedUserId": invitedId
		},{
			sort: {
				"dateInvited": -1
			}
		});
		if(typeof data == "undefined")
		{
			return false;
		}
		if(data !== null)
		{
			var currentdate = new Date();
			var invitedDate = data.dateInvited;
			var diff = (currentdate.getTime() - invitedDate.getTime()) / (1000 * 60 * 60 * 24);
			if(diff < 1)
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
Template.inviteContact.events({
	'click .donebtn': function(e){
		Router.go("/");
	},
	'click .backbuttontopnav': function(e){
		Router.go("/");
	},
	'click .inviteButton': function(e)
	{
		e.preventDefault();
		var mobileNumber = $(e.target).attr("data-phone");
		var emailID = $(e.target).attr("data-email");
		var txt = "Hello \n\n";
		//var details = "";
		/*var allContacts = contactList.get();
		for(var i = 0; i < allContacts.length; i++)
		{
			var phoneNumbers = allContacts[i].contactNumber;
			if(phoneNumbers == mobileNumber)
			{
				details = allContacts[i];
			}
		}*/
		txt += "You are being invited by your friend to use Recite App. Please see the link below: \n";
		var link = "https://google.com";
		txt += link + " \n\nThank You.";
		
		

		Meteor.call("singleInvite", Meteor.userId(), mobileNumber, txt, Meteor.bindEnvironment(function(err, res){
			console.log(err);
			console.log(res);
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				Tracker.autorun(function(){
					var aa = ServerSession.get("messageSent");
					if(ServerSession.get("messageSent"))
					{
						console.log(userInvitess.find().fetch());
					}
				});
			}
		}));
		//Meteor.call("sendSMS", mobileNumber, txt);

		Meteor.call("singleInviteEmail", emailID, "recite.app.2019@gmail.com", "Welcome to Recite!!!", txt, Meteor.userId(), function(err, res){
			if(err)
				console.log("err singleInviteEmail",err.reason);
			else
				console.log("singleInviteEmail",res);
		});
	},
	'keyup #searchTextBoxInvite': function(e)
	{
		var val = $(e.target).val();
		var searchArray = contactListSearch.get();
		if(val == "" || val == null)
		{
			contactListSearch.set([]);
		}
		else
		{
			var allContacts = contactList.get();
			console.log("allContacts",allContacts);
			var filteredContacts = [];
			for(var i = 0; i < allContacts.length; i++)
			{
				var displayName = allContacts[i].contactName.toLowerCase();
				if(displayName.indexOf(val.toLowerCase()) >= 0)
				{
		    		filteredContacts.push(allContacts[i]);
				}
				else {
					var phoneNumbers = allContacts[i].contactNumber;
					if(phoneNumbers.indexOf(val.toLowerCase()) >= 0)
					{
						filteredContacts.push(allContacts[i]);
					}
				}
			}
			console.log("filteredContacts",filteredContacts);
			if(filteredContacts.length > 0)
			{
				if(JSON.stringify(searchArray) !== JSON.stringify(filteredContacts))
			    {
			    	contactListSearch.set(filteredContacts);
			    }
			}
			else
			{
				contactListSearch.set([]);
			}
		}
	},
	'click .allInviteButton': function(e){
		e.preventDefault();
		var data = userInvitess.find({
			"userId": Meteor.userId()
		},{
			sort: {
				"dateInvited": -1
			}
		}).fetch();
		var invitedArray = [];
		for(var i = 0; i < data.length; i++)
		{
			var currentdate = new Date();
			var invitedDate = data[i].dateInvited;
			var diff = (currentdate.getTime() - invitedDate.getTime()) / (1000 * 60 * 60 * 24);
			if(diff < 1)
			{
				invitedArray.push(data[i].invitedUserId);
			}
		}
		console.log(invitedArray);
		if($("#searchTextBoxInvite").val() !== "")
		{
			var contactLists = contactListSearch.get();
			var finalArr = [];
			for(var j = 0; j < contactLists.length; j++)
			{
				if(invitedArray.indexOf(contactLists[j].contactNumber) < 0)
				{
					finalArr.push(contactLists[j]);
				}
			}
		}
		else
		{
			if(contactListSearch.get().length > 0)
			{
				var contactLists = contactListSearch.get()
			}
			else
			{
				var contactLists = contactList.get();
			}
			var finalArr = [];
			console.log(contactLists);
			for(var j = 0; j < contactLists.length; j++)
			{
				console.log("contactNumber", contactLists[j].contactNumber);
				if(invitedArray.indexOf(contactLists[j].contactNumber) < 0)
				{
					finalArr.push(contactLists[j]);
				}
			}
		}
		var txt = "Hello \n\n";
		txt += "You are being invited by your friend to use Recite App. Please see the link below: \n";
		var link = "https://google.com";
		txt += link + " \n\nThank You.";
		$(".waitingOverlay .overlayBackground").fadeIn();



		Meteor.call("inviteContactAll", finalArr, Meteor.userId(), txt, function(err, res){
			if(err)
			{
				$(".waitingOverlay .overlayBackground").fadeOut();
				alert(err.reason);
			}
			else
			{
				$(".waitingOverlay .overlayBackground").fadeOut();
				alert("Invitation was sent successfully to all contacts.");
			}
		});

		// Meteor.call("singleInviteEmail",emailID, "recite.app.2019@gmail.com", "Welcome to Recite!!!", txt, Meteor.userId(), function(err, res){
		Meteor.call("inviteContactAllEmails", finalArr, "recite.app.2019@gmail.com", "Welcome to Recite!!!", txt, Meteor.userId(), function(err, res){
			if(err)
			{
				$(".waitingOverlay .overlayBackground").fadeOut();
				alert(err.reason);
			}
			else
			{
				$(".waitingOverlay .overlayBackground").fadeOut();
				alert("Invitation was sent successfully to all contacts.");
			}
		});
	}
});
function contactSuccess(contacts) {
    var checkedContacts = [];
    var data = userInvitess.find({
		"userId": Meteor.userId()
	},{
		sort: {
			"dateInvited": -1
		}
	}).fetch();
	var invitedArray = [];
	for(var i = 0; i < data.length; i++)
	{
		var currentdate = new Date();
		var invitedDate = data[i].dateInvited;
		var diff = (currentdate.getTime() - invitedDate.getTime()) / (1000 * 60 * 60 * 24);
		if(diff < 1)
		{
			invitedArray.push(data[i].invitedUserId);
		}
	}
	console.log("invitedArray", invitedArray);
    for(var i = 0; i < contacts.length; i++)
    {
    	if(contacts[i].phoneNumbers !== null && contacts[i].displayName !== null)
		{
			var c = {
    			"contactName": contacts[i].displayName,
    			"contactNumber": contacts[i].phoneNumbers[0].value,
    			"contactPersonalEmail": contacts[i].emails ? contacts[i].emails[0].value : "",
    			"contactImage": contacts[i].photos ? contacts[i].photos[0].value : ""
    		};
    		checkedContacts.push(c);

		}
    }
    if(JSON.stringify(contactList) !== JSON.stringify(checkedContacts))
    {
    	contactList.set(checkedContacts);
    }
    
};
function contactError(contactError) {
	console.log(contactError);
    alert('Error occured while fetching contacts. Please try after sometime');
};