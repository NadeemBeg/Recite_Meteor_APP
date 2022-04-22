const pretty = require('prettysize');
var ta = require('time-ago')  // node.js
var searchTextHome = new ReactiveVar("");
var ListHome = new ReactiveVar([]);
Template.homeTab.onCreated(function(){
	Meteor.subscribe("sharedFiles", Meteor.userId());
	Meteor.subscribe("allUsers");
	Meteor.subscribe("getUserContacts", Meteor.userId());

	Meteor.subscribe("getSharedFilesToUser");
	Meteor.subscribe("getSharedFilesUsersToUser");
	Meteor.subscribe("getSharedFilesListToUser");
});

Template.homeTab.onRendered(function(){
	appHistoryPush("/home");
	$(".copytocontacts.selectForCopyFiles").hide();
	$(".nameSorter img").css("transform","rotate(180deg)");
	// setTimeout(function(){
	// 	new SwipeOut(document.getElementById("list"));
	// },2000);
	var a = setInterval(function(){
		if($(".gotoFileDetails").length > 0)
		{
		  $(".gotoFileDetails").on( "swipeleft", function(e){
		  	var elem = $(e.target);
		  	console.log("elem",elem);
		    $(".leftSide").each(function(key, val){
		    	console.log("val",val);
		      $(val).removeClass("leftSide");
		      $(val).find(".ListDeleteButtonRedHome").css("display","none");
		    })
		    elem.parents(".homeRowItem").addClass("leftSide");
		    elem.parents(".homeRowItem").find(".ListDeleteButtonRedHome").css("display","block");
		  });
		  $(".gotoFileDetails").on( "swiperight", function(e){var elem = $(e.target);
		    $(".leftSide").each(function(key, val){
		      $(val).removeClass("leftSide");
		      $(val).find(".ListDeleteButtonRedHome").css("display","none");
		    })
		  });
		  clearInterval(a);
		}
	},100);
	// $(".transitions-container").css("height","auto");
	// ListHome.set([]);
	ListHome.set(1);
});
Template.homeTab.helpers({
	getUserIcon: function(n)
	{
		if((n%4) == 0)
		{
			return "/img/Icon1.png";
		}
		else if((n%3) == 0)
		{
			return "/img/Icon2.png";
		}
		else if((n%2) == 0)
		{
			return "/img/Icon3.png";
		}
		else
		{
			return "/img/Icon4.png";
		}
	},
	getUserName: function(n)
	{
		var splitted = n.split(" ");
		var t = splitted[0];
		if(splitted.length > 1)
		{
			t += " " + splitted[1][0].toUpperCase();
		}
		return t;
	},
	isDevice: function()
	{
		return Meteor.isCordova;
	},
	myId: function(){
		return Meteor.userId();
	},
	me: function(){
		var userME = Meteor.users.findOne({_id:Meteor.userId()});
		console.log("userME",userME);
		var myName = userME.profile;
		console.log("myName", myName.fullName);
		var splitted = myName.fullName.split(" ");
		var t = splitted[0];
		if(splitted.length > 1)
		{
			t += " " + splitted[1][0].toUpperCase();
		}
		return t;
		//return myName.fullName;
		// return users.findOne({_id: Meteor.userId()}),
	},
	getContacts: function()
	{
		var searchText = searchTextHome.get();
		var sorter = ListHome.get();
		console.log("searchText",userContacts.find({
			"userId": Meteor.userId(),
			"fullName": {
				$regex: new RegExp(searchText, "i")
			}
		},{
			sort:{
				"fullName": sorter
			}
		}).fetch());
		return userContacts.find({
			"userId": Meteor.userId(),
			"fullName": {
				$regex: new RegExp(searchText, "i")
			}
		},{
			sort:{
				"fullName": sorter
			}
		}).fetch();
	},
	getContactsTag: function(res)
	{
		if(typeof res.contactTags !== "undefined")
		{
			if(res.contactTags.length > 0)
			{
				var a = res.contactTags[0];
				a = a.split("_");
				var html = '<div class="tagElem gotoFileDetails"  data-id="'+res._id+'" style="background:#'+a[1]+';">';
				
				
				html += a[0];
				html += '</div>';
				return html;
			}
			else
			{
				return "<div style='padding-top: 10px !important'>-</div>";
			}
		}
		else
		{
			return "<div style='padding-top: 10px !important'>-</div>";
		}
	},
	getLastMessage: function(res)
	{
		if(typeof res.workEmail !== "undefined")
		{
			if(res.workEmail !== "")
			{
				var emailAddress = res.workEmail;
			}
		}
		else if(typeof res.personalEmail !== "undefined")
		{
			if(res.personalEmail !== "")
			{
				var emailAddress = res.personalEmail;
			}
		}
		var userDetails = Meteor.users.find({
			"username": emailAddress
		});
		if(userDetails.count() == 0)
		{
			return "-";
		}
		else
		{
			userDetails = Meteor.users.findOne({
				"username": emailAddress
			});
			var sharedList = sharedFilesDetails.find({
				"userId": userDetails._id
			}).fetch();
			console.log("Shared List by " + userDetails.username + ": " , sharedList);
		}
	},
	// {
	// 	var searchText = searchTextHome.get();
	// 	if(searchText !== "")
	// 	{
	// 		var sharedFilesUser = sharedFilesUsersDetails.find({}).fetch();
	// 		var fileId = [];
	// 		for(var i = 0; i < sharedFilesUser.length; i++)
	// 		{
	// 			fileId.push(sharedFilesUser[i].sharedFileId);
	// 		}
	// 		var getFiles = sharedFilesDetails.find({
	// 			"_id": {
	// 				$in: fileId
	// 			}
	// 		}).fetch();
	// 		var finalArr = [];
	// 		for(var i = 0; i < getFiles.length; i++)
	// 		{
	// 			var userId = getFiles[i].userId;
	// 			var userDetails = Meteor.users.findOne({
	// 				"_id":userId
	// 			});
	// 			console.log(userDetails.profile.fullName);
	// 			console.log(userDetails.profile.fullName.indexOf(searchText));
	// 			if(userDetails.profile.fullName.toLowerCase().indexOf(searchText.toLowerCase()) >= 0)
	// 			{
	// 				finalArr.push(getFiles[i])
	// 			}
	// 		}
	// 		if(JSON.stringify(finalArr) !== JSON.stringify(ListHome.get()))
	// 		{
	// 			ListHome.set(finalArr)
	// 			finalArr = [];
	// 		}
	// 	}
	// 	else
	// 	{
	// 		var sharedFilesUser = sharedFilesUsersDetails.find({}).fetch();
	// 		var fileId = [];
	// 		for(var i = 0; i < sharedFilesUser.length; i++)
	// 		{
	// 			fileId.push(sharedFilesUser[i].sharedFileId);
	// 		}
	// 		var getFiles = sharedFilesDetails.find({
	// 			"_id": {
	// 				$in: fileId
	// 			}
	// 		}).fetch();
	// 		if(JSON.stringify(getFiles) !== JSON.stringify(ListHome.get()))
	// 		{
	// 			ListHome.set(getFiles)
	// 		}
	// 	}
	// 	return ListHome.get();
	// },
	getUserDetails: function(id)
	{
		var a =  Meteor.users.findOne({
			"_id":id
		});
		return a.profile.fullName; 
	},
	getDate: function(d)
	{
		return ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2);
	}
});
Template.homeTab.events({
	'click .nameSorter': function(e)
	{
		e.preventDefault();
		var currentSort = ListHome.get();
		if(currentSort == 1)
		{
			ListHome.set(-1);
			$(".nameSorter img").css("transform","rotate(360deg)");
		}
		else
		{
			ListHome.set(1);
			$(".nameSorter img").css("transform","rotate(180deg)");
		}
	},
	'click .ListDeleteButtonRedHome': function(e){
		var contactId = $(e.target).attr("data-fileId");
		var confirmation = confirm("Are you sure you want to delete this contact?\n\nAll the files and folders related to this contact will not be accessible after deleting this contact.");
		if(confirmation)
		{
			Meteor.call("DeleteContact", contactId, function(err, res){
				if(err)
				{
					alert(err.reason);
				}
				else
				{
					alert("Contact was deleted successfully.");
				}
			});
		}
	},
	'click .goNotification':function(e){
	    e.preventDefault();
	    appHistoryPush("/notifications");
	    Router.go("/notifications");
  	},
	"keyup #homeSearchBox": function(e)
	{
		e.preventDefault();
		var val = $(e.target).val();
		searchTextHome.set(val);
	},
	"click .addContactButton": function(e)
	{
		appHistoryPush("/invite-contact");
		Router.go("/invite-contact");
	},
	"click .AddSingleContactButton": function(e)
	{
		appHistoryPush("/contact/new");
		Router.go("/contact/new");
	},
	'click .selectUserDetails': function(e)
	{
		var elem = $(e.target);
		var contactId = elem.attr("data-selectUser");
		Session.set("selectedUserId",contactId);
		var contactDetails = userContacts.findOne({
			"userId": Meteor.userId(),
			"_id": contactId
		});
		appHistoryPush("/folders/" + contactDetails._id);
		Router.go("/folders/" + contactDetails._id);
	},
	'click .personDetails': function(e)
	{
		var elem = $(e.target);
		var contactId = elem.attr("data-selectUser");
		if(contactId == undefined){
			return;
		}
		Session.set("folderOwner", Meteor.userId());
    	Session.set("folderPath", "");
    	Session.set("previousURLApp","/home");
		// var contactDetails = userContacts.findOne({
		// 	"userId": Meteor.userId(),
		// 	"_id": contactId
		// });
		appHistoryPush("/folders/" + contactId);
		Router.go("/folders/" + contactId);
	},

});