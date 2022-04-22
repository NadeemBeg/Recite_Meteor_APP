const pretty = require('prettysize');
var ta = require('time-ago')  // node.js
Template.notifications.onCreated(function(){
	Meteor.subscribe("getUserNotifications", Meteor.userId());
	Meteor.subscribe("getUserSharedFiles", Meteor.userId());
});
Template.notifications.onRendered(function(){
});
Template.notifications.helpers({
	"getNotificationList": function(){
		var notificationUnReadList = notificationDetails.find({
			"toUserId": Meteor.userId(),
			"readStatus": false
		},{
			sort: {
				"notificationDate": -1
			}
		}).fetch();
		var notificationReadList = notificationDetails.find({
			"toUserId": Meteor.userId(),
			"readStatus": true
		},{
			sort: {
				"notificationDate": -1
			}
		}).fetch();
		var hasNotification = 0;
		if(notificationUnReadList.length > 0 || notificationReadList.length > 0)
		{
			hasNotification = 1;
		}
		var returnArray = {
			"notificationUnReadList": notificationUnReadList,
			"notificationUnReadListCount": notificationUnReadList.length,
			"notificationReadList": notificationReadList,
			"notificationReadListCount": notificationReadList.length,
			"hasNotification": hasNotification
		};
		console.log(returnArray);
		return returnArray;
	},
	"getProfilePic": function(id)
	{

		console.log("id",id);
		var userData = Meteor.users.findOne({
			"_id": id
		});
		if(userData !== null && userData !== undefined)
		{
			if(typeof userData.profilePic !== "undefined")
			{
				return "<img src='" + userData.profilePic + "' class='img-responsive' style='width: 25px;height:auto;'/>";
			}
			else
			{
				return "<img src='/img/UserIconNewDefault.png' class='img-responsive' style='width: 25px;'/>";
			}
		}
		else
			{
				return "<img src='/img/UserIconNewDefault.png' class='img-responsive' style='width: 25px;'/>";
			}
	},
	"getMessage": function(id)
	{
		var userData = Meteor.users.findOne({
			"_id": id
		});
		if(userData !== null  && userData !== undefined)
		{
			return '<div class="amberginvitedyou">'+userData.profile.fullName+' invited you to view and edit file(s)</div>';
		}
	},
	getNotificationBody1: function(rec)
	{
		console.log(rec);
		var shareedFileTableId = rec.shareedFileTableId;
		var sharedFilesListData = userSharedFiles.find({
			"token": shareedFileTableId
		});

		if(sharedFilesListData.count() > 0)
		{
			sharedFilesListData = sharedFilesListData.fetch();
			console.log("sharedFilesListData", sharedFilesListData);
			var fileIds = [];
			for(var i = 0; i < sharedFilesListData.length; i++)
			{
				fileIds.push(sharedFilesListData[i].fileId);
			}

			if(fileIds.length > 0)
			{
				var fileList = userFiles.find({
					"_id": {
						$in: fileIds
					},
					"isDeleted": false
				});
				console.log(fileList);
				if(fileList.count() > 0)
				{
					console.log(fileList.fetch());
					fileList = fileList.fetch();
					var html = "";
					for(var i = 0; i < fileList.length; i++)
					{
						var fileName = fileList[i].fileName;
						var fileIcon = getFileIcon(fileList[i].fileName);
						html += '<a href="#" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'" class="redirectToFile"><div class="rectangle2" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'"><div class="folder" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'"><div class="layer1" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'"><img src="'+fileIcon+'" class="shape"/></div></div><div class="propertydamagere" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'">'+fileName+'</div><img src="/img/notifications-arrowright-336-2@2x.png" class="arrowright336" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'"/></div></a>';
					}
					return html;
				}
				
			}
		}
	},
	hasFiles: function(arr)
	{
		var hasFile = 0;
		for(var i = 0; i < arr.length; i++)
		{
			var rec = arr[i];
			var shareedFileTableId = rec.shareedFileTableId;
			Meteor.subscribe("getSharedFileTableById", shareedFileTableId);
			var sharedFilesListData = userSharedFiles.findOne({
				"token": shareedFileTableId
			});
			if(typeof sharedFilesListData !== "undefined")
			{
				var fileList = userFiles.find({
					"_id": {
						$in: sharedFilesListData.fileIds
					},
					"isDeleted": false
				});
				if(fileList.count() > 0)
				{
					hasFile = 1;
					return true;
				}
				
			}
		}
		return false;
	},
	"getNotificationFilesCount": function(rec)
	{
		console.log("rec",rec);
		var shareedFileTableId = rec.shareedFileTableId;
		console.log("shareedFileTableId",rec.shareedFileTableId);
		Meteor.subscribe("getSharedFileTableById", shareedFileTableId);
		var sharedFilesListData = sharedFilesList.findOne({
			"sharedFilesDetailsTableId": shareedFileTableId
		});
		console.log("sharedFilesListData",sharedFilesListData);
		if(typeof sharedFilesListData !== "undefined")
		{
			var fileList = userFiles.find({
				"_id": {
					$in: sharedFilesListData.fileIds
				},
				"isDeleted": false
			});
			if(fileList.count() > 0)
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
	},
	"getNotificationBody": function(rec)
	{
		// console.log("rec123",rec);
		var shareedFileTableId = rec.shareedFileTableId;
		console.log("rec.shareedFileTableId",rec.shareedFileTableId);
		Meteor.subscribe("getSharedFileTableById", shareedFileTableId);
		var sharedFilesListData = sharedFilesList.findOne({
			"sharedFilesDetailsTableId": shareedFileTableId
		});
		console.log("sharedFilesListData 111 ",sharedFilesListData);
		if(typeof sharedFilesListData !== "undefined")
		{
			console.log("sharedFilesListData 2222 ",sharedFilesListData);
			var fileList = userFiles.find({
				"_id": {
					$in: sharedFilesListData.fileIds
				},
				"isDeleted": false
			});
			if(fileList.count() > 0)
			{
				// console.log(fileList.fetch());
				fileList = fileList.fetch();
				var html = "";
				
				for(var i = 0; i < fileList.length; i++)
				{
					var fileName = fileList[i].fileName;
					var fileIcon = getFileIcon(fileList[i].fileName);
					console.log("fileName.fileName",fileName);
					
					html += '<a href="#" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'" class="redirectToFile"><div class="rectangle2" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'"><div class="folder" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'"><div class="layer1" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'"><img src="'+fileIcon+'" class="shape"/></div></div><div class="propertydamagere" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'">'+fileName+'</div><img src="/img/notifications-arrowright-336-2@2x.png" class="arrowright336" data-fileId="'+fileList[i]._id+'" data-notId="'+rec._id+'"/></div></a>';	
				}
				return html;
			}
		}
	},
	"getNotificationTime": function(rec)
	{
		var shareedFileTableId = rec.notificationDate;
		var d = ta.ago(shareedFileTableId)
		return d;
	}
});
Template.notifications.events({

	'click .redirectToFile': function(e){
		// Session.set("previousURLApp","/notifications");
		// appHistoryPush("/notifications");
		e.preventDefault();
		console.log("redirectToFile");
		var elem = $(e.target);
		var fileId = elem.attr("data-fileId");
		var notId = elem.attr("data-notId");
		Meteor.call("setNotificationAsRead",notId,function(err, res){
			if(err)
			{
				console.log(err.reason);
			}
			else
			{
				appHistoryPush("/clientfile/"+fileId);
				Router.go("/clientfile/"+fileId);
			}
		});
		// Router.go("/cardPayment");
	},
	'click .backbuttontopnav': function(e)
	{
		e.preventDefault();
		var a = appHistoryPull();
		console.log("appHistoryPull", a);
		if(typeof a !== "undefined") {
			Router.go(a);
		}
		else {
			Router.go("/");
		}
		
	},
	'click .notificationSettings': function(e)
	{
		e.preventDefault();
		openMenu("notificationOverlay");
	}
});