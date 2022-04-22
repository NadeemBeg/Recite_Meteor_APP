const pretty = require('prettysize');
var ta = require('time-ago')  // node.js
Template.userFolders.onCreated(function(){
	Meteor.subscribe("getUserFolders", Meteor.userId());
	Meteor.subscribe("getUserDetails", Template.instance().data.id);
	Meteor.subscribe('getUserStarredFolders',Meteor.userId());
	Meteor.subscribe('getReportUserFolders',Meteor.userId());
	Meteor.subscribe('getReportFilesByUser',Meteor.userId());
	Meteor.subscribe("getFilesByUser", Meteor.userId());
	Meteor.subscribe("	");
});
Template.userFolders.onRendered(function(){
	Session.set("folderOwner", Template.instance().data.id);
  	Session.set("folderPath", "");
});
Template.userFolders.helpers({
	countFolderAndFile:function(id){
		console.log("IDIDI",id);
		var count1 = 0;
		var count = getFolderFoldersCount(id);
		console.log("count getFolderFoldersCount" ,count);
		if(count == 0)
		{
			// return "0 Folders";
			count1 = count1+count;
		}
		else
		{
			count1 = count1+count;
		}
		var count = getFolderFilesCount(id);
		console.log("count getFolderFilesCount" ,count);
		if(count == 0)
		{
			count1 = count1+count;
		}
		else
		{
			count1 = count1+count;
		}
		return count1;
	},
	isNotStarredFolder:function(fileId){
		console.log("Template.instance()", Template.instance());
		var oldData = userStarredFolders.find({
		  "userId": Template.instance().data.id,
		  "fileId": fileId
		});
		console.log("Template.instance().data.userId",Template.instance().data.userId);
		console.log("oldData",oldData.count());
		if(oldData.count() == 0)
		{
		  return true;
		}
		else
		{
		  return false;
		}
	},
	getUserName: function () {
		if(Template.instance().data.id == Meteor.userId())
		{
			var userName = Meteor.user().profile.fullName;
		}
		else
		{
			var contactData = userContacts.findOne({
				"userId": Meteor.userId(),
				"_id": Template.instance().data.id
			});
			if(typeof contactData !== "undefined")
			{
				var userName = contactData.fullName;
			}
			
		}
		if(typeof userName !== "undefined")
		{
			if(userName.indexOf(" ") == -1)
			{
				return userName;
			}
			else
			{
				return userName.substr(0, userName.indexOf(" "));
			}
		}
	},
	getFolders: function(){
		var finalCollaborators = [];
	    var fullAccessUser = [];
	    var limitedAccessUsers = [];
	    var folderIdsAccess = [];
	    var coll = [];
	    if(Meteor.user() != undefined)
	    {
	    	if(Template.instance().data.id == Meteor.userId())
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
			      return userFolders.find({
					$or: [
				        {
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
				        },
				        {
							"_id": 
							{
								$in: folderIdsAccess
							}
						},
				        {
							"userId": {
								$in: fullAccessUser
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
						}
					]
				}).fetch()
	    	}
	      	else
	      	{
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
		            ],
		            "referenceId": Template.instance().data.id
				}).fetch()
	      	}
	    }    

	    console.log("folderIdsAccess", folderIdsAccess);
	    console.log("fullAccessUser", fullAccessUser);

		/*return userFolders.find({
			$or: [
				{
					"_id": {
						$in: folderIdsAccess
					}
				},
				{
					"userId": {
						$in: fullAccessUser
					},
				},
				{
					"userId": Meteor.userId(),
					"referenceId": Template.instance().data.id,
				}
			],
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
		}).fetch();*/
		
	},
	showDeleteOptionFolder: function(id)
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
var flip = 0;
Template.userFolders.events({
	'click #editMasterFolders':function(e){
		e.preventDefault();
		flip++;
		$(".spanDeleteIcon").toggle( flip % 2 === 0 );
		$(".spanEditFolderIcon").toggle( flip % 2 === 0 );
		$(".spanOptionsIcon").toggle( flip % 2 === 0 );
	},
	'click .belloringalarmvoicereminder':function(e){
		e.preventDefault();
		appHistoryPush("/notifications");
		Router.go("/notifications");
	},
	'click #addMasterFolder': function(e){
		e.preventDefault();
		Session.set("folderOwner", Template.instance().data.id);
  		Session.set("folderPath", "");
  		appHistoryPush("/folder/new");
		Router.go("/folder/new");
	},
	'click .subFolderClick': function(e){
		e.preventDefault();
		var a = userFolders.findOne({
			"_id": $(e.target).attr("data-id")
		});
		if(a !== null)
		{
			Session.set("folderOwner", a.userId);
	  		Session.set("folderPath", $(e.target).attr("data-id"));
	  		appHistoryPush("/sub-folder/"+a.userId+"/"+$(e.target).attr("data-id"));
	  		Router.go("/sub-folder/"+a.userId+"/"+$(e.target).attr("data-id"));
		}
	},
	'click .backbuttontopnav': function(e){
		e.preventDefault();
		if(Session.get("previousURLApp") == "/home")
		{
			Router.go(Session.get("previousURLApp"));
		}
		else
		{
			Router.go("/home");
		}
	},
	'click .spanDeleteIcon': function(e){
		e.preventDefault();
		e.stopPropagation();
		var c = confirm("Are you sure you want to delete? \n\n All decisions are final. ");
		var fileId = $(e.target).attr("data-id");
		console.log("fileId",fileId);
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
	'click .spanEditFolderIcon': function(e){
		e.preventDefault();
		e.stopPropagation();
		var folderId = $(e.target).attr("data-id");
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
	    
	    console.log("filesCount",filesCount);
	    console.log("folderCount",folderCount);
	    if(filesCount !== undefined)
	    {
	    	if(filesCount.length > 0){
	    		if(filesCount.length == 1)
	    			str += filesCount.length + " File ";
	    		else
	    			str += filesCount.length + " Files ";
	    	}
	    	else{
	    		// alert("Folder is Empty");
	    		// return;
	    	}
	    	
	    }
	    else{
	    	// alert("Folder is Empty");
	    	// return
	    }
	    if(folderCount.length > 0)
	    {
	    	if(folderCount.length == 1)
	    		str += folderCount.length + " Folder ";
	    	else
	    		str += folderCount.length + " Folders ";
	    }
	    // else{
	    // 	alert("Folder is Empty");
	    // }
	    if(str == 0 || str == "" || str == null || str == undefined){
	    	alert("Folder is Empty");
	    	return
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
	'click .addToStar':function(e){
		e.stopPropagation();
		var id = $(e.target).attr("data-id");
		console.log("id",id);
		var status = $(e.target).attr("data-status");
		// var id = $(".addToStar").attr("data-id");
		console.log("status",status);
		console.log("addToStar folderId", id);
		if(status == "true")
		{
		var currentAction = false;
		}
		else{
			var currentAction = true;
		}
		Meteor.call("markFolderAsStarred", Meteor.userId(), id, currentAction, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				if(status == "true")
				{
					$(e.target).attr("data-status", "false");
					$(e.target).attr("src","/img/StarBlackIcon.png");
					$(e.target).next().html("Add to Starred");
					$(e.target).next().removeClass("activeClass");
				}
				else
				{
					$(e.target).attr("data-status", "true");
					$(e.target).attr("src","/img/fileslistselect-star@2x.png");
					$(e.target).next().html("Starred Folder");
					$(e.target).next().addClass("activeClass");
				}
			}
			// closeMenu("foldercontrolsoverlay.options");
		});
	},
	'click .removeToStar':function(e){
		e.stopPropagation();
		var id = $(e.target).attr("data-id");
		console.log("id",id);
		var status = $(e.target).attr("data-status");
		// var id = $(".addToStar").attr("data-id");
		console.log("status",status);
		console.log("removeToStar folderId", id);
		var currentAction = status;
		Meteor.call("markFolderAsStarred", Meteor.userId(), id, !currentAction, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				// if(currentAction == "true")
				// {
				// 	$(".removeToStar").attr("data-status", "false");
				// 	$(".removeToStar").attr("src","/img/StarBlackIcon.png");
				// 	$(".removeToStar").next().html("Add to Starred");
				// 	$(".removeToStar").next().removeClass("activeClass");
				// }
				// else
				// {
				// 	$(".removeToStar").attr("data-status", "true");
				// 	$(".removeToStar").attr("src","/img/fileslistselect-star@2x.png");
				// 	$(".removeToStar").next().html("Starred Folder");
				// 	$(".removeToStar").next().addClass("activeClass");
				// }
			}
			// closeMenu("foldercontrolsoverlay.options");
		});
	},
});