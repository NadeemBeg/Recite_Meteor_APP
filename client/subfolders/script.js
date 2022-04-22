const pretty = require('prettysize');
var ta = require('time-ago')  // node.js
var listViewSubfolder = new ReactiveVar("list");
var searchTextboxSubFolder = new ReactiveVar("");
var sortSubFolders = new ReactiveVar(-1);
var sortTypeSubFolders = new ReactiveVar("");
Template.subFolders.onCreated(function() {
	Meteor.subscribe("getFilesByUserFiltered", Meteor.userId());
	Meteor.subscribe("getUserFolders", Meteor.userId(), function(){
		Session.set("foldersSubscribed", true);
	});
	Meteor.subscribe("getUserStarredFiles", Meteor.userId())
	Meteor.subscribe("getUserStarredFolders", Meteor.userId())
	Meteor.subscribe("getAllCollaborations");
	Meteor.subscribe("getFilesByFolder", Template.instance().data.folderId, function(){
		console.log("userFiles.find().fetch()",userFiles.find().fetch());
	});
	Meteor.subscribe("getFoldersByFolder", Template.instance().data.folderId, function(){
		
	});
});
Template.subFolders.onRendered(function() {
	/*if(Session.get("foldersSubscribed") == true)
	{
		console.log(getFolderPath(Template.instance().data.folderId, [], Template.instance().data.userId));
	}*/
	Session.set("folderOwner", Template.instance().data.userId);
  	Session.set("folderPath", Template.instance().data.folderId);
  	Session.set("FileSortingValue", "dateCreated")
	var a = setInterval(function(){
		if($(".gotoFileDetails").length > 0)
		{
		  $(".gotoFileDetails").on( "swipeleft", function(e){
		  	var elem = $(e.target);
		    $(".leftSide").each(function(key, val){
		      $(val).removeClass("leftSide");
		      $(val).find(".ListDeleteButtonRed").css("display","none");
		    })
		    elem.parents(".fileListItem").addClass("leftSide");
		    elem.parents(".fileListItem").find(".ListDeleteButtonRed").css("display","block");
		  });
		  $(".gotoFileDetails").on( "swiperight", function(e){var elem = $(e.target);
		    $(".leftSide").each(function(key, val){
		      $(val).removeClass("leftSide");
		      $(val).find(".ListDeleteButtonRed").css("display","none");
		    })
		  });
		  clearInterval(a);
		}
		if($(".gotoFolder").length > 0)
		{
		  $(".gotoFolder").on( "swipeleft", function(e){
		  	var elem = $(e.target);
		    $(".leftSide").each(function(key, val){
		      $(val).removeClass("leftSide");
		      $(val).find(".ListFeleteFolderButtonRed").css("display","none");
		    })
		    elem.parents(".fileListItem").addClass("leftSide");
		    elem.parents(".fileListItem").find(".ListFeleteFolderButtonRed").css("display","block");
		  });
		  $(".gotoFolder").on( "swiperight", function(e){var elem = $(e.target);
		    $(".leftSide").each(function(key, val){
		      $(val).removeClass("leftSide");
		      $(val).find(".ListFeleteFolderButtonRed").css("display","none");
		    })
		  });
		  clearInterval(a);
		}
	},100);
	listViewSubfolder.set("list");
});
Template.subFolders.helpers({
	isListView: function()
	{
		if(listViewSubfolder.get() == "list")
		{
		  return true;
		}
		else
		{
		  return false;
		}
	},
	isGridView: function()
	{
		if(listViewSubfolder.get() == "grid")
		{
		  return true;
		}
		else
		{
		  return false;
		}
	},
	getFileIcon: function(n){
		return getFileIcon(n);
	},
	getUserName: function(){
		var userData = Meteor.users.findOne({
			"_id": Template.instance().data.userId
		});
		console.log("userData - Mukesh", userData);
		var folderId = Template.instance().data.folderId;
		console.log("folderId - Mukesh", folderId);
		var folderDetails = userFolders.findOne({
			"_id": folderId
		});
		console.log("folderDetails - Mukesh", folderDetails);
		var folderUserDetails = userContacts.find({
			"_id": folderDetails.referenceId
		});
		console.log("userData - Mukesh", userData);
		if(folderUserDetails.count() > 0)
		{
			folderUserDetails = userContacts.findOne({
				"_id": folderDetails.referenceId
			});
			console.log("folderUserDpermietails", folderUserDetails);
			if(typeof folderUserDetails.profilePic !== "undefined")
			{
				var sendContact = {
					"profile": {
						"profilePic": folderUserDetails.profilePic,
						"fullName": folderUserDetails.fullName
					},
					"_id": folderUserDetails._id
				}
			}
			else
			{
				var sendContact = {
					"profile": {
						"fullName": folderUserDetails.fullName
					},
					"_id": folderUserDetails._id
				}
			}
			console.log("sendContact - Mukesh", sendContact);
			return sendContact;
		}
		else
		{
			return userData;
		}
	},
	getFolderName: function(){
		console.log("Template.instance().data", Template.instance().data);
		var currentFolderId = Template.instance().data.folderId;
		var folderDetails = userFolders.find({
			"_id": currentFolderId
		});
		if(folderDetails.count() > 0)
		{
			folderDetails = userFolders.findOne({
				"_id": currentFolderId
			});
		}
		else
		{
			folderDetails = userReportFolders.find({
				"_id": currentFolderId
			});
			if(folderDetails.count() > 0)
			{
				folderDetails = userReportFolders.findOne({
					"_id": currentFolderId
				});
			}
		}
		if(typeof folderDetails !== "undefined")
		{
			return folderDetails.folderName;
		}
	},
	getFilesAndFoldersList: function(){
		var finalCollaborators = [];
	    var fullAccessUser = [];
	    var limitedAccessUsers = [];
	    var folderIdsAccess = [];
	    var coll = [];
	    if(Meteor.user() != undefined)
	    {
	      var collaborators = getCollaborators(Meteor.user());
	      if(collaborators.length > 0)
	      {
	        for(var i = 0; i < collaborators.length; i++)
	        {
	          coll.push(collaborators[i].userId);
	          if(collaborators[i].fullAccess)
	          {
	            fullAccessUser.push(collaborators[i].userId);
	            finalCollaborators.push(collaborators[i].userId);
	          }
	          else
	          {
	            limitedAccessUsers.push(collaborators[i].userId);
	            
	            if(typeof collaborators[i].projectIds !== "undefined")
	            {
	              if(collaborators[i].projectIds.length > 0)
	              {
	                for(var j = 0; j < collaborators[i].projectIds.length; j++)
	                {
	                  folderIdsAccess.push(collaborators[i].projectIds[j]);
	                }
	              }
	            }
	          }
	        }
	      }
	      Meteor.subscribe("getCollaboratorsFolders",coll);
	    }    
			var folderId = Template.instance().data.folderId;
			var userId = Template.instance().data.userId;
			var finalData = getFullFolderStructure(userId, folderId, searchTextboxSubFolder.get(), Session.get("FileSortingValue"), sortSubFolders.get());
			return finalData;
		},
	/*getRootFiles: function(){
		var searchTextVal = searchTextboxSubFolder.get();
		var currentFolderId = Template.instance().data.folderId;
		if($(".searchTextboxSubFolder").val() == "")
		{
			var conditions = {
				"fileFolder": currentFolderId,
				"isDeleted": false
			};
		}
		else
		{
			var conditions = {
				"fileFolder": currentFolderId,
				"isDeleted": false,
				"fileName": {
					$regex: new RegExp(searchTextVal, "i")
				}
			}
		}
		var filesList = userFiles.find(conditions,{
			sort: {
				"dateCreated": -1
			}
		});
		if(filesList.count() == 0)
		{
			return false;
		}
		else
		{
			return filesList.fetch();
		}
	},*/
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
	isNotStarred:function(fileId){
		var oldData = userStarredFiles.find({
		  "userId": Template.instance().data.userId,
		  "fileId": fileId
		});
		if(oldData.count() == 0)
		{
		  return true;
		}
		else
		{
		  return false;
		}
	},
	isNotStarredFolder:function(fileId){
		var oldData = userStarredFolders.find({
		  "userId": Template.instance().data.userId,
		  "fileId": fileId
		});
		if(oldData.count() == 0)
		{
		  return true;
		}
		else
		{
		  return false;
		}
	},
	getSize: function(param)
	{
		var str = pretty(param, false, false, 0);
		return str;
	},
	getModifiedDate: function(param)
	{
		return ta.ago(param);
	},
	/*getFolderCount: function(){
		var currentFolderId = Template.instance().data.folderId;
		var folderDetails = userFolders.find({
			"parentId": currentFolderId
		});
		return folderDetails.count();
	},*/
	/*getFolderList: function(){
		console.log("hfjksdj");
		var searchTextVal = searchTextboxSubFolder.get();
		var currentFolderId = Template.instance().data.folderId;
		console.log("conditions", conditions);
		var folderDetails = userFolders.find({
				"parentId": currentFolderId
			},{
			sort: {
				"dateCreated": -1
			}
		});

		if(folderDetails.count() > 0)
		{
			if($(".searchTextboxSubFolder").val() == "")
			{
				return folderDetails.fetch();
			}
			else
			{
				var newFolderList = [];
				var folderList = folderDetails.fetch();
				for(var i = 0; i < folderList.length; i++)
				{
					var conditions = {
						"fileFolder": folderList[i]._id,
						"isDeleted": false,
						"fileName": new RegExp(searchTextVal, "i")
					};
					var conditions1 = {
						"parentId": currentFolderId,
						"folderName": new RegExp(searchTextVal, "i")
					}
					var filesList = userFiles.find(conditions,{
						sort: {
							"dateCreated": -1
						}
					});
					var folderDetails = userFolders.find(conditions1,{
						sort: {
							"dateCreated": -1
						}
					});
					if(filesList.count() > 0 || folderDetails.count())
					{
						newFolderList.push(folderList[i]);
					}
				}
			}
			return newFolderList;
		}
		else
		{
			return folderDetails.fetch();
		}
	},*/
	/*getFolderFileList: function(id)
	{
		var searchTextVal = searchTextboxSubFolder.get();
		if($(".searchTextboxSubFolder").val() == "")
		{
			var conditions = {
				"fileFolder": id,
				"isDeleted": false
			};
		}
		else
		{
			var conditions = {
				"fileFolder": id,
				"isDeleted": false,
				"fileName": new RegExp(searchTextVal, "i")
			};
		}
		var filesList = userFiles.find(conditions,{
			sort: {
				"dateCreated": -1
			}
		});
		if(filesList.count() == 0)
		{
			return false;
		}
		else
		{
			return filesList.fetch();
		}
	},*/
	hasSubFodlers: function(id){
		var searchTextVal = searchTextboxSubFolder.get();
		var currentFolderId = id;
		if($(".searchTextboxSubFolder").val() == "")
		{
			var conditions = {
				"parentId": currentFolderId
			}
		}
		else
		{
			var conditions = {
				"parentId": currentFolderId,
				"folderName": new RegExp(searchTextVal, "i")
			}
		}
		var folderDetails = userFolders.find(conditions,{
			sort: {
				"dateCreated": -1
			}
		});
		if(folderDetails.count() > 0)
		{
			return folderDetails.fetch();
		}
		else
		{
			folderDetails = userReportFolders.find(conditions,{
				sort: {
					"dateCreated": -1
				}
			});
			if(folderDetails.count() > 0)
			{
				return folderDetails.fetch();
			}
		}
	},
	getFoldersFileCount: function(id)
	{
		var count = getFolderFilesCount(id);
		if(count == 0)
		{
			return "0 Files";
		}
		else if(count == 1)
		{
			return "1 File";
		}
		else
		{
			return count + " Files";
		}
	},
	getFoldersFoldersCount: function(id)
	{
		var count = getFolderFoldersCount(id);
		if(count == 0)
		{
			return "0 Folders";;
		}
		else if(count == 1)
		{
			return "1 Folder";
		}
		else
		{
			return count + " Folders";
		}
	},
	getFolderModifiedDate: function(rec)
	{
		return "modified " + ta.ago(rec.dateModified);
	},
	/*hasFilesAndFolders: function(id)
	{
		var searchTextVal = searchTextboxSubFolder.get();
		if($(".searchTextboxSubFolder").val() == "")
		{
			var count = isFolderHasFilesOrFolders(id);
		}
		else
		{
			var count = isFolderHasFilesOrFolders(id,searchTextVal);
		}
		console.log("count id", id);
		console.log("count count", count);
		return count;
	},*/
	/*getFolderStructure: function(){
		var folderId = Template.instance().data.folderId;
		var userId = Template.instance().data.userId;
		console.log("getFolderStructure", getFullFolderStructure(userId, folderId, "", "", 0));
	},*/
	isFile: function(rec)
	{
		if(rec.resourceType == "file")
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	isEmptyFolder: function(rec)
	{
		if(typeof rec.subFiles !== "undefined"){
			if(rec.subFiles.length == 0 && rec.subFolders.length == 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		
	},
	getFileFoldersCount: function(rec)
	{
		var filesCount = getFilesList(rec._id);
		var folderCount = getFoldersList(rec._id);
		return filesCount.length + folderCount.length;
	},
	showMoreOption: function(id)
	{
		var fileId = id;
	    var userId = Meteor.userId();
	    var permission = getFilePermission(fileId, userId);
	    console.log("permission",permission);
	    if(permission == 3 || permission == 2)
	    {
	      return true;
	    }
	    else
	    {
	      return false;
	    }
	},
	showMoreOptionFolder: function(id)
	{
		var folderId = id;
	    var userId = Meteor.userId();
	    var permission = getFolderPermission(folderId, userId);
	    console.log("permission folder",permission);
	    if(permission == 3 || permission == 2)
	    {
	      return true;
	    }
	    else
	    {
	      return false;
	    }
	}
});
Template.subFolders.events({
	'click .gotocontact': function(e)
	{
		e.preventDefault();
		var id = $(e.target).attr("data-id");
		if(Meteor.user() !== null)
		{
			if(Meteor.userId() == id)
			{
				appHistoryPush("/edit-profile/" + id);
				Router.go("/edit-profile/" + id);
			}
			else
			{
				var cc = userContacts.find({"_id":id});
				if(cc.count() > 0)
				{
					appHistoryPush("/contact/edit/" + id);
					Router.go("/contact/edit/" + id);
				}
				
			}
		}
	},
	'click .belloringalarmvoicereminder':function(e){
		e.preventDefault();
		appHistoryPush("/notifications");
		Router.go("/notifications");
	},
	'click .moreIconBlack': function(e)
	{
		e.preventDefault();
		var elem = $(e.target);
    	var folderId = elem.attr("data-folderId");
    	console.log(folderId);
    	var folderDetails = userFolders.find({
	      "_id": folderId
	    });
	    if(folderDetails.count() > 0)
	    {
	    	folderDetails = userFolders.findOne({
		      "_id": folderId
		    });
	    }
	    console.log(folderDetails);
	    var folderIcon = "/img/FolderIcons.png";
	    var fileNameHTML = "";
	    var d = ta.ago(folderDetails.dateModified);
	    var filesCount = getFilesList(folderDetails._id);
		var folderCount = getFoldersList(folderDetails._id);
	    var str = "";
	    console.log(filesCount);
	    if(typeof filesCount !== "undefined")
	    {
	    	if(filesCount.length > 0)
		    {
		    	if(filesCount.length == 1)
		    		str += filesCount.length + " File ";
		    	else
		    		str += filesCount.length + " Files ";
		    }
	    }
	    if(typeof folderCount !== "undefined")
	    {
	    	if(folderCount.length > 0)
		    {
		    	if(folderCount.length == 1)
		    		str += folderCount.length + " Folder ";
		    	else
		    		str += folderCount.length + " Folders ";
		    }
	    }
	    $(".foldercontrolsoverlay.options .fileFolderName .shape.main").attr("src", folderIcon);
	    fileNameHTML += folderDetails.folderName + "<p>" + str + ", modified " + d;
	    $(".foldercontrolsoverlay.options .createOverlayUl").find(".fileFolderName").find(".fileNameInOverlay").html(fileNameHTML);
	    $(".foldercontrolsoverlay.options #downloadFileLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #deleteFileLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #exportFileLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #renameFileLi").find("a").attr("href","/file/rename/" + folderDetails._id);
	    $(".foldercontrolsoverlay.options #fileStarLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #tagFileLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #copyFolderLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #moveFolderLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #printMultipleFiles").attr("data-folderid", folderDetails._id);

	    $(".foldercontrolsoverlay.options #addToReportLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options").attr("data-id", folderDetails._id);
	    var getIsStarred = userStarredFolders.find({
	      "userId": Meteor.userId(),
	      "fileId": folderDetails._id
	    });
	    if(getIsStarred.count() == 0)
	    {
	      $(".foldercontrolsoverlay.options #fileStarLi").attr("data-status", false);
	      $(".foldercontrolsoverlay.options #fileStarLi").find("img").attr("src","/img/StarBlackIcon.png");
	      $(".foldercontrolsoverlay.options #fileStarLi").find("img").next().html("Add to Starred");
	      $(".foldercontrolsoverlay.options #fileStarLi").find("img").next().removeClass("activeClass");
	    }
	    else
	    {
	      $(".foldercontrolsoverlay.options #fileStarLi").attr("data-status", true);
	      $(".foldercontrolsoverlay.options #fileStarLi").find("img").attr("src","/img/StarBlueIcon.png");
	      $(".foldercontrolsoverlay.options #fileStarLi").find("img").next().html("Starred Folder");
	      $(".foldercontrolsoverlay.options #fileStarLi").find("img").next().addClass("activeClass");
	    }

	    if(folderDetails.showInReports)
	    {
			$(".foldercontrolsoverlay.options #addToReportLi").attr("data-status", true);
			$(".foldercontrolsoverlay.options #addToReportLi").find("img").attr("src","/img/reportIconBlue.png");
			$(".foldercontrolsoverlay.options #addToReportLi").find("img").next().html("Added in Report Folder");
			$(".foldercontrolsoverlay.options #addToReportLi").find("img").next().addClass("activeClass");
	    }
	    else
	    {
	    	$(".foldercontrolsoverlay.options #addToReportLi").attr("data-status", false);
			$(".foldercontrolsoverlay.options #addToReportLi").find("img").attr("src","/img/ReportFolderIcon.png");
			$(".foldercontrolsoverlay.options #addToReportLi").find("img").next().html("Add in Report Folder");
			$(".foldercontrolsoverlay.options #addToReportLi").find("img").next().removeClass("activeClass");
	    }
	    openMenu("foldercontrolsoverlay.options");
	},
	'click .sizeArrow': function(e){
		e.preventDefault();
		var elem = $(e.target);
		elem.parents(".folderTitle").next(".folderDivBody").slideToggle();
		setTimeout(function(){
			if(elem.parents(".folderTitle").next(".folderDivBody").attr("style") == "display: none;")
			{
				//$(e.target).css("transform", "rotate(270deg)");
				$({deg: 360}).animate({deg: 270}, {
				    duration: 200,
				    step: function(now) {
				        elem.css({
				            transform: 'rotate(' + now + 'deg)'
				        });
				    }
				});

			}
			else
			{
				//$(e.target).css("transform", "rotate(360deg)");
				$({deg: 270}).animate({deg: 360}, {
				    duration: 200,
				    step: function(now) {
				        elem.css({
				            transform: 'rotate(' + now + 'deg)'
				        });
				    }
				});
			}
		},500);
	},
	'click .listViewButton': function(e)
	{
		var elem = $(e.target);
		var currentView = elem.attr("data-view");
		if(currentView == "list")
		{
		  listViewSubfolder.set("grid");
		  elem.attr("data-view", "grid");
		}
		else
		{
		  listViewSubfolder.set("list");
		  elem.attr("data-view", "list");
		}
	},
	'keyup .searchTextboxSubFolder': function(e)
	{
		var elem = $(e.target);
		searchTextboxSubFolder.set(elem.val());
	},
	/*'error  .subFolderUserImage': function(e){
	    var elem = $(e.target);
	    elem.attr("src", "/img/UserIconNewDefault.png");
	  },*/
	"click .gotoFolder": function(e)
	{
		e.preventDefault();
		console.log("dfsdfdsf");
		var elem = $(e.target);
		var folderId = elem.attr("data-folderid");
		Session.set("folderOwner", Template.instance().data.userId);
  		Session.set("folderPath", folderId);
  		appHistoryPush("/sub-folder/"+Template.instance().data.userId+"/"+folderId);
		Router.go("/sub-folder/"+Template.instance().data.userId+"/"+folderId);
	},
	"click .masterFolderPagePath": function(){
		var folderId = Template.instance().data.folderId;
		var folderDetails = userFolders.find({
			"_id": folderId
		});
		if(folderDetails.count() > 0)
		{
			folderDetails = userFolders.findOne({
				"_id": folderId
			});
			if(typeof folderDetails.referenceId !== "undefined")
			{
				if(folderDetails.referenceId !== "" || folderDetails.referenceId !== null)
				{
					appHistoryPush("/folders/" + folderDetails.referenceId);
					Router.go("/folders/" + folderDetails.referenceId);
				}
				else
				{
					appHistoryPush("/folders/" + Template.instance().data.userId);
					Router.go("/folders/" + Template.instance().data.userId);
				}
			}
			else
			{
				appHistoryPush("/folders/" + Template.instance().data.userId);
				Router.go("/folders/" + Template.instance().data.userId);
			}
		}
	},
	"click .backbuttontopnav": function(e) {
		e.preventDefault();
		var backURL = appHistoryPull();
		if(backURL == "/reports" || backURL == "/filelistview")
		{
			Session.set("folderOwner", Meteor.userId());
	    	Session.set("folderPath", "");
			Router.go(backURL);
		}
		else
		{
			var a = getFolderPath(Template.instance().data.folderId, [], Template.instance().data.userId);
			var fullFolderPath = Session.get("fullFolderPath");
			fullFolderPath = fullFolderPath.split("_");
			var previousFolderId =  fullFolderPath[(fullFolderPath.length - 2)];
			Session.set("folderPath", previousFolderId);
			if(previousFolderId == Template.instance().data.userId)
			{
				Router.go(backURL);
				//Router.go("/folders/" + previousFolderId);
			}
			else
			{
				Router.go("/sub-folder/" + Template.instance().data.userId + "/" + previousFolderId);
			}
		}
	},
	'click .gotoFileDetails': function(e)
	{
		var target = $(e.target);
		var id = target.attr("data-id");
		appHistoryPush("/clientfile/" + id);
		Router.go("/clientfile/" + id);
	},
	'click .moreFileControls': function(e)
	{
		var elem = $(e.target);
		var fileId = elem.attr("data-fileId");
		console.log("fileId", fileId);
		var fileDetails = userFiles.find({
		  "_id": fileId
		});
		if(fileDetails.count() > 0)
		{
			fileDetails = userFiles.findOne({
			  "_id": fileId
			});
		}
		var fileIcon = getFileIcon(fileDetails.fileName);
		var fileNameHTML = "";
		var str = pretty(fileDetails.fileSize, false, false, 0);
		var d = ta.ago(fileDetails.dateCreated)
		fileNameHTML += fileDetails.fileName + "<p>" + str + ", modified " + d;
		$(".foldercontrolsoverlay.fileFilter .createOverlayUl").find(".fileFolderName").find(".fileNameInOverlay").html(fileNameHTML);
		$(".foldercontrolsoverlay.fileFilter #showFolder").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #shareFileLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #deleteFileLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #renameFileLi").find("a").attr("href","/file/rename/" + fileId);
		$(".foldercontrolsoverlay.fileFilter #deleteFileLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #fileStarLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #tagFileLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #copyToLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #moveToLi").attr("data-id", fileId);

		$(".foldercontrolsoverlay.fileFilter #addToReportLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter .fileFolderName .shape.main").attr("src", fileIcon);
		var getIsStarred = userStarredFiles.find({
		  "userId": Meteor.userId(),
		  "fileId": fileId
		});
		console.log("getIsStarred.count()", getIsStarred.count() == 0);
		if(getIsStarred.count() == 0)
		{
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").attr("data-status", false);
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").find("img").attr("src","/img/StarBlackIcon.png");
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").find("img").next().html("Add to Starred");
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").find("img").next().removeClass("activeClass");
		}
		else
		{
			console.log("in test");
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").attr("data-status", true);
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").find("img").attr("src","/img/StarBlueIcon.png");
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").find("img").next().html("Starred File");
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").find("img").next().addClass("activeClass");
		}
		if(Router.current().route._path == "/reports")
		{
			if(typeof fileDetails.fileFolder !== "undefined")
			{
				if(fileDetails.fileFolder !== "" || fileDetails.fileFolder !== null)
				{
					var folderDetails = userFolders.find({
						"_id": fileDetails.fileFolder
					});
					if(folderDetails.count() > 0)
					{
						folderDetails = userFolders.findOne({
							"_id": fileDetails.fileFolder
						});
						if(folderDetails.showInReports)
						{
							$(".foldercontrolsoverlay.fileFilter #deleteFileLi").hide();
						}
						else
						{
							$(".foldercontrolsoverlay.fileFilter #deleteFileLi").show();
						}
					}
					else
					{
						$(".foldercontrolsoverlay.fileFilter #deleteFileLi").show();
					}
				}
				else
				{
					$(".foldercontrolsoverlay.fileFilter #deleteFileLi").show();
				}
			}
			else
			{
				$(".foldercontrolsoverlay.fileFilter #deleteFileLi").show();
			}
		}
		else
		{
			$(".foldercontrolsoverlay.fileFilter #deleteFileLi").show();
		}
		openMenu("foldercontrolsoverlay.fileFilter");
	},
	'click .ListDeleteButtonRed': function(e){
		e.preventDefault();
		var fileId = $(e.target).attr("data-fileid");
		var c = confirm("Are you sure you want to delete?");
		if(c)
		{
		  Meteor.call("deleteFile", fileId, function(err, res){
		    if(err)
		    {
		      alert(err.reason);
		    }
		    else
		    {
		      alert("File was deleted successfully.");
		    }
		  });
		}
	},
	'click .ListFeleteFolderButtonRed': function(e){
		e.preventDefault();
		e.stopPropagation();
		var c = confirm("Are you sure you want to delete? \n\n All decisions are final. ");
		var fileId = $(e.target).attr("data-fileid");
			if(c)
			{
				Meteor.call("deleteFolder", fileId, function(err, res){
					if(err)
					{
						alert(err.reason);
					}
					else
					{
						alert("Folder was deleted successfully.");
					}
				});
			}
	},
	'click .filterButtonFileListing': function(e)
	{
		//$(".filteroptionslistoverlay .overlayBackground").fadeIn();
		openMenu("filteroptionslistoverlay");
	},
	'click .sortOrderButton': function(e)
	{
		var elem = $(e.target);
		var currentAction = parseInt(elem.attr("data-sort"));
		if(currentAction == -1) {
			sortSubFolders.set(1);
			elem.addClass("rotateClass");
			elem.attr("data-sort","1");
		}
		else {
			sortSubFolders.set(-1);
			elem.removeClass("rotateClass");
			elem.attr("data-sort","-1");
		}
	}
});

















function getFullFolderStructure(masterFolderId, subFolderId, searchval, sortField, sortAction)
{
	console.log("searchval",searchval);
    var rootFilesOfFolder = getFilesList(subFolderId,searchval);
    var rootFoldersOfFolder = getFoldersList(subFolderId,searchval);
    var structureArray = [];
    if(typeof rootFilesOfFolder !== "undefined")
    {
    	for(var i = 0; i < rootFilesOfFolder.length; i++)
	    {
	        rootFilesOfFolder[i]["resourceType"] = "file";
	        structureArray.push(rootFilesOfFolder[i]);
	    }
    }
    if(typeof rootFoldersOfFolder !== "undefined")
    {
    	for(var j = 0; j < rootFoldersOfFolder.length; j++)
	    {
	        var getFolderFilesList = getFilesList(rootFoldersOfFolder[j]._id);
	        console.log("getFolderFilesList", getFolderFilesList);
	        var getSubFoldersList = getFoldersList(rootFoldersOfFolder[j]._id);
	        console.log("getSubFoldersList", getSubFoldersList);
	        rootFoldersOfFolder[j]["fileName"] = rootFoldersOfFolder[j].folderName;
	        rootFoldersOfFolder[j]["subFiles"] = getFolderFilesList;
	        rootFoldersOfFolder[j]["subFolders"] = getSubFoldersList;
	        rootFoldersOfFolder[j]["fileSize"] = getFolderSize(rootFoldersOfFolder[j]._id);
	        rootFoldersOfFolder[j]["resourceType"] = "folder";
	        structureArray.push(rootFoldersOfFolder[j]);
	    }
    }
    

    if(sortField == "")
    {
        return structureArray;
    }
    else if(sortField == "fileSize")
    {
        if(sortAction == 1)
        {
            return _.sortBy(structureArray,'fileSize');
        }
        else
        {
            return _.sortBy(structureArray,'fileSize').reverse();
        }
    }
    else if(sortField == "dateModified")
    {
        if(sortAction == 1)
        {
            return _.sortBy(structureArray,'dateModified');
        }
        else
        {
            return _.sortBy(structureArray,'dateModified').reverse();
        }
    }
    else if(sortField == "dateCreated")
    {
        if(sortAction == 1)
        {
            return _.sortBy(structureArray,'dateCreated');
        }
        else
        {
            return _.sortBy(structureArray,'dateCreated').reverse();
        }
    }
    else if(sortField == "fileName")
    {
        if(sortAction == 1)
        {
            return _.sortBy(structureArray,'fileName');
        }
        else
        {
            return _.sortBy(structureArray,'fileName').reverse();
        }
    }
    else if(sortField == "fileFormat")
    {
        if(sortAction == 1)
        {
            return _.sortBy(structureArray,'resourceType');
        }
        else
        {
            return _.sortBy(structureArray,'resourceType').reverse();
        }
    }
    
}
var rotation = {
  1: 'rotate(0deg)',
  3: 'rotate(180deg)',
  6: 'rotate(90deg)',
  8: 'rotate(270deg)'
};
function _arrayBufferToBase64( buffer ) {
    var binary = ''
    var bytes = new Uint8Array( buffer )
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] )
    }
    return window.btoa( binary );
  }
function orientation(file, callback) {
  var fileReader = new FileReader();
  fileReader.onloadend = function() {
    var base64img = "data:"+file.type+";base64," + _arrayBufferToBase64(fileReader.result);
    var scanner = new DataView(fileReader.result);
    var idx = 0;
    var value = 1; // Non-rotated is the default
    if(fileReader.result.length < 2 || scanner.getUint16(idx) != 0xFFD8) {
      // Not a JPEG
      if(callback) {
        callback(base64img, value);
      }
      return;
    }
    idx += 2;
    var maxBytes = scanner.byteLength;
    while(idx < maxBytes - 2) {
      var uint16 = scanner.getUint16(idx);
      idx += 2;
      switch(uint16) {
        case 0xFFE1: // Start of EXIF
          var exifLength = scanner.getUint16(idx);
          maxBytes = exifLength - idx;
          idx += 2;
          break;
        case 0x0112: // Orientation tag
          // Read the value, its 6 bytes further out
          // See page 102 at the following URL
          // http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf
          value = scanner.getUint16(idx + 6, false);
          maxBytes = 0; // Stop scanning
          break;
      }
    }
    if(callback) {
      callback(base64img, value);
    }
  }
  fileReader.readAsArrayBuffer(file);
};
function GetProfilePic(url)
{
	var url1 = url;
    console.log("urls ", url1);
    var url = url1.replace("http://","https://"); 
    console.log("urls ", url);
  	// var fileName11 = url;

	var fileNAME= url.split('/').pop();
	// console.log("fileNAME",fileNAME);

	async function createFile(){
	 let response = await fetch(url);
	console.log("response" ,response);
	 let data = await response.blob();
	console.log("data",data);
	 let metadata = {
	   type: data.type
	 };
	// console.log(metadata);
	 file = new File([data], fileNAME, metadata);
	// console.log("file",file);
	orientation(data, function(base64img, value) {
        // $('#placeholder1').attr('src', base64img);
        // console.log("rotation[value]",rotation[value]);
        // return $('#profileImage').attr('src', base64img);
        var rotated = $('.profilePic').attr('src', base64img);
        if(value) {
          return rotated.css('transform', rotation[value]);
          // console.log("value",rotated.css('transform', rotation[value]));
        }
    });
	 // ... do something with the file or return it
	}
	createFile();
}