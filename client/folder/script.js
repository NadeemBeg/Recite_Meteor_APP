Template.createFolder.onCreated(function(){
	Meteor.subscribe("getUserFolders", Meteor.userId());
});
Template.createFolder.onRendered(function(){});
Template.createFolder.helpers({

});
Template.createFolder.events({
	// 'click .createFolderButton':function(e){
	// 	var a = appHistoryPull();
	// 	console.log(a);
	// 	Router.go(a);
	// },
	"click .emptyButton": function(e)
	{
		$("#newFolderName").val("");
	},
	"click .arrowright336": function(e){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
	},
	"click .cancel": function(e){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
	},
	"click #createFolderButton": function(e)
	{
		e.preventDefault();
		var folderName = $("#newFolderName").val();
		if(folderName == "")
		{
			alert("Please enter folder name.");
			return;
		}
		
		$(".waitingOverlay .overlayBackground").toggle("fade");
		var a = getFolderPath(Session.get("folderPath"), [], Session.get("folderOwner"));
		var fullFolderPath = Session.get("fullFolderPath");
		if(fullFolderPath == undefined)
		{
			fullFolderPath == Session.get("folderOwner");
		}
		Meteor.call("isFolderExist", folderName, Session.get("folderPath"), Session.get("folderOwner"), function(err, res){
			if(err)
			{
				console.log(err);
			}
			else
			{
				if(res)
				{
					$(".waitingOverlay .overlayBackground").toggle("fade");
					alert("Folder already exist.");
				}
				else
				{
					Meteor.call("createFolder", folderName, Meteor.userId(), Session.get("folderPath"), fullFolderPath,Session.get("folderOwner"), function(err, res){
						if(err)
						{
							alert(err.reason);
						}
						else
						{
							alert("Folder was created successfully.");
							if(fullFolderPath == undefined)
							{
								var previousFolderId = Session.get("folderOwner");
							}
							else
							{
								fullFolderPath = fullFolderPath.split("_");
								var previousFolderId =  fullFolderPath[(fullFolderPath.length - 1)];
							}

							var t = Session.get("appHistory");
							if(typeof t == "undefined")
							{
								Router.go("/");
							}
							var url = t[(t.length -2)];
							console.log("url",url);
							if(url.indexOf("addCollaboratorpage") > -1)
							{
								var a = appHistoryPull();
								console.log(a);
								Router.go(a);

							}
							else if(url.indexOf("copyto") > -1)
							{
								var a = appHistoryPull();
								console.log(a);
								Router.go(a);
							}
							else
							{
								if(previousFolderId == Session.get("folderOwner"))
								{
									appHistoryPush("/folders/" + previousFolderId);
									Router.go("/folders/" + previousFolderId);
								}
								else
								{
									appHistoryPush("/sub-folder/" + Session.get("folderOwner") + "/" + res);
									Router.go("/sub-folder/" + Session.get("folderOwner") + "/" + res);
								}
							}			
						}
						$(".waitingOverlay .overlayBackground").toggle("fade");
					});
				}
			}
		});
	},
	'keyup #newFolderName': function(e)
	{
		if($(e.target).val() == "")
		{
			$("#createFolderButton").prop("disabled","disabled");
			$("#createFolderButton").removeClass("active");
		}
		else
		{
			$("#createFolderButton").prop("disabled","");
			$("#createFolderButton").addClass("active");
		}
	}
});



Template.fileRename.onCreated(function(){
	Meteor.subscribe("getFileDetails", Template.instance().data.id);
	Meteor.subscribe("getFolderDetails", Template.instance().data.id);
});
Template.fileRename.onRendered(function(){
	appHistoryPush("/file/rename/"+Template.instance().data.id);
});
Template.fileRename.helpers({
	getFileName: function()
	{
		var fileData =  userFiles.find({
			"_id": Template.instance().data.id
		});
		if(fileData.count() > 0)
		{
			var fileData =  userFiles.findOne({
				"_id": Template.instance().data.id
			});
			if(fileData !== null)
			{
				var fileName = fileData.fileName;
				fileName = fileName.substr(0,fileName.lastIndexOf("."));
				return fileName;
			}
		}
		else
		{
			fileData =  userReportFiles.find({
				"_id": Template.instance().data.id
			});
			if(fileData.count() > 0)
			{
				var fileData =  userReportFiles.findOne({
					"_id": Template.instance().data.id
				});
				if(fileData !== null)
				{
					var fileName = fileData.fileName;
					fileName = fileName.substr(0,fileName.lastIndexOf("."));
					return fileName;
				}
			}
			else
			{
				var fileData =  userFolders.find({
					"_id": Template.instance().data.id
				});
				if(fileData.count() > 0)
				{
					var fileData =  userFolders.findOne({
						"_id": Template.instance().data.id
					});
					if(fileData !== null)
					{
						var fileName = fileData.folderName;
						return fileName;
					}
				}
				else
				{
					fileData =  userReportFolders.find({
						"_id": Template.instance().data.id
					});
					if(fileData.count() > 0)
					{
						var fileData =  userReportFolders.findOne({
							"_id": Template.instance().data.id
						});
						if(fileData !== null)
						{
							var fileName = fileData.folderName;
							return fileName;
						}
					}
				}
			}
		}
	}
});
Template.fileRename.events({
	"click .emptyButton": function(e)
	{
		$("#fileNameText").val("");
	},
	"click .fileRename .arrowright336": function(e){
		var a = appHistoryPull();
		Router.go("/filelistview");
	},
	"click .fileRename .cancel": function(e){
		var a = appHistoryPull();
		Router.go(a);
	},
	"click #createFolderButton": function(e)
	{
		e.preventDefault();
		var folderName = $("#fileNameText").val();
		if(folderName == "")
		{
			alert("Please enter file/folder name.");
			return;
		}
		$(".waitingOverlay .overlayBackground").toggle("fade");
		Meteor.call("renameFile", Template.instance().data.id, folderName, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				alert("File was renamed successfully.");
				closeMenu("sendItemOverlay");
				var a = appHistoryPull();
				Router.go(a);
			}
			$(".waitingOverlay .overlayBackground").toggle("fade");
		});
	},
	'keyup #fileNameText': function(e)
	{
		if($(e.target).val() == "")
		{
			$("#createFolderButton").prop("disabled","disabled");
			$("#createFolderButton").removeClass("active");
		}
		else
		{
			$("#createFolderButton").prop("disabled","");
			$("#createFolderButton").addClass("active");
		}
	}
});