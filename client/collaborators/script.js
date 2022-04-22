import { Promise } from 'meteor/promise';
Template.collaboratorsPage.onCreated(function(){
	// Meteor.subscribe("getUserInvites", Meteor.userId());
	Meteor.subscribe("getAllCollaborations", Meteor.userId());
});
Template.collaboratorsPage.onRendered(function(){
	
});
Template.collaboratorsPage.helpers({
	isLast:function(n){
		var contacts = userCollaborations.find({userId : Meteor.userId()}).fetch();
		var last = contacts.length;
		
		if(last > 1){
			console.log("Last in ");
			if(last-1 == n){
				return "last";
			}
			else{
				return "";
			}
		}
		
	},
	isFirst: function(n)
	{
		var contacts = userCollaborations.find({userId : Meteor.userId()}).fetch();
		var first = contacts.length;
		if(first > 1){
			console.log("isFirst in ");
			if(n == 0)
				return "first";
			else
				return "";
		}		
	},
	onlyOneCollaborator:function(n){
		var contacts = userCollaborations.find({userId : Meteor.userId()}).fetch();
		var onlyOne = contacts.length;
		console.log("onlyOne",onlyOne);
		// console.log("onlyOne",n);
		if(onlyOne == 1){
			return "onlyOne";
		}
		else{
			return "";
		}
	},
	getCollaborators:function(){
		var contacts = userCollaborations.find({userId : Meteor.userId()}).fetch();
		console.log("contacts",contacts);
		if(contacts.length > 0){
			return contacts;
		}
		else{
			return false;	
		}		
	},
	getName: function(id){
		// console.log("id",id)
		var name  = userCollaborations.findOne({_id:id},{userId : Meteor.userId()});
		// console.log("name",name.emailAddress);
		if(name.contactId){
			Meteor.subscribe("getUserContacts",name.contactId);
			var contactName = userContacts.findOne({_id: name.contactId});
			// console.log("contactName",contactName);
			return contactName.fullName;
		}
		else if(name.emailAddress){
			// Meteor.subscribe("getUserContactsWithMail",name.emailAddress);
			// var contactName = userContacts.findOne({personalEmail: name.emailAddress});
			// console.log("contactName",contactName);
			return name.emailAddress;
			// return "aaa";
		}
		else{
			return "!!!!"
		}
	},
	// getPermissions: function(id){
	// 	var permissions  = userCollaborations.findOne({_id:id},{userId : Meteor.userId()});
	// 	permissions = permissions.permission;
	// 	if(permissions == "1"){
	// 		return "View & Comment";
	// 	}
	// 	else if(permissions == "2"){
	// 		return "System Administrator";
	// 	}
	// 	else if(permissions == "3"){
	// 		return "Project Administrator";
	// 	}
	// 	else{
	// 		return "Full Access";
	// 	}
	// }
	getPermissions: function(id){
		var permissions  = userCollaborations.find({_id:id},{userId : Meteor.userId()});
		if(permissions.count() > 0)
		{
			permissions  = userCollaborations.findOne({_id:id},{userId : Meteor.userId()});
			if(typeof permissions.fullAccess !== "undefined")
			{
				if(permissions.fullAccess)
				{
					return "Full Access";
				}
			}

			if(typeof permissions.permission !== "undefined")
			{
				if(permissions.permission == "1")
				{
					return "View";
				}
				else if(permissions.permission == "2")
				{
					return "Edit, Upload & Download";
				}
				else if(permissions.permission == "3")
				{
					return "Project Administrator";
				}
			}
		}
	},
});
Template.collaboratorsPage.events({
	'click .backbuttontopnav': function(e){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
	},
	'click .goCollaboratorsInfo': function(e){
		e.preventDefault();
		var a = $(e.target).attr("data-id");
		Session.set("SelectedCollaboratoreID",a);
		appHistoryPush("/collaboratorInfoPage/"+a);
		Router.go("/collaboratorInfoPage/"+a);
	},
	'click .collaboratorsPageAddUserIcon':function(e){
		appHistoryPush("/addCollaboratorpage");
		Router.go("/addCollaboratorpage");
	}
});


