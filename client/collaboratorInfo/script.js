import { Promise } from 'meteor/promise';
Template.collaboratorInfoPage.onCreated(function(){
	// Meteor.subscribe("getUserInvites", Meteor.userId());
	Meteor.subscribe("getAllCollaborations", Meteor.userId());
	Meteor.subscribe("allUsers");
});
Template.collaboratorInfoPage.onRendered(function(){
	
});
Template.collaboratorInfoPage.helpers({
	getEmail: function(){
		var email = Router.current().params._id;
		var email  = userCollaborations.findOne({_id:email},{userId : Meteor.userId()});
		// console.log("email.contactEmail",email.contactEmail);
		if(email.contactEmail !== undefined){
			return email.contactEmail
		}
		else if (email.emailAddress !== undefined) {
			return email.emailAddress;	
		}
		else{
			return false;
		}		
	},
	getPermissions: function(){
		var id = Router.current().params._id;
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
	getName: function(){
		// console.log("id",id)
		var id = Router.current().params._id;
		var name  = userCollaborations.findOne({_id:id},{userId : Meteor.userId()});
		// console.log("name",name.emailAddress);
		if(name.contactId){
			Meteor.subscribe("getUserContacts",name.contactId);
			var contactName = userContacts.findOne({_id: name.contactId});
			// console.log("contactName",contactName);
			return contactName.fullName;
		}
		else{
			return false;
		}
	},
	selecteProject: function(){
		var Projects = [];
		var id = Router.current().params._id;
		var name  = userCollaborations.findOne({_id:id},{userId : Meteor.userId()});
		var totalProjects = name.projectIds;
		console.log("totalProjects",totalProjects);
		if(totalProjects.length > 0){
			for(var i = 0; i < totalProjects.length; i++){
				console.log("totalProjects",totalProjects[i]);
				Meteor.subscribe("getFolderDetails",totalProjects[i]);
				var projectName = userFolders.findOne({_id: totalProjects[i]});
				var projectInFolder = projectName.folderName;
				Projects.push(projectInFolder);
			}
			return Projects;
		}
		return "case#32"
	},
	myName:function(){
		var myName = Meteor.userId();
		var name = Meteor.users.findOne({_id: myName});
		var userName = name.profile;
        return userName.fullName;
	}
});
Template.collaboratorInfoPage.events({
	'click .backbuttontopnav': function(e){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
		// Router.go("/");
	},
	'click .editCollaboratorIcon':function(e){
		e.preventDefault();
		var a = $(e.target).attr("data-id");
		console.log("ididididi",a);
		Session.set("editCollaboratorID",a);
		var b = Router.current().params._id
		appHistoryPush("/editCollaboratorPage/"+Router.current().params._id);
		Router.go("/editCollaboratorPage/"+Router.current().params._id);
	}
});

Template.editCollaboratorPage.onCreated(function(){
	// Meteor.subscribe("getUserInvites", Meteor.userId());
	Meteor.subscribe("getAllCollaborations", Meteor.userId());
	Meteor.subscribe("allUsers");
});
Template.editCollaboratorPage.onRendered(function(){
	$(".copytocontacts.contactslistsearch").hide();
	$(".copytocontacts.projectlistsearch").hide();
});
Template.editCollaboratorPage.helpers({
	myName:function(){
		var myName = Meteor.userId();
		var name = Meteor.users.findOne({_id: myName});
		var userName = name.profile;
        return userName.fullName;
	},
	getEmail: function(){
		var email = Router.current().params._id;
		var email  = userCollaborations.findOne({_id:email},{userId : Meteor.userId()});
		// console.log("email.contactEmail",email.contactEmail);
		if(email.contactEmail !== undefined){
			return email.contactEmail
		}
		else if (email.emailAddress !== undefined) {
			return email.emailAddress;	
		}
		else{
			return false;
		}		
	},
	getPermissions: function(){
		var id = Router.current().params._id;
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
	isSelected:function(id,n){
		console.log("isSelected",id);
		// var id = Session.get("SelectedCollaboratoreID");
		console.log("id",id)
		var permissions  = userCollaborations.find({_id:id},{userId : Meteor.userId()});
		var permission = userCollaborations.findOne({_id:id},{userId : Meteor.userId()}).permission;
		console.log("permission",permission);
		if(permission !== null && permission !== undefined){
			if(permission == n)
			{
				return "selected"
			}
		}
	},
	getName: function(){
		// console.log("id",id)
		var id = Router.current().params._id;
		var name  = userCollaborations.findOne({_id:id},{userId : Meteor.userId()});
		// console.log("name",name.emailAddress);
		if(name.contactId){
			Meteor.subscribe("getUserContacts",name.contactId);
			var contactName = userContacts.findOne({_id: name.contactId});
			// console.log("contactName",contactName);
			return contactName.fullName;
		}
		else{
			return false;
		}
	},
	selecteProject: function(){
		var Projects = [];
		var arr = [];
		var id = Router.current().params._id;
		var name  = userCollaborations.findOne({_id:id},{userId : Meteor.userId()});
		var totalProjects = name.projectIds;
		console.log("totalProjects",totalProjects);
		if(totalProjects.length > 0){
			for(var i = 0; i < totalProjects.length; i++){
				console.log("totalProjects",totalProjects[i]);
				Meteor.subscribe("getFolderDetails",totalProjects[i]);
				arr.push(totalProjects[i]);
				var projectName = userFolders.findOne({_id: totalProjects[i]});
				var projectInFolder = projectName.folderName;
				Projects.push(projectInFolder);
			}
			Session.set("selectedPorjects",arr);
			return Projects;
		}
		return "case#32"
	}
});
Template.editCollaboratorPage.events({
	'click .backbuttontopnav': function(e){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
	},
	// 'click .editCollaboratorIcon':function(e){
	// 	e.preventDefault();
	// 	var a = $(e.target).attr("data-id");
	// 	console.log("ididididi",a);
	// 	Session.set("editCollaboratorID",a);
	// 	Router.go("/editCollaboratorPage");
	// },
	'click .selectedContact': function(e)
	{
		e.preventDefault();
		var val = $("#searchContact").val();
		if(val == "")
		{
			alert("Please enter contact name to search.");
		}
		else
		{
			Session.set("searchedContactVal", val);
			$(".copytocontacts.contactslistsearch").slideToggle();
		}
	},
	'click .selectedProject': function(e){
		e.preventDefault();
		var val = $("#chooseProjects").val();
		if(val == "")
		{
			alert("Please enter project name to search.");
		}
		else
		{
			Session.set("searchedProjectVal", val);
			$(".copytocontacts.projectlistsearch").slideToggle();
		}
	},
	'click .updateCollaboratoreDetails': function(e)
	{
		e.preventDefault();
		var permissionsss = '';
		var selectedProjects = Session.get("selectedPorjects");
		console.log("selectedProjects",selectedProjects);
		var permission = $("#controlAccessSelector").val();
		console.log("permission",permission);
		var id = Router.current().params._id;
		var permissionsss  = userCollaborations.findOne({_id:id},{userId : Meteor.userId()}).permission;
		// permissionsss = name.permission;
		if(selectedProjects == undefined || selectedProjects == null){
			alert("Please Select Project.")
			return;
		}
		if(permission == undefined || permission == 0 || permission == null || permission == ''){
			permissionsss = permissionsss;			
		}
		else{
			permissionsss = permission;
		}

		Meteor.call("updateCollaborator",id, selectedProjects, permission, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				alert("Collaborator was edited successfully.");
				Session.set("selectedContacts",undefined);
				Session.set("selectedPorjects",undefined);
				// $("#chooseProjects").val("");
				// $("#searchContact").val("");
			}
		});
	},
	'click .deleteBtn':function(e){
		var c = confirm("Are you sure you want to delete this collaborator?");
		if(c)
		{
			var id = Router.current().params._id;
			if(id !== undefined || id !== null){
				Meteor.call("removeCollaborator", id, function(err, res){
					if(err){
						console.log(err);
					}
					else{
						console.log(res);
						alert("Collaborator was successfully Deleted.");
						appHistoryPush("/collaboratorsPage");
						Router.go("/collaboratorsPage");
					}
				});
			}
		}
	}
});