var searchCopyToContacts = new ReactiveVar("");
var searchCopyToMasterFolderContacts = new ReactiveVar("");
var searchCopyToMasterSubFolderContacts = new ReactiveVar("");
Template.copyto.onCreated(function(){
	Meteor.subscribe("getFilesByUser",Meteor.userId());
	Meteor.subscribe("getReportFilesByUser", Meteor.userId());
});
Template.copyto.onRendered(function(){
		
		var s = Session.get("selectContactProcess");
		if(s)
		{
			console.log("contactId SElected = " + Session.get("selectedContactId"));
			$(".copyto #copytoselectedcontactid").val(Session.get("selectedContactId"));
			var contactDetails = userContacts.findOne({
				"_id": Session.get("selectedContactId")
			});
			console.log(contactDetails);
			$(".copyto #contactTextBox").val(contactDetails.fullName);
			$(".copyto .selectContactDivSection").find(".searchIcon").addClass("active");
			$(".copyto .selectContactDivSection").find(".searchIcon img").attr("src", "/img/rightCirle.png");
			$(".copyto .selectContactDivSection").find(".micIcon").addClass("active");
			$(".copyto .selectContactDivSection").find(".micIcon img").attr("src", "/img/crossmark.png");
			Session.set("selectContactProcess", 0);
		}
		else
		{
			if(Session.get("selectedContactId"))
			{
				$(".copyto #copytoselectedcontactid").val(Session.get("selectedContactId"));
				var contactDetails = userContacts.findOne({
					"_id": Session.get("selectedContactId")
				});
				console.log(contactDetails);
				$(".copyto #contactTextBox").val(contactDetails.fullName);
				$(".copyto .selectContactDivSection").find(".searchIcon").addClass("active");
				$(".copyto .selectContactDivSection").find(".searchIcon img").attr("src", "/img/rightCirle.png");
				$(".copyto .selectContactDivSection").find(".micIcon").addClass("active");
				$(".copyto .selectContactDivSection").find(".micIcon img").attr("src", "/img/crossmark.png");
			}
		}

		var s1 = Session.get("selectContactMasterFolderProcess");
		if(s1)
		{
			$(".copyto #copytoselectedcontactmasterfolderid").val(Session.get("selectedContactMasterFolderId"));
			var contactDetails = userFolders.find({
				"_id": Session.get("selectedContactMasterFolderId")
			});
			if(contactDetails.count() > 0)
			{
				contactDetails = userFolders.findOne({
					"_id": Session.get("selectedContactMasterFolderId")
				});
			}
			else
			{
				contactDetails = userReportFolders.find({
					"_id": Session.get("selectedContactMasterFolderId")
				});
				if(contactDetails.count() > 0)
				{
					contactDetails = userReportFolders.findOne({
						"_id": Session.get("selectedContactMasterFolderId")
					});
				}
			}
			$(".copyto #contactMasterFolderTextBox").val(contactDetails.folderName);
			$(".copyto .selectContactMasterDivSection").find(".searchIcon").addClass("active");
			$(".copyto .selectContactMasterDivSection").find(".searchIcon img").attr("src", "/img/rightCirle.png");
			$(".copyto .selectContactMasterDivSection").find(".micIcon").addClass("active");
			$(".copyto .selectContactMasterDivSection").find(".micIcon img").attr("src", "/img/crossmark.png");
			Session.set("selectContactMasterFolderProcess", 0);
		}
		else
		{
			if(Session.get("selectedContactMasterFolderId"))
			{
				$(".copyto #copytoselectedcontactmasterfolderid").val(Session.get("selectedContactMasterFolderId"));
				var contactDetails = userFolders.findOne({
					"_id": Session.get("selectedContactMasterFolderId")
				});
				console.log(contactDetails);
				$(".copyto #contactMasterFolderTextBox").val(contactDetails.folderName);
				$(".copyto .selectContactMasterDivSection").find(".searchIcon").addClass("active");
				$(".copyto .selectContactMasterDivSection").find(".searchIcon img").attr("src", "/img/rightCirle.png");
				$(".copyto .selectContactMasterDivSection").find(".micIcon").addClass("active");
				$(".copyto .selectContactMasterDivSection").find(".micIcon img").attr("src", "/img/crossmark.png");
			}
		}


		var s2 = Session.get("selectContactMasterSubFolderProcess");
		if(s2)
		{
			$(".copyto #copytoselectedcontactmastersubfolderid").val(Session.get("selectedContactMasterSubFolderId"));
			var contactDetails = userFolders.find({
				"_id": Session.get("selectedContactMasterSubFolderId")
			});
			if(contactDetails.count() > 0)
			{
				contactDetails = userFolders.findOne({
					"_id": Session.get("selectedContactMasterSubFolderId")
				});
			}
			else
			{
				contactDetails = userReportFolders.find({
					"_id": Session.get("selectedContactMasterSubFolderId")
				});
				if(contactDetails.count() > 0)
				{
					contactDetails = userReportFolders.findOne({
						"_id": Session.get("selectedContactMasterSubFolderId")
					});
				}
			}
			console.log(contactDetails);
			$(".copyto #contactMasterSubFolderTextBox").val(contactDetails.folderName);
			$(".copyto .selectContactMasterSubDivSection").find(".searchIcon").addClass("active");
			$(".copyto .selectContactMasterSubDivSection").find(".searchIcon img").attr("src", "/img/rightCirle.png");
			$(".copyto .selectContactMasterSubDivSection").find(".micIcon").addClass("active");
			$(".copyto .selectContactMasterSubDivSection").find(".micIcon img").attr("src", "/img/crossmark.png");
			Session.set("selectContactMasterSubFolderProcess", 0);
		}
		else
		{
			if(Session.get("selectedContactMasterSubFolderId"))
			{
				$(".copyto #copytoselectedcontactmastersubfolderid").val(Session.get("selectedContactMasterSubFolderId"));
				var contactDetails = userFolders.findOne({
					"_id": Session.get("selectedContactMasterSubFolderId")
				});
				if(contactDetails.count() > 0)
				{
					contactDetails = userFolders.findOne({
						"_id": Session.get("selectedContactMasterSubFolderId")
					});
				}
				else
				{
					contactDetails = userReportFolders.find({
						"_id": Session.get("selectedContactMasterSubFolderId")
					});
					if(contactDetails.count() > 0)
					{
						contactDetails = userReportFolders.findOne({
							"_id": Session.get("selectedContactMasterSubFolderId")
						});
					}
				}
				$(".copyto #contactMasterSubFolderTextBox").val(contactDetails.folderName);
				$(".copyto .selectContactMasterSubDivSection").find(".searchIcon").addClass("active");
				$(".copyto .selectContactMasterSubDivSection").find(".searchIcon img").attr("src", "/img/rightCirle.png");
				$(".copyto .selectContactMasterSubDivSection").find(".micIcon").addClass("active");
				$(".copyto .selectContactMasterSubDivSection").find(".micIcon img").attr("src", "/img/crossmark.png");
			}
		}
});
Template.copyto.helpers({
	getFileData: function()
	{
		var a = Template.instance().data.id;
		// console.log("a",a);
		var b = a.split(',');
		console.log("b",b);
		var fileData1 = [];
		for(var i=0; i<b.length;i++){
			var fileData = userFiles.find({
				"_id": b[i]
			});
			if(fileData.count() > 0)
			{
				fileData = userFiles.findOne({
					"_id": b[i]
				});
				fileData1.push(fileData);
				console.log("fileData if condition",fileData);
			}
			else
			{
				fileData = userReportFiles.find({
					"_id": b[i]
				});
				if(fileData.count() > 0)
				{
					fileData = userReportFiles.findOne({
						"_id": b[i]
					});
					fileData1.push(fileData);
				}
			}
		}	
		console.log("fileData1",fileData1);
		return fileData1;
	},
	getText: function(){
		return Template.instance().data.action;
	},
	getTitle: function(){
		var action = Template.instance().data.action;
		console.log("action",action);
		if(action == "copy"){
			return "Copy To";
		}
		else if(action == "move"){
			return "Move To";
		}
		else{
			return "";
		}
	}
});
Template.copyto.events({
	'click .createMasterFolder':function(e){
		var userId = Session.get("selectedContactId");
		if(userId !== null || userId !== undefined){
			Session.set("folderOwner", userId);
		}
		else{
			Session.set("folderOwner", Meteor.userId());
		}		
 		Session.set("folderPath", "");
 		appHistoryPush("/folder/new");
 		Router.go("/folder/new"); 
	},
	'click .createSubFolder':function(e){
		var masterFolderId = Session.get("selectedContactMasterFolderId");
		if(masterFolderId == null || masterFolderId == undefined){
			alert("Please select Master Folder.")
		}
		else{
			Session.set("folderOwner", Meteor.userId());
			Session.set("folderPath", masterFolderId);
			appHistoryPush("/folder/new");
 			Router.go("/folder/new"); 
		}		
 		
	},
	'click #copyButon': function(e)
	{
		e.preventDefault();
		var test = Template.instance();

		if(Session.get("selectedContactId") == undefined && Session.get("selectedContactMasterFolderId") == undefined && Session.get("selectedContactMasterSubFolderId") == undefined)
		{
			alert("Please select contact or master folder to continue.");
			return;
		}

		if(Session.get("selectedContactId") !== undefined && Session.get("selectedContactMasterFolderId") !== undefined && Session.get("selectedContactMasterSubFolderId") !== undefined)
		{
			var destination = Session.get("selectedContactMasterSubFolderId");
			var contactId = Session.get("selectedContactId");
			var masterFolderId = Session.get("selectedContactMasterFolderId");
		}
		else if(Session.get("selectedContactId") !== undefined && Session.get("selectedContactMasterFolderId") !== undefined && Session.get("selectedContactMasterSubFolderId") == undefined)
		{
			var destination = Session.get("selectedContactMasterFolderId");
			var contactId = Session.get("selectedContactId");
			var masterFolderId = Session.get("selectedContactMasterFolderId");
		}
		else if(Session.get("selectedContactId") == undefined && Session.get("selectedContactMasterFolderId") !== undefined && Session.get("selectedContactMasterSubFolderId") == undefined)
		{
			var destination = Session.get("selectedContactMasterFolderId");
			var contactId = Meteor.userId();
			var masterFolderId = Session.get("selectedContactMasterFolderId");
		}
		else if(Session.get("selectedContactId") == undefined && Session.get("selectedContactMasterFolderId") !== undefined && Session.get("selectedContactMasterSubFolderId") !== undefined)
		{
			var destination = Session.get("selectedContactMasterSubFolderId");
			var contactId = Meteor.userId();
			var masterFolderId = Session.get("selectedContactMasterFolderId");
		}
		else if(Session.get("selectedContactId") !== undefined && Session.get("selectedContactMasterFolderId") == undefined && Session.get("selectedContactMasterSubFolderId") == undefined)
		{


			if(test.data.type == "file") {
				var destination = "";
				alert("Please select Master Folder to copy the file.");
			}
			else
			{
				var destination = Session.get("selectedContactId");
			}
		}
		else
		{
			var contactName = $("#contactTextBox").val();
			if(contactName == "" || contactName == null || contactName == undefined ){
				alert("Please select contact");
			}
			var destination = "";
		}
		if(destination !== "")
		{
			console.log("test.data.type",test.data.type);
			if(test.data.type == "file") {
				var fileData = userFiles.find({
					"_id": Template.instance().data.id
				});
				if(fileData.count() > 0)
				{
					fileData = userFiles.findOne({
						"_id": Template.instance().data.id
					});
				}
				Meteor.call("checkFileAlreadyExist", fileData._id, destination, Meteor.userId(), function(err, res){
					if(err)
					{
						alert(err.reason);
					}
					else
					{
						console.log("test.data.action", test.data.action);
						if(test.data.action == "move")
						{
							if(res)
							{
								$.confirm({
								    title: 'Confirmation',
								    content: 'File with same name already exist.',
								    buttons: {
								        replace: function () {
								            Meteor.call("copyFile",fileData._id, destination, Meteor.userId(), test.data.action, 1, function(err1, res1){
												if(err1)
												{
													alert(err.reason);
												}
												else
												{
													if(test.data.action == "copy")
													{
														alert("File was copied successfully.");
													}
													else
													{
														alert("File was moved successfully.");
													}
													var folderDetails = userFolders.findOne({
														"_id": destination
													});
													Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);
												}
											});
								        },
										somethingelse: {
								            text: 'keep both',
								            action: function(){
								                Meteor.call("copyFile",fileData._id, destination, Meteor.userId(), test.data.action, 0, function(err1, res1){
													if(err1)
													{
														alert(err.reason);
													}
													else
													{
														if(test.data.action == "copy")
														{
															alert("File was copied successfully.");
														}
														else
														{
															alert("File was moved successfully.");
														}
														var folderDetails = userFolders.findOne({
															"_id": destination
														});
														Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);
													}
												});
								            }
								        },
								        cancel: function () {},
								    }
								});
							}
							else
							{
								Meteor.call("copyFile",fileData._id, destination, Meteor.userId(), test.data.action, 0, function(err1, res1){
									if(err1)
									{
										alert(err.reason);
									}
									else
									{
										if(test.data.action == "copy")
										{
											alert("File was copied successfully.");
										}
										else
										{
											alert("File was moved successfully.");
										}
										var folderDetails = userFolders.findOne({
											"_id": destination
										});
										Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);
									}
								});
							}
						}
						else
						{
							Meteor.call("copyFile",fileData._id, destination, Meteor.userId(), test.data.action, function(err1, res1){
								if(err1)
								{
									alert(err.reason);
								}
								else
								{
									if(test.data.action == "copy")
									{
										alert("File was copied successfully.");
									}
									else
									{
										alert("File was moved successfully.");
									}
									var folderDetails = userFolders.findOne({
										"_id": destination
									});
									Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);
								}
							});
						}
					}
				});
			}
			else if(test.data.type == "multipleFile"){
				console.log("multipleFile");
				var a = Template.instance().data.id;
				console.log("a",a);
				var b = a.split(',');
				console.log("b",b);
				var fileData1 = [];
				for(var i=0; i<b.length;i++){
					var fileData = userFiles.find({
						"_id": b[i]
					});
					if(fileData.count() > 0)
					{
						fileData = userFiles.findOne({
							"_id": b[i]
						});
						fileData1.push(fileData);
						console.log("fileData if condition",fileData);
					}
					else
					{
						fileData = userReportFiles.find({
							"_id": b[i]
						});
						if(fileData.count() > 0)
						{
							fileData = userReportFiles.findOne({
								"_id": b[i]
							});
							fileData1.push(fileData);
						}
					}
				}	
				console.log("fileData1",fileData1);
				// return fileData1;
				Meteor.call("checkMultipleFileAlreadyExist", fileData1, destination, Meteor.userId(), function(err, res){
					if(err)
					{
						// alert("check Multiple File Already Exist Error");
						alert(err.reason);
					}
					else
					{
						// alert("checkMultipleFileAlreadyExist response");
						console.log("checkMultipleFileAlreadyExist res",res);
						Meteor.call("copyMultipleFile",fileData1, destination, Meteor.userId(), test.data.action, function(err1, res1){
							if(err1)
							{
								alert(err1.reason);
							}
							else
							{
								if(test.data.action == "copy")
								{
									alert("File was copied successfully.");
								}
								else
								{
									alert("File was moved successfully.");
								}
								var folderDetails = userFolders.findOne({
									"_id": destination
								});
								Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);
							}
						});
					}
				});
			}
			else
			{

				var fileData = userFolders.find({
					"_id": test.data.id
				});
				if(fileData.count() > 0)
				{
					fileData = userFolders.findOne({
						"_id": test.data.id
					});
				}
				
				/*Meteor.call("copyFolder",fileData._id, destination, test.data.action);
				var folderDetails = userFolders.findOne({
					"_id": destination
				});
				Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);*/
				Meteor.call("checkFolderAlreadyExist", fileData._id, destination, Meteor.userId(), function(err, res){
					if(err)
					{
						alert(err.reason);
					}
					else
					{
						console.log("resres", res);
						
						if(test.data.action == "move")
						{
							if(res)
							{
								$.confirm({
								    title: 'Confirmation',
								    content: 'Folder with same name already exist.',
								    buttons: {
								        replace: function () {
								            Meteor.call("copyFolder",fileData._id, destination, Meteor.userId(), test.data.action, 1, function(err1, res1){
												if(err1)
												{
													alert(err.reason);
												}
												else
												{
													if(test.data.action == "copy")
													{
														alert("Folder was copied successfully.");
													}
													else
													{
														alert("Folder was moved successfully.");
													}
													var folderDetails = userFolders.findOne({
														"_id": destination
													});
													Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);
												}
											});
								        },
										somethingelse: {
								            text: 'keep both',
								            action: function(){
								                Meteor.call("copyFolder",fileData._id, destination, Meteor.userId(), test.data.action, 0, function(err1, res1){
													if(err1)
													{
														alert(err.reason);
													}
													else
													{
														if(test.data.action == "copy")
														{
															alert("Folder was copied successfully.");
														}
														else
														{
															alert("Folder was moved successfully.");
														}
														var folderDetails = userFolders.findOne({
															"_id": destination
														});
														Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);
													}
												});
								            }
								        },
								        cancel: function () {},
								    }
								});
							}
							else
							{
								Meteor.call("copyFolder",fileData._id, destination, Meteor.userId(), test.data.action, 0, function(err1, res1){
									if(err1)
									{
										alert(err.reason);
									}
									else
									{
										if(test.data.action == "copy")
										{
											alert("Folder was copied successfully.");
										}
										else
										{
											alert("Folder was moved successfully.");
										}
										var folderDetails = userFolders.findOne({
											"_id": destination
										});
										Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);
									}
								});
							}
						}
						else
						{
							Meteor.call("copyFolder",fileData._id, destination, Meteor.userId(), test.data.action, function(err1, res1){
								if(err1)
								{
									alert(err.reason);
								}
								else
								{
									if(test.data.action == "copy")
									{
										alert("Folder was copied successfully.");
									}
									else
									{
										alert("Folder was moved successfully.");
									}
									var folderDetails = userFolders.findOne({
										"_id": destination
									});
									Router.go("/sub-folder/" + folderDetails.referenceId + "/" + folderDetails._id);
								}
							});
						}
					}
				});
			}
		}
	},
	'focus .copyto #contactTextBox': function(e)
	{
		Session.set("copytoid", Template.instance().data.id);
		Session.set("copytotype", Template.instance().data.type);
		Session.set("copytoaction", Template.instance().data.action);
		Session.set("selectContactProcess", 1);
		Router.go("/copytocontacts");
	},
	'focus .copyto #contactMasterFolderTextBox': function(e)
	{
		Session.set("copytoid", Template.instance().data.id);
		Session.set("copytotype", Template.instance().data.type);
		Session.set("copytoaction", Template.instance().data.action);
		Session.set("selectContactMasterFolderProcess", 1);
		if(typeof Session.get("selectedContactId") == "undefined")
		{
			Router.go("/copytocontactsmasterfolders/" + Meteor.userId());
		}
		else
		{
			Router.go("/copytocontactsmasterfolders/" + Session.get("selectedContactId"));
		}
		
	},
	'focus #contactMasterSubFolderTextBox': function(e)
	{
		Session.set("copytoid", Template.instance().data.id);
		Session.set("copytotype", Template.instance().data.type);
		Session.set("copytoaction", Template.instance().data.action);
		Session.set("selectContactMasterSubFolderProcess", 1);
		Router.go("/copytocontactsmastersubfolders/" + Session.get("selectedContactMasterFolderId"));
	},
	'click .active .dictation':function(e)
	{
		var elem = $(e.target);
		elem.parents(".textboxDiv").find("input[name='contactTextBox']").val('');
		Session.set("selectedContactId", undefined);
		elem.parents(".textboxDiv").find(".searchIcon.active img").attr("src", "/img/SearchGlyph.png");
		elem.parents(".textboxDiv").find(".searchIcon").removeClass("active");
		/*elem.parents(".textboxDiv").find(".micIcon.active img").attr("src", "/img/DictationGlyph.png");*/
		elem.parents(".textboxDiv").find(".micIcon").removeClass("active");
	},
	'click .addcontactdiv': function()
	{
		Router.go("/contact/new");
	},
	'click .copyto .backbuttontopnav button': function()
	{
		Router.go(appHistoryPull());
	},
});


Template.copytocontacts.onCreated(function(){
	Meteor.subscribe("getUserContacts", Meteor.userId());
});
Template.copytocontacts.onRendered(function(){
	searchCopyToContacts.set("");
});
Template.copytocontacts.helpers({
	getContactsList: function(){
		var searchVal = searchCopyToContacts.get();
		if($(".copytocontacts #contactTextBox").val() == "")
		{
			return userContacts.find({
				"userId": Meteor.userId()
			});
		}
		else
		{
			return userContacts.find({
				"userId": Meteor.userId(),
				"fullName": {
					$regex: new RegExp(searchVal, "i")
				}
			});
		}
	},
	isSelected: function(id)
	{
		var sessionId = Session.get("selectedContactId");
		if(sessionId !== undefined)
		{
			if(sessionId == id)
			{
				$("span.selectedContact").remove();
				var html = '<span class="selectedContact"><img src="/img/rightCirle.png" /></span>';
				return html;
			}
		}
	}
});
Template.copytocontacts.events({
	'click .addContactsButton': function()
	{
		
		Router.go("/contact/new");
	},
	'click .copytocontacts .backbuttontopnav button': function()
	{
		Session.set("selectContactProcess", 0);
		Router.go("/copyto/"+Session.get("copytotype")+"/"+Session.get("copytoid")+"/"+Session.get("copytoaction"));
	},
	'click .copytocontacts .doneButton': function()
	{
		Router.go("/copyto/"+Session.get("copytotype")+"/"+Session.get("copytoid")+"/"+Session.get("copytoaction"));
	},
	'click .selectedContact': function(e)
	{
		e.stopPropagation();
	},
	'click #clearTextBoxCopyToContacts img': function(e)
	{
		$(".copytocontacts #contactTextBox").val("");
		searchCopyToContacts.set("");
	},
	'keyup .copytocontacts #contactTextBox': function(e)
	{
		var val = $(e.target).val();
		searchCopyToContacts.set(val);
	},
	'click .contactItem': function(e)
	{
		var elem = $(e.target);
		var contactId = elem.attr("data-contactId");
		$("#selectedContactId").val(contactId);
		Session.set("selectedContactId",contactId);
		$("span.selectedContact").remove();
		elem.append('<span class="selectedContact"><img src="/img/rightCirle.png" /></span>');
	}
});


Template.copytocontactsmasterfolders.onCreated(function(){
	Meteor.subscribe("getUserFolders", Meteor.userId());
});
Template.copytocontactsmasterfolders.onRendered(function(){});
Template.copytocontactsmasterfolders.helpers({
	getContactsMasterFolderList: function(){
		var searchVal = searchCopyToMasterFolderContacts.get();
		if($(".copytocontactsmasterfolders #contactTextBox").val() == "")
		{
			var folderList = userFolders.find({
				"userId": Meteor.userId(),
				"referenceId": Template.instance().data.id,
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
			});
		}
		else
		{
			var folderList = userFolders.find({
				"userId": Meteor.userId(),
				"referenceId": Template.instance().data.id,
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
				"folderName": {
					$regex: new RegExp(searchVal, "i")
				}
			});
		}
		if(folderList.count() > 0)
		{
			folderList = folderList.fetch();
			return folderList;
		}
	},
	isSelected: function(id)
	{
		var sessionId = Session.get("selectedContactMasterFolderId");
		if(sessionId !== undefined)
		{
			if(sessionId == id)
			{
				$("span.selectedContact").remove();
				var html = '<span class="selectedContact"><img src="/img/rightCirle.png" /></span>';
				return html;
			}
		}
	}
});
Template.copytocontactsmasterfolders.events({
	'click .contactItem': function(e)
	{
		var elem = $(e.target);
		var contactId = elem.attr("data-contactMasterFolderId");
		$("#selectedContactMasterFolderId").val(contactId);
		Session.set("selectedContactMasterFolderId",contactId);
		$("span.selectedContact").remove();
		elem.append('<span class="selectedContact"><img src="/img/rightCirle.png" /></span>');
	},
	'click .copytocontactsmasterfolders .backbuttontopnav button': function()
	{
		Session.set("selectContactMasterFolderProcess", 0);
		Router.go("/copyto/"+Session.get("copytotype")+"/"+Session.get("copytoid")+"/"+Session.get("copytoaction"));
	},
	'click .copytocontactsmasterfolders .doneButton': function()
	{
		Router.go("/copyto/"+Session.get("copytotype")+"/"+Session.get("copytoid")+"/"+Session.get("copytoaction"));
	},
	'click .selectedContact': function(e)
	{
		e.stopPropagation();
	},
	'click .copytocontactsmasterfolders #clearTextBoxCopyToContacts img': function(e)
	{
		$(".copytocontactsmasterfolders #contactTextBox").val("");
		searchCopyToMasterFolderContacts.set("");
	},
	'keyup .copytocontactsmasterfolders #contactTextBox': function(e)
	{
		var val = $(e.target).val();
		searchCopyToMasterFolderContacts.set(val);
	}
});




Template.copytocontactsmastersubfolders.onCreated(function(){
	Meteor.subscribe("getUserFolders", Meteor.userId());
});
Template.copytocontactsmastersubfolders.onRendered(function(){});
Template.copytocontactsmastersubfolders.helpers({
	getContactsMasterSubFolderList: function(){
		var searchVal = searchCopyToMasterSubFolderContacts.get();
		if($(".copytocontactsmastersubfolders #contactTextBox").val() == "")
		{
			var folderList = userFolders.find({
				"userId": Meteor.userId(),
				"isDeleted": false,
				"parentId": Template.instance().data.id
			});
		}
		else
		{
			var folderList = userFolders.find({
				"userId": Meteor.userId(),
				"parentId": Template.instance().data.id,
				"isDeleted": false,
				"folderName": {
					$regex: new RegExp(searchVal, "i")
				}
			});
		}
		if(folderList.count() > 0)
		{
			folderList = folderList.fetch();
			return folderList;
		}
	},
	isSelected: function(id)
	{
		var sessionId = Session.get("selectedContactMasterSubFolderId");
		if(sessionId !== undefined)
		{
			if(sessionId == id)
			{
				$("span.selectedContact").remove();
				var html = '<span class="selectedContact"><img src="/img/rightCirle.png" /></span>';
				return html;
			}
		}
	}
});
Template.copytocontactsmastersubfolders.events({
	'click .contactItem': function(e)
	{
		var elem = $(e.target);
		var contactId = elem.attr("data-contactMasterSubFolderId");
		$("#selectedContactMasterSubFolderId").val(contactId);
		Session.set("selectedContactMasterSubFolderId",contactId);
		$("span.selectedContact").remove();
		elem.append('<span class="selectedContact"><img src="/img/rightCirle.png" /></span>');
	},
	'click .copytocontactsmastersubfolders .backbuttontopnav button': function()
	{
		Session.set("selectContactMasterSubFolderProcess", 0);
		Router.go("/copyto/"+Session.get("copytotype")+"/"+Session.get("copytoid")+"/"+Session.get("copytoaction"));
	},
	'click .copytocontactsmastersubfolders .doneButton': function()
	{
		Router.go("/copyto/"+Session.get("copytotype")+"/"+Session.get("copytoid")+"/"+Session.get("copytoaction"));
	},
	'click .selectedContact': function(e)
	{
		e.stopPropagation();
	},
	'click .copytocontactsmastersubfolders #clearTextBoxCopyToContacts img': function(e)
	{
		$(".copytocontactsmastersubfolders #contactTextBox").val("");
		searchCopyToMasterSubFolderContacts.set("");
	},
	'keyup .copytocontactsmastersubfolders #contactTextBox': function(e)
	{
		var val = $(e.target).val();
		searchCopyToMasterSubFolderContacts.set(val);
	}
});