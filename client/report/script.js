const pretty = require('prettysize');
var ta = require('time-ago')  // node.js
var listViewReportfolder = new ReactiveVar("list");
var searchTextboxReportFolder = new ReactiveVar("");
var sortReportFolders = new ReactiveVar(-1);
var sortTypeReportFolders = new ReactiveVar("");
Template.reportsTab.onCreated(function() {
	//Meteor.subscribe("getReportFilesByUser", Meteor.userId());
	Meteor.subscribe("getFilesByUserFiltered", Meteor.userId());
	Meteor.subscribe("getUserFolders", Meteor.userId(), function(){
		Session.set("foldersReportSubscribed", true);
	});
	Meteor.subscribe("getUserStarredFiles", Meteor.userId())
	Meteor.subscribe("getUserStarredFolders", Meteor.userId());
	Meteor.subscribe("getAllCollaborations");
});
Template.reportsTab.onRendered(function() {
	searchTextboxReportFolder.set("");
	appHistoryPush("/reports");
	/*if(Session.get("foldersSubscribed") == true)
	{
		console.log(getFolderPath(Template.instance().data.folderId, [], Meteor.userId()));
	}*/
	//Session.set("folderOwner", Meteor.userId());
  	//Session.set("folderPath", Template.instance().data.folderId);
  	Session.set("folderOwner", Meteor.userId());
  	Session.set("folderPath", "Reports");
  	Session.set("FileSortingValue", "dateCreated")
	var a = setInterval(function(){
		if($(".gotoFileDetails").length > 0)
		{
		  $(".gotoFileDetails").on( "swipeleft", function(e){
		  	var elem = $(e.target);
		  	console.log("elem",elem);
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
	listViewReportfolder.set("list");
});
Template.reportsTab.helpers({
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
	},
	isListView: function()
	{
		if(listViewReportfolder.get() == "list")
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
		if(listViewReportfolder.get() == "grid")
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
			"_id": Meteor.userId()
		});
		return userData;
	},
	getFolderName: function(){
		var currentFolderId = "Report Folder";
		var folderDetails = userFolders.findOne({
			"_id": currentFolderId
		});
		if(typeof folderDetails !== "undefined")
		{
			return folderDetails.folderName;
		}
	},
	getFilesAndFoldersList: function(){
		var folderId = "Report Folder";
		var userId = Meteor.userId();
		var finalData = getFullFolderStructure(searchTextboxReportFolder.get(), Session.get("FileSortingValue"), sortReportFolders.get());
		console.log("finalData",finalData);
		return finalData;
	},
	getRootFiles: function(){
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
	isNotStarred:function(fileId){
		var reportFileEntry = userFiles.findOne({
			"userId": Meteor.userId(),
			"isDeleted": false,
			"_id": fileId
		});
		var oldData = userStarredFiles.find({
		  "userId": Meteor.userId(),
		  $or:[
		  	{
		  		"fileId": fileId
		  	},
		  	{
		  		"fileId": reportFileEntry.fileTableId
		  	}
		  ]
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
		  "userId": Meteor.userId(),
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
	getFolderCount: function(){
		var currentFolderId = Template.instance().data.folderId;
		var folderDetails = userFolders.find({
			"parentId": currentFolderId
		});
		return folderDetails.count();
	},
	getFolderList: function(){
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
	},
	getFolderFileList: function(id)
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
	},
	hasSubFodlers: function(id){
		var searchTextVal = searchTextboxReportFolder.get();
		var currentFolderId = id;
		if($(".searchTextboxSubFolder").val() == "")
		{
			var conditions = {
				"parentId": currentFolderId,
				"isDeleted": false
			}
		}
		else
		{
			var conditions = {
				"parentId": currentFolderId,
				"folderName": new RegExp(searchTextVal, "i"),
				"isDeleted": false
			}
		}
		var folderDetails = userFolders.find(conditions,{
			sort: {
				"dateCreated": -1
			}
		});
		return folderDetails.fetch();
	},
	getFoldersFileCount: function(id)
	{
		var count = getReportFolderFilesCount(id);
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
		var count = getReportFolderFoldersCount(id);
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
	hasFilesAndFolders: function(id)
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
	},
	getFolderStructure: function(){
		var folderId = Template.instance().data.folderId;
		var userId = Meteor.userId();
		console.log("getFolderStructure", getFullFolderStructure("", "", 0));
	},
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
		if(rec.subFiles.length == 0 && rec.subFolders.length == 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	getFileFoldersCount: function(rec)
	{
		var filesCount = getFilesList(rec._id);
		var folderCount = getFoldersList(rec._id);
		return filesCount.length + folderCount.length;
	}
});
Template.reportsTab.events({
	'click .editReportFolder': function(){
		Router.go("/reports-select");
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
    	var folderDetails = userFolders.findOne({
	      "_id": folderId
	    });
	    console.log(folderDetails);
	    var folderIcon = "/img/FolderIcons.png";
	    var fileNameHTML = "";
	    var d = ta.ago(folderDetails.dateModified);
	    var filesCount = getFilesList(folderDetails._id);
		var folderCount = getFoldersList(folderDetails._id);
	    var str = "";
	    if(filesCount.length > 0)
	    {
	    	if(filesCount.length == 1)
	    		str += filesCount.length + " File ";
	    	else
	    		str += filesCount.length + " Files ";
	    }
	    if(folderCount.length > 0)
	    {
	    	if(folderCount.length == 1)
	    		str += folderCount.length + " Folder ";
	    	else
	    		str += folderCount.length + " Folders ";
	    }
	    $(".foldercontrolsoverlay.options .fileFolderName .shape.main").attr("src", folderIcon);
	    fileNameHTML += folderDetails.folderName + "<p>" + str + ", modified " + d;
	    $(".foldercontrolsoverlay.options .createOverlayUl").find(".fileFolderName").find(".fileNameInOverlay").html(fileNameHTML);
	    $(".foldercontrolsoverlay.options #deleteFileLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #renameFileLi").find("a").attr("href","/file/rename/" + folderDetails._id);
	    $(".foldercontrolsoverlay.options #deleteFileLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #fileStarLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #tagFileLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #copyFolderLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #downloadFileLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #downloadFileLi").attr("data-folderid", folderDetails._id);
	    $(".foldercontrolsoverlay.options #moveFolderLi").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options #addToReportLi").attr("data-id", folderDetails._id);
	    // $(".foldercontrolsoverlay.fileFilter #showFolder").attr("data-id", folderDetails._id);
	    $(".foldercontrolsoverlay.options").attr("data-id", folderDetails._id);
	    var getIsStarred = userStarredFolders.find({
	      "userId": Meteor.userId(),
	      "fileId": folderDetails._id
	    });
	    if(getIsStarred.count() == 0)
	    {
	      $(".foldercontrolsoverlay.options #fileStarLi").attr("data-status", false);
	      $(".foldercontrolsoverlay.options #fileStarLi").attr("src","/img/StarBlackIcon.png");
	      $(".foldercontrolsoverlay.options #fileStarLi").next().html("Add to Starred");
	      $(".foldercontrolsoverlay.options #fileStarLi").next().removeClass("activeClass");
	    }
	    else
	    {
	      $(".foldercontrolsoverlay.options #fileStarLi").attr("data-status", true);
	      $(".foldercontrolsoverlay.options #fileStarLi").attr("src","/img/StarBlueIcon.png");
	      $(".foldercontrolsoverlay.options #fileStarLi").next().html("Starred Folder");
	      $(".foldercontrolsoverlay.options #fileStarLi").next().addClass("activeClass");
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
		  listViewReportfolder.set("grid");
		  elem.attr("data-view", "grid");
		}
		else
		{
		  listViewReportfolder.set("list");
		  elem.attr("data-view", "list");
		}
	},
	'keyup .searchTextboxSubFolder': function(e)
	{
		var elem = $(e.target);
		searchTextboxReportFolder.set(elem.val());
	},
	"click .gotoFolder": function(e)
	{
		e.preventDefault();
		console.log("dfsdfdsf");
		var elem = $(e.target);
		var folderId = elem.attr("data-folderid");
		Session.set("folderOwner", Meteor.userId());
  		Session.set("folderPath", folderId);
  		//Session.set("previousURLApp","/reports");
  		appHistoryPush("/sub-folder/"+Meteor.userId()+"/"+folderId);
		Router.go("/sub-folder/"+Meteor.userId()+"/"+folderId);
	},
	"click .masterFolderPagePath": function(){
		appHistoryPush("/folders/" + Meteor.userId());
		Router.go("/folders/" + Meteor.userId());
	},
	"click .backbuttontopnav": function(e) {
		e.preventDefault();
		var a = getFolderPath(Template.instance().data.folderId, [], Meteor.userId());
		var fullFolderPath = Session.get("fullFolderPath");
		fullFolderPath = fullFolderPath.split("_");
		var previousFolderId =  fullFolderPath[(fullFolderPath.length - 2)];
		Session.set("folderPath", previousFolderId);
		if(previousFolderId == Meteor.userId())
		{
			Router.go("/folders/" + previousFolderId);
		}
		else
		{
			Router.go("/sub-folder/" + Meteor.userId() + "/" + previousFolderId);
		}
	},
	'click .gotoFileDetails': function(e)
	{
		var target = $(e.target);
		var id = target.attr("data-id");
		appHistoryPush("/clientfile/" + id);
		Session.set("folderOwner", Meteor.userId());
	    Session.set("folderPath", "");
	    //Session.set("previousURLApp","/reports");
	    appHistoryPush("/clientfile/" + id);
		Router.go("/clientfile/" + id);
	},
	'click .moreFileControls': function(e)
	{
		var elem = $(e.target);
		var fileId = elem.attr("data-fileId");
		console.log("fileId", fileId);
		var fileDetails = userFiles.findOne({
		  "_id": fileId
		});
		var fileIcon = getFileIcon(fileDetails.fileName);
		var fileNameHTML = "";
		var str = pretty(fileDetails.fileSize, false, false, 0);
		var d = ta.ago(fileDetails.dateCreated)
		fileNameHTML += fileDetails.fileName + "<p>" + str + ", modified " + d;
		$(".foldercontrolsoverlay.fileFilter .createOverlayUl").find(".fileFolderName").find(".fileNameInOverlay").html(fileNameHTML);
		$(".foldercontrolsoverlay.fileFilter #shareFileLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #deleteFileLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #renameFileLi").find("a").attr("href","/file/rename/" + fileId);
		$(".foldercontrolsoverlay.fileFilter #deleteFileLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #fileStarLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #tagFileLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #printLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #copyToLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #moveToLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #addToReportLi").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter #showFolder").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter").attr("data-id", fileId);
		$(".foldercontrolsoverlay.fileFilter .fileFolderName .shape.main").attr("src", fileIcon);
		var getIsStarred = userStarredFiles.find({
		  "userId": Meteor.userId(),
		  $or:[
		  	{
				"fileId": fileId
		  	},
		  	{
		  		"fileId": fileDetails.fileTableId
		  	}
		  ]
		  
		});
		if(getIsStarred.count() == 0)
		{
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").attr("data-status", false);
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").find("img").attr("src","/img/StarBlackIcon.png");
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").find("img").next().html("Add to Starred");
		  $(".foldercontrolsoverlay.fileFilter #fileStarLi").find("img").next().removeClass("activeClass");
		}
		else
		{
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
		var fileId = $(e.target).attr("data-fileId");
		console.log("fileId",fileId);
			if(c)
			{
				Meteor.call("deleteReportFolder", fileId, function(err, res){
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
			sortReportFolders.set(1);
			elem.addClass("rotateClass");
			elem.attr("data-sort","1");
		}
		else {
			sortReportFolders.set(-1);
			elem.removeClass("rotateClass");
			elem.attr("data-sort","-1");
		}
	}
});





var listViewReportfolder = new ReactiveVar("list");
var searchTextboxReportFolder = new ReactiveVar("");
var sortReportFolders = new ReactiveVar(-1);
var sortTypeReportFolders = new ReactiveVar("");
var selectedFiles = new ReactiveVar([]);
Template.reportsTabSelect.onCreated(function() {
	//Meteor.subscribe("getReportFilesByUser", Meteor.userId());
	Meteor.subscribe("getFilesByUserFiltered", Meteor.userId());
	Meteor.subscribe("getUserFolders", Meteor.userId(), function(){
		Session.set("foldersReportSubscribed", true);
	});
	Meteor.subscribe("getUserStarredFiles", Meteor.userId())
	Meteor.subscribe("getUserStarredFolders", Meteor.userId());
	Meteor.subscribe("getAllCollaborations");
});
Template.reportsTabSelect.onRendered(function() {
	appHistoryPush("/reports");
	/*if(Session.get("foldersSubscribed") == true)
	{
		console.log(getFolderPath(Template.instance().data.folderId, [], Meteor.userId()));
	}*/
	//Session.set("folderOwner", Meteor.userId());
  	//Session.set("folderPath", Template.instance().data.folderId);
  	Session.set("folderOwner", Meteor.userId());
  	Session.set("folderPath", "Reports");
  	Session.set("FileSortingValue", "dateCreated")
	
	listViewReportfolder.set("list");
	selectedFiles.set([]);
});
Template.reportsTabSelect.helpers({
	isListView: function()
	{
		if(listViewReportfolder.get() == "list")
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
		if(listViewReportfolder.get() == "grid")
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
			"_id": Meteor.userId()
		});
		return userData;
	},
	getFolderName: function(){
		var currentFolderId = "Report Folder";
		var folderDetails = userFolders.findOne({
			"_id": currentFolderId
		});
		if(typeof folderDetails !== "undefined")
		{
			return folderDetails.folderName;
		}
	},
	getFilesAndFoldersList: function(){
		var folderId = "Report Folder";
		var userId = Meteor.userId();
		var finalData = getFullFolderStructure(searchTextboxReportFolder.get(), Session.get("FileSortingValue"), sortReportFolders.get());
		console.log("finalData", finalData);
		return finalData;
	},
	getRootFiles: function(){
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
	isNotStarred:function(fileId){
		var reportFileEntry = userFiles.findOne({
			"userId": Meteor.userId(),
			"isDeleted": false,
			"_id": fileId
		});
		var oldData = userStarredFiles.find({
		  "userId": Meteor.userId(),
		  $or:[
		  	{
		  		"fileId": fileId
		  	},
		  	{
		  		"fileId": reportFileEntry.fileTableId
		  	}
		  ]
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
		  "userId": Meteor.userId(),
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
	getFolderCount: function(){
		var currentFolderId = Template.instance().data.folderId;
		var folderDetails = userFolders.find({
			"parentId": currentFolderId
		});
		return folderDetails.count();
	},
	getFolderList: function(){
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
	},
	getFolderFileList: function(id)
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
	},
	hasSubFodlers: function(id){
		var searchTextVal = searchTextboxReportFolder.get();
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
		return folderDetails.fetch();
	},
	getFoldersFileCount: function(id)
	{
		var count = getReportFolderFilesCount(id);
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
		var count = getReportFolderFoldersCount(id);
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
	hasFilesAndFolders: function(id)
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
	},
	getFolderStructure: function(){
		var folderId = Template.instance().data.folderId;
		var userId = Meteor.userId();
		console.log("getFolderStructure", getFullFolderStructure("", "", 0));
	},
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
		if(rec.subFiles.length == 0 && rec.subFolders.length == 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	},
	getFileFoldersCount: function(rec)
	{
		var filesCount = getFilesList(rec._id);
		var folderCount = getFoldersList(rec._id);
		return filesCount.length + folderCount.length;
	}
});
Template.reportsTabSelect.events({
	'click .nextButton': function(e){ 
	    // e.preventDefault();

	    e.preventDefault();
	    var selectedFiles = $(".reportstab.selectReports .selectFiles:checked");
	    if(selectedFiles.length == 0)
	    {
	      alert("Please select atleast one file to continue.");
	    }
	    else
	    {
	      //$(".multipleSelectFileOptionsOverlay .overlayBackground").fadeIn();
	      openMenu("multipleSelectFileOptionsOverlay");
	    }

	    
	    /*var selectedFiles = $(".reportstab.selectReports .selectFiles:checked");
	    if(selectedFiles.length == 0)
	    {
	      alert("Please select atleast one file to continue.");
	    }
	    else
	    {
	      //$(".multipleSelectFileOptionsOverlay .overlayBackground").fadeIn();
	      
	    }*/
	    // openMenu("multipleSelectFileOptionsOverlay");
	  },
	'change .selectFiles': function(e)
	{
		e.preventDefault();
		var elem = $(e.target);
		var type = elem.attr("data-type");
		var typeid = elem.attr("data-Id");
		var action = elem.is(":checked");
		if(type == "file")
		{
			var selected = selectedFiles.get();
			if(action)
			{
				if(selected.indexOf(typeid) == -1)
				{
					selected.push(typeid);
					if(JSON.stringify(selected) !== JSON.stringify(selectedFiles.get()))
					{
						selectedFiles.set(selected);
					}
				}
				console.log(selectedFiles.get());
				$("#selectReportFilesIds").val(selectedFiles.get().toString());
				var parentID = elem.attr("data-parentFolderId");
				var allotherfields = $("input[data-parentFolderId='"+parentID+"']");
				var allow = 1;
				allotherfields.each(function(key, val){
					var el = $(val);
					if(!el.is(":checked"))
					{
						allow = 0;
					}
				});
				console.log("allow",allow);
				if(allow)
				{
					$("input[data-id='"+elem.attr("data-parentFolderId")+"']").prop("checked", true);
				}
				else
				{
					$("input[data-id='"+elem.attr("data-parentFolderId")+"']").prop("checked", false);
				}
			}
			else
			{
				if(selected.indexOf(typeid) > -1)
				{
					var temp = [];
					for(var i = 0; i < selected.length; i++)
					{
						if(selected[i] !== typeid)
						{
							temp.push(selected[i]);
						}
					}
					if(JSON.stringify(temp) !== JSON.stringify(selectedFiles.get()))
					{
						selectedFiles.set(temp);
					}
					console.log(selectedFiles.get());
					$("#selectReportFilesIds").val(selectedFiles.get().toString());
					$("input[data-id='"+elem.attr("data-parentFolderId")+"']").prop("checked", false);
				}
			}
		}
		else
		{
			var folderIds = userFolders.find({
				$or: [
					{
						"_id": typeid
					},
					{
						"folderPath": {
							$regex: new RegExp(typeid, 'i')
						}
					}
				]
			});
			if(folderIds.count() > 0)
			{
				folderIds = folderIds.fetch();
				var finalFolderIds = [];
				for(var i = 0; i < folderIds.length; i++)
				{
					finalFolderIds.push(folderIds[i]._id);
				}
				var filesList = userFiles.find({
					"fileFolder": {
						$in: finalFolderIds
					},
					"isDeleted": false,
				});
				if(filesList.count() > 0)
				{
					filesList = filesList.fetch();
				}
			}
			console.log(filesList.length);
			if(filesList.length > 0)
			{
				var selected = selectedFiles.get();
				if(action)
				{
					for(var j = 0; j < filesList.length; j++)
					{
						if(selected.indexOf(filesList[j]._id) == -1)
						{
							selected.push(filesList[j]._id);
							if(JSON.stringify(selected) !== JSON.stringify(selectedFiles.get()))
							{
								selectedFiles.set(selected);
							}
						}
					}
					console.log(selectedFiles.get());
					$("#selectReportFilesIds").val(selectedFiles.get().toString());
					$("input[data-parentFolderId='"+typeid+"']").prop("checked", true);
					var parentID = elem.attr("data-parentFolderId");
					console.log("parentID", parentID);
					var allotherfields = $("input[data-parentFolderId='"+parentID+"']");
					var allow = 1;
					allotherfields.each(function(key, val){
						var el = $(val);
						if(!el.is(":checked"))
						{
							allow = 0;
						}
					});
					console.log("allow",allow);
					if(allow)
					{
						$("input[data-id='"+elem.attr("data-parentFolderId")+"']").prop("checked", true);
					}
					else
					{
						$("input[data-id='"+elem.attr("data-parentFolderId")+"']").prop("checked", false);
					}
				}
				else
				{
					
					for(var j = 0; j < filesList.length; j++)
					{
						var temp = [];
						if(selected.indexOf(filesList[j]._id) > -1)
						{
							var ii = selected.indexOf(filesList[j]._id);
							selected.splice(ii,1);
							/*for(var i = 0; i < selected.length; i++)
							{
								if(selected[i] !== filesList[j]._id)
								{
									temp.push(selected[i]);
								}
							}*/
							
						}
					}
					console.log(selected);
					console.log(selectedFiles.get());
					$("#selectReportFilesIds").val(selectedFiles.get().toString());
					if(JSON.stringify(selected) !== JSON.stringify(selectedFiles.get()))
						{
							selectedFiles.set(temp);
						}
					$("input[data-id='"+elem.attr("data-parentFolderId")+"']").prop("checked", false);
					$("input[data-parentFolderId='"+typeid+"']").prop("checked", false);
				}
			}
		}
	},
	'click .belloringalarmvoicereminder':function(e){
	    e.preventDefault();
	    appHistoryPush("/notifications");
	    Router.go("/notifications");
  	},
	
	'click .listViewButton': function(e)
	{
		var elem = $(e.target);
		var currentView = elem.attr("data-view");
		if(currentView == "list")
		{
		  listViewReportfolder.set("grid");
		  elem.attr("data-view", "grid");
		}
		else
		{
		  listViewReportfolder.set("list");
		  elem.attr("data-view", "list");
		}
	},
	'keyup .searchTextboxSubFolder': function(e)
	{
		var elem = $(e.target);
		searchTextboxReportFolder.set(elem.val());
	},
	
	
	
	
	'click .backbuttontopnav': function(e)
	{
		e.preventDefault();
		Router.go("/reports");
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
			sortReportFolders.set(1);
			elem.addClass("rotateClass");
			elem.attr("data-sort","1");
		}
		else {
			sortReportFolders.set(-1);
			elem.removeClass("rotateClass");
			elem.attr("data-sort","-1");
		}
	}
});










function getReportFolderFiles(userId, searchVal, folderId)
{
	console.log("folderIdss",userId);
	if(typeof searchVal == "undefined")
    {
        searchVal = ""
    }
    if(searchVal == "")
    {
    	if(folderId == "")
    	{
    		return userFiles.find({
				"userId": {
					$in: userId
				},
	            "isDeleted": false,
	            "showInReports": true
	        }).fetch();
    	}
    	else
    	{
    		return userFiles.find({
	            "fileFolder": folderId,
				"userId": {
					$in: userId
				},
	            "isDeleted": false,
	            "showInReports": true
	        }).fetch();
    	}
    }
    else
    {
    	if(folderId == "")
    	{
    		return userFiles.find({
				"userId": {
					$in: userId
				},
	            "isDeleted": false,
	            "fileName": new RegExp(searchVal, "i"),
	            "showInReports": true
	        }).fetch();
    	}
    	else
    	{
    		return userFiles.find({
	            "fileFolder": folderId,
				"userId": {
					$in: userId
				},
	            "isDeleted": false,
	            "fileName": new RegExp(searchVal, "i"),
	            "showInReports": true
	        }).fetch();
    	}
    }
}
function getReportFolderFiles1(userId, searchVal, folderId)
{
	console.log("folderIdss",userId);
	if(typeof searchVal == "undefined")
    {
        searchVal = ""
    }
    if(searchVal == "")
    {
    	if(folderId == "")
    	{
    		return userFiles.find({
				"userId": {
					$in: userId
				},
	            "isDeleted": false,
	            "fileFolder": folderId
	        }).fetch();
    	}
    	else
    	{
    		return userFiles.find({
	            "fileFolder": folderId,
				"userId": {
					$in: userId
				},
	            "isDeleted": false,
	            "fileFolder": folderId
	        }).fetch();
    	}
    }
    else
    {
    	if(folderId == "")
    	{
    		return userFiles.find({
				"userId": {
					$in: userId
				},
	            "isDeleted": false,
	            "fileName": new RegExp(searchVal, "i"),
	            "fileFolder": folderId
	        }).fetch();
    	}
    	else
    	{
    		return userFiles.find({
	            "fileFolder": folderId,
				"userId": {
					$in: userId
				},
	            "isDeleted": false,
	            "fileName": new RegExp(searchVal, "i"),
	            "fileFolder": folderId
	        }).fetch();
    	}
    }
}
function getReportFolderFolders(userId,searchVal,subFolderId)
{
    if(typeof searchVal == "undefined")
    {
        searchVal = ""
    }
    if(searchVal == "")
    {
    	if(subFolderId == "")
    	{
    		return userFolders.find({
				"userId": { 
					$in: userId
				},
	            "isDeleted": false,
	            "showInReports": true
	        }).fetch();
    	}
        else
        {
        	return userFolders.find({
	            "parentId": subFolderId,
	            "userId": { 
					$in: userId
				},
	            "isDeleted": false,
	            "showInReports": true
	        }).fetch();
        }
    }
    else
    {
    	if(subFolderId == "")
    	{
    		return userFolders.find({
				"userId": { 
					$in: userId
				},
	            "isDeleted": false,
	            "folderName": new RegExp(searchVal, "i"),
	            "showInReports": true
	        }).fetch();
    	}
        else
        {
        	return userFolders.find({
	            "parentId": subFolderId,
	            "userId": { 
					$in: userId
				},
	            "isDeleted": false,
	            "folderName": new RegExp(searchVal, "i"),
	            "showInReports": true
	        }).fetch();
        }
    }
}
function getReportFolderFolders1(userId,searchVal,subFolderId)
{
	console.log("getReportFolderFolders1");
    if(typeof searchVal == "undefined")
    {
        searchVal = ""
    }
    if(searchVal == "")
    {
    	if(subFolderId == "")
    	{
    		console.log("muki", userFolders.find({
				"userId": { 
					$in: userId
				},
	            "isDeleted": false
	        }).fetch());
    		return userFolders.find({
				"userId": { 
					$in: userId
				},
	            "isDeleted": false
	        }).fetch();
    	}
        else
        {
        	console.log("muki", userFolders.find({
	            "parentId": subFolderId,
	            "userId": { 
					$in: userId
				},
	            "isDeleted": false,
	        }).fetch());
        	return userFolders.find({
	            "parentId": subFolderId,
	            "userId": { 
					$in: userId
				},
	            "isDeleted": false,
	        }).fetch();
        }
    }
    else
    {
    	if(subFolderId == "")
    	{
    		return userFolders.find({
				"userId": { 
					$in: userId
				},
	            "isDeleted": false,
	            "folderName": new RegExp(searchVal, "i")
	        }).fetch();
    	}
        else
        {
        	return userFolders.find({
	            "parentId": subFolderId,
	            "userId": { 
					$in: userId
				},
	            "isDeleted": false,
	            "folderName": new RegExp(searchVal, "i")
	        }).fetch();
        }
    }
}
function getFullFolderStructure(searchval, sortField, sortAction)
{
	var finalCollaborators = [];
    var fullAccessUser = [];
    var limitedAccessUsers = [];
    var folderIdsAccess = [];
    var coll = [];
    if(Meteor.user() != undefined)
    {
      var collaborators = getCollaborators(Meteor.user());
      console.log("collaborators",collaborators);
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
      Meteor.subscribe("getCollaboratorsFiles",coll);
      Meteor.subscribe("getCollaboratorsFolders",coll);
    }    
    finalCollaborators.push(Meteor.userId());
    console.log("finalCollaborators", finalCollaborators);
    var rootFilesOfFolder = getReportFolderFiles(finalCollaborators,searchval,"");
    var rootFoldersOfFolder = getReportFolderFolders(finalCollaborators,searchval,"");
    console.log("rootFoldersOfFolder11",rootFoldersOfFolder);
    var structureArray = [];
    for(var i = 0; i < rootFilesOfFolder.length; i++)
    {
        rootFilesOfFolder[i]["resourceType"] = "file";
        structureArray.push(rootFilesOfFolder[i]);
    }
    for(var j = 0; j < rootFoldersOfFolder.length; j++)
    {
        var getFolderFilesList = getReportFolderFiles1(finalCollaborators,"",rootFoldersOfFolder[j]._id);
        console.log("getFolderFilesList", rootFoldersOfFolder[j]._id);
        var getSubFoldersList = getReportFolderFolders1(finalCollaborators,"",rootFoldersOfFolder[j]._id);
        console.log("getSubFoldersList", rootFoldersOfFolder[j]._id);
        rootFoldersOfFolder[j]["fileName"] = rootFoldersOfFolder[j].folderName;
        rootFoldersOfFolder[j]["subFiles"] = getFolderFilesList;
        rootFoldersOfFolder[j]["subFolders"] = getSubFoldersList;
        rootFoldersOfFolder[j]["fileSize"] = getFolderSize(rootFoldersOfFolder[j]._id);
        rootFoldersOfFolder[j]["resourceType"] = "folder";
        structureArray.push(rootFoldersOfFolder[j]);
    }
    console.log("structureArray",structureArray);
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
    else if(sortField == "resourceType")
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
function getReportFolderFilesCount(folderId)
{
    var folderFiles = userFiles.find({
        "fileFolder": folderId,
        "isDeleted": false
    });
    return folderFiles.count();
}
function getReportFolderFoldersCount(folderId)
{
    var folderFiles = userFolders.find({
        "parentId": folderId,
        "isDeleted": false
    });
    return folderFiles.count();
}