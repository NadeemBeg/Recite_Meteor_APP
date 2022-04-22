Template.contactslist.onCreated(function(){
	Meteor.subscribe("getUserContacts", Meteor.userId());
});
Template.contactslist.onRendered(function(){
});
Template.contactslist.helpers({
	getContactsList: function(){
		
		return userContacts.find({
				"userId": Meteor.userId()
			}).fetch();
	}
});
Template.contactslist.events({
	'click .contactItem': function(e)
	{
		var elem = $(e.target);
		var contactId = elem.attr("data-contactId");
		var contactDetails = userContacts.findOne({
			"userId": Meteor.userId(),
			"_id": contactId
		});
		appHistoryPush("/folders/" + contactDetails._id);
		Router.go("/folders/" + contactDetails._id);
	}
});


Template.contactslistsearch.onCreated(function(){
	Meteor.subscribe("getUserContacts", Meteor.userId());
});
Template.contactslistsearch.onRendered(function(){
});
Template.contactslistsearch.helpers({
	getContactsList: function(){
		if(Session.get('searchedContactVal') == undefined || Session.get('searchedContactVal') == null){
			return userContacts.find({
				"userId": Meteor.userId()
			}).fetch();
		}
		else{
			return userContacts.find({
				"userId": Meteor.userId(),
				"fullName": {
					$regex: new RegExp(Session.get('searchedContactVal'), "i")
				}
			}).fetch();
		}		
	},
	isSelected: function(n)
	{
		var selectedContacts = Session.get("selectedContacts");
		if(typeof selectedContacts !== "undefined")
		{
			if(selectedContacts.indexOf(n) > -1)
			{
				return "checked";
			}
		}
	}
});
Template.contactslistsearch.events({
	'click .contactItem': function(e)
	{	
		var arr = [];
		if (Session.get("selectedContacts") == undefined){

		}
		else{
			arr = Session.get("selectedContacts");
		}		
		// console.log("getIDSession",getIDSession);
		var elem = $(e.target);
		var contactId = elem.attr("data-id");
		var contactDetails = userContacts.findOne({
			"userId": Meteor.userId(),
			"_id": contactId
		});
		if(elem.find("input[type='checkbox']").is(":checked"))
		{
			elem.find("input[type='checkbox']").prop("checked", false);
		}
		else
		{
			elem.find("input[type='checkbox']").prop("checked", true);
		}
		var selected = $(".contactsSelectedInput");
		// var arr = [];
		if(selected.length > 0)
		{
			selected.each(function(key, val){
				if($(val).is(":checked"))
				{
					var id = $(val).attr("data-id");
					var match = arr.indexOf(id);
					if(match >= 0){
						arr.splice(id,1);
					}
					else{
						arr.push(id);
					}					
				}
			});
		}
		Session.set("selectedContacts",arr);
	},
	'click #cancelButton': function(e)
	{
		e.preventDefault();
		appHistoryPush("/addCollaboratorpage");
		Router.go("/addCollaboratorpage");
	},
	'click #doneButton': function(e)
	{
		e.preventDefault();
		$(".copytocontacts.contactslistsearch").slideToggle();
	}
});



Template.projectslistsearch.onCreated(function(){
	Meteor.subscribe("getUserFolders", Meteor.userId());
});
Template.projectslistsearch.onRendered(function(){
});
Template.projectslistsearch.helpers({
	getProjectsList: function(){
		var path = Router.current().route._path;
		console.log("path",path);
		if(path == "/editCollaboratorPage/:_id"){
			return userFolders.find({
				"userId": Meteor.userId(),
				"isDeleted": false,
		          $or: [
		            {
		              "parentId":{
		                    $exists: false
		                }
		              },
		              {
		                "parentId": ""
		              }
		          ]
			}).fetch();
		}
		else if(Session.get('searchedProjectVal') == undefined || Session.get('searchedProjectVal') == null){
			return userFolders.find({
				"userId": Meteor.userId(),
				"isDeleted": false,
		          $or: [
		            {
		              "parentId":{
		                    $exists: false
		                }
		              },
		              {
		                "parentId": ""
		              }
		          ]
			}).fetch();
		}
		else{
			return userFolders.find({
				"userId": Meteor.userId(),
				"folderName": {
					$regex: new RegExp(Session.get('searchedProjectVal'), "i")
				},
				"isDeleted": false,
		          $or: [
		            {
		              "parentId":{
		                    $exists: false
		                }
		              },
		              {
		                "parentId": ""
		              }
		          ]
			}).fetch();
		}
		
	},
	isSelected: function(n)
	{
		var selectedContacts = Session.get("selectedPorjects");
		if(typeof selectedContacts !== "undefined")
		{
			if(selectedContacts.indexOf(n) > -1)
			{
				return "checked";
			}
		}
	}
});
Template.projectslistsearch.events({
	'click .contactItem': function(e)
	{
		var arr = [];
		if (Session.get("selectedPorjects") == undefined){

		}
		else{
			arr = Session.get("selectedPorjects");
		}
		var elem = $(e.target);
		var contactId = elem.attr("data-contactid");
		console.log("contactId",contactId);
		var contactDetails = userFolders.findOne({
			"userId": Meteor.userId(),
			"_id": contactId
		});
		if(elem.find("input[type='ra']").is(":checked"))
		{
			elem.find("input[type='checkbox']").prop("checked", false);
		}
		else
		{
			elem.find("input[type='checkbox']").prop("checked", true);
		}
		var selected = $(".projectsSelectedInput");
		// var arr = [];
		if(selected.length > 0)
		{
			selected.each(function(key, val){
				if($(val).is(":checked"))
				{
					var id = $(val).attr("data-id");
					var match = arr.indexOf(id);
					if(match >= 0){
						arr.splice(id,1);
					}
					else{
						arr.push(id);
					}					
				}
			});		
		}
		console.log(arr);
		Session.set("selectedPorjects",arr);
	},
	'click #cancelButton': function(e)
	{
		e.preventDefault();
		appHistoryPush("/addCollaboratorpage");
		Router.go("/addCollaboratorpage");
	},
	'click #doneButton': function(e)
	{
		e.preventDefault();
		$(".copytocontacts.projectlistsearch").slideToggle();
	}
});

Template.selectForCopyFiles.onCreated(function(){
	$(".copytocontacts.filesForCopy").hide();
	Meteor.subscribe("getFilesByUser", Meteor.userId());
  	Meteor.subscribe("getUserStarredFiles", Meteor.userId())
});
Template.selectForCopyFiles.events({
	'click #doneButton': function(e)
	{
		e.preventDefault();
		console.log("calll");
		$(".copytocontacts.filesForCopy").hide();
	}
});

Template.selectForCopyFiles.helpers({
	getFiles: function()
	{
		var filesList = userFiles.find({"userId": Meteor.userId(),"isDeleted": false}).fetch();
        console.log("filesList",filesList);
        return filesList;
	},
	getFileName: function(fileName){
	    var explodedFileName = fileName.substr(0,fileName.lastIndexOf("."));
	    var explodedFileExtension = fileName.substr(fileName.lastIndexOf("."));
	    var newFileName = "";
	    if(fileName.length > 15)
	    {
	      newFileName += explodedFileName.substr(0,15) + "...." + explodedFileExtension;
	    }
	    else
	    {
	      newFileName = fileName;
	    }
	    return newFileName
	},
});