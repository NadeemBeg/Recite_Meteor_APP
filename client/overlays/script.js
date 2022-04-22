import { saveAs } from 'file-saver';
var countDownloadFiles = 0;
var urlsDevice = [];
Template.createOverlay.onCreated(function(){
	Meteor.subscribe("getUserPlans", Meteor.userId());
	Meteor.subscribe("getFilesByUser", Meteor.userId());
    Meteor.subscribe("getReportFilesByUser", Meteor.userId());

});
Template.createOverlay.onRendered(function(){});
Template.createOverlay.helpers({
	'isDevice': function(){
		if(Meteor.isCordova)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
});
Template.selectFileOverlay.helpers({
	'isDevice': function(){
		if(Meteor.isCordova)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
});
var captureSuccess = function(mediaFiles) {
    var i, path, len;
    window.resolveLocalFileSystemURL(mediaFiles[0].localURL, function (fileEntry) {
    	fileEntry["type"] = "image/";

    	fileEntry.file(function (file) {
    		console.log("file",file);
    		var userId = Meteor.userId();
			/*$(".waitingOverlay .overlayBackground").toggle("fade");
			Cloudinary.upload(file, {"resouce_type":"image","folder":Session.get("fullFolderPathForCloudinary")}, function(err, res){

	        	if(err)
	        	{
	        		alert("Something went wrong.");
	        	}
	        	else
	        	{
	        		Meteor.call("saveFile", Meteor.userId(), res, file.name, file.type, Session.get("folderPath"), function(err1, res1){
		                if(err1)
		                {
		                    alert(err1.reason);
		                }
		                else
		                {
		                	alert("Files was uploaded successfully.");
		                	$(".waitingOverlay .overlayBackground").toggle("fade");
		                    //$(".createOverlay .overlayBackground").fadeOut();
		                    closeMenu("createOverlay");
		                }
		                
		            });
	        	}
	        	
	        });
			return;*/
			$(".waitingOverlay .overlayBackground").toggle("fade");
			var filesToUpload = [file];
			var size = 0; 

			if(filesToUpload.length > 0)
			{
				for(var i = 0; i < filesToUpload.length; i++)
				{
					var f = filesToUpload[i];
					size = f.size;
				}
				if(size > 0)
				{
					var storage = 0;
					var userDetails = Meteor.users.findOne({
				        "_id": Meteor.userId()
				    });
					var userPlanDetails = userPlans.find({
		                "userId": Meteor.userId(),
		                "isExpired": false
		            },{
		                $sort: {
		                    "recordDate": -1
		                }
		            });
		            if(userPlanDetails.count() > 0)
		            {
		                userPlanDetails = userPlans.findOne({
		                    "userId": Meteor.userId(),
		                    "isExpired": false
		                },{
		                    $sort: {
		                        "recordDate": -1
		                    }
		                });
		                if(userPlanDetails !== null)
		                {
		                	if(userPlanDetails.planType == "Monthly")
				            {
				                storage = 100000000000;
				            }
				            else
				            {
				                storage = 10000000000000000;
				            }
		                }
		                console.log(storage);
		                if(typeof userPlanDetails.planStartDate !== "undefined" && typeof userPlanDetails.planEndDate !== "undefined")
		        		{
		        			var fromRange = userPlanDetails.planStartDate;
		        			var toRange = userPlanDetails.planEndDate;
		        			fromRange.setHours(0);
				            fromRange.setMinutes(0);
				            fromRange.setSeconds(0);
				            toRange.setHours(23);
				            toRange.setMinutes(59);
				            toRange.setSeconds(59);
				            var userFilesdetails = userFiles.find({
		                        "userId": userId,
		                        "isDeleted": false,
		                        "dateCreated": {$gte: fromRange, $lte: toRange}
		                    }).fetch();
		                    var userReportFilesdetails = userReportFiles.find({
		                        "userId": userId,
		                        "isDeleted": false,
		                        "dateCreated": {$gte: fromRange, $lte: toRange}
		                    }).fetch();
		        		}
		        		else
		        		{
		        			var userFilesdetails = userFiles.find({
		                        "userId": userId,
		                        "isDeleted": false,
		                    }).fetch();
		                    var userReportFilesdetails = userReportFiles.find({
		                        "userId": userId,
		                        "isDeleted": false,
		                    }).fetch();
		        		}
		        		var merged = userFilesdetails.concat(userReportFilesdetails);
	                    var fsize = 0;
	                    for(var i = 0; i < merged.length; i++)
	                    {
	                        fsize += merged[i].fileSize;
	                    }
	                    var remaingingSize = storage - fsize;
			            if(remaingingSize >= size)
			            {
			                Cloudinary.upload(file, {"resouce_type":"image","folder":Session.get("fullFolderPathForCloudinary")}, function(err, res){

					        	if(err)
					        	{
					        		alert("Something went wrong.");
					        	}
					        	else
					        	{
					        		Meteor.call("saveFile", Meteor.userId(), res, file.name, file.type, Session.get("folderPath"), function(err1, res1){
						                if(err1)
						                {
						                    alert(err1.reason);
						                }
						                else
						                {
						                	alert("Files was uploaded successfully.");
						                	$(".waitingOverlay .overlayBackground").toggle("fade");
						                    //$(".createOverlay .overlayBackground").fadeOut();
						                    closeMenu("createOverlay");
						                }
						                
						            });
					        	}
					        	
					        });
			            }
			            else
			            {
			                alert("No space left. Please upgrade to upload new files.");
			                $(".waitingOverlay .overlayBackground").toggle("fade");
			            }
		            }
		            else
		            {
		            	storage = 2000000000;
		            	var userFilesdetails = userFiles.find({
	                        "userId": userId,
	                        "isDeleted": false
	                    }).fetch();
	                    var userReportFilesdetails = userReportFiles.find({
	                        "userId": userId,
	                        "isDeleted": false
	                    }).fetch();
	                    var merged = userFilesdetails.concat(userReportFilesdetails);
	                    var fsize = 0;
	                    for(var i = 0; i < merged.length; i++)
	                    {
	                        fsize += merged[i].fileSize;
	                    }
	                    console.log(storage);
	                    var remaingingSize = storage - fsize;
			            if(remaingingSize >= size)
			            {
			                Cloudinary.upload(file, {"resouce_type":"image","folder":Session.get("fullFolderPathForCloudinary")}, function(err, res){

					        	if(err)
					        	{
					        		alert("Something went wrong.");
					        	}
					        	else
					        	{
					        		Meteor.call("saveFile", Meteor.userId(), res, file.name, file.type, Session.get("folderPath"), function(err1, res1){
						                if(err1)
						                {
						                    alert(err1.reason);
						                }
						                else
						                {
						                	alert("Files was uploaded successfully.");
						                	$(".waitingOverlay .overlayBackground").toggle("fade");
						                    //$(".createOverlay .overlayBackground").fadeOut();
						                    closeMenu("createOverlay");
						                }
						                
						            });
					        	}
					        	
					        });
			            }
			            else
			            {
			                alert("No space left. Please upgrade to upload new files.");
			                $(".waitingOverlay .overlayBackground").toggle("fade");
			            }
		            }
		            return;
		            
	        		

				}
				else
				{
					$(".waitingOverlay .overlayBackground").toggle("fade");
				}
			}
    	});
    });
};

// capture error callback
var captureError = function(error) {
    console.log('Error code: ' + error.code, null, 'Capture Error');
};
Template.createOverlay.events({
	'click .overlayBackground': function(e)
	{
		var elem = $(e.target);
		if(elem.attr("class") == "overlayBackground") {
			//$(".createOverlay .overlayBackground").hide();
			closeMenu("createOverlay");
		}
	},
	'click .takePhotoButton': function(e)
	{
		navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
	},
	'click .uploadMediaButton': function(e)
	{
		$("#createOverlayFile").attr("accept","image/*,video/*");
		$("#createOverlayFile").click();
	},
	'click .uploadFileButton': function(e)
	{
		$("#createOverlayFile").attr("accept","");
		$("#createOverlayFile").click();
	},
	'click .createFolderButton': function(e)
	{
		//$(".createOverlay .overlayBackground").hide();
		closeMenu("createOverlay");
		appHistoryPush("/folder/new");
		Router.go("/folder/new");
	},
	'change #createOverlayFile': function(e)
	{
		//$(".createOverlay .overlayBackground").hide();
		var userId = Meteor.userId();
		closeMenu("createOverlay");
		$(".waitingOverlay .overlayBackground").toggle("fade");
		var elem = $(e.target);
		var filesToUpload = e.currentTarget.files;
		var size = 0; 

		if(filesToUpload.length > 0)
		{
			for(var i = 0; i < filesToUpload.length; i++)
			{
				var f = filesToUpload[i];
				size = f.size;
			}
			if(size > 0)
			{
				var storage = 0;
				var userDetails = Meteor.users.findOne({
			        "_id": Meteor.userId()
			    });
				var userPlanDetails = userPlans.find({
	                "userId": Meteor.userId(),
	                "isExpired": false
	            },{
	                $sort: {
	                    "recordDate": -1
	                }
	            });
	            if(userPlanDetails.count() > 0)
	            {
	                userPlanDetails = userPlans.findOne({
	                    "userId": Meteor.userId(),
	                    "isExpired": false
	                },{
	                    $sort: {
	                        "recordDate": -1
	                    }
	                });
	                if(userPlanDetails !== null)
	                {
	                	if(userPlanDetails.planType == "Monthly")
			            {
			                storage = 100000000000;
			            }
			            else
			            {
			                storage = 10000000000000000;
			            }
	                }
	            }
	            else
	            {
	            	storage = 2000000000
	            }
	            if(typeof userPlanDetails.planStartDate !== "undefined" && typeof userPlanDetails.planEndDate !== "undefined")
        		{
        			var fromRange = userPlanDetails.planStartDate;
        			var toRange = userPlanDetails.planEndDate;
        			fromRange.setHours(0);
		            fromRange.setMinutes(0);
		            fromRange.setSeconds(0);
		            toRange.setHours(23);
		            toRange.setMinutes(59);
		            toRange.setSeconds(59);

		            var userFilesdetails = userFiles.find({
                        "userId": userId,
                        "isDeleted": false,
                        "dateCreated": {$gte: fromRange, $lte: toRange}
                    }).fetch();
                    var userReportFilesdetails = userReportFiles.find({
                        "userId": userId,
                        "isDeleted": false,
                        "dateCreated": {$gte: fromRange, $lte: toRange}
                    }).fetch();
                    var merged = userFilesdetails.concat(userReportFilesdetails);
                    var fsize = 0;
                    for(var i = 0; i < merged.length; i++)
                    {
                        fsize += merged[i].fileSize;
                    }
                    var remaingingSize = storage - fsize;
		            if(remaingingSize >= size)
		            {
		                var a = getFolderPath(Session.get("folderPath"), [], Session.get("folderOwner"));
						var fullFolderPath = Session.get("fullFolderPath");
						if(filesToUpload.length > 0)
						{
							var counter = 0;
							recurrsiveFunc(filesToUpload[counter],filesToUpload,counter,function(){
								$(".waitingOverlay .overlayBackground").toggle("fade");
								setTimeout(function(){
									alert("Files was uploaded successfully.");
								},1000);
				                
							});
						}
						else
						{
							$(".waitingOverlay .overlayBackground").toggle("fade");
						}
		            }
		            else
		            {
		            	$(".waitingOverlay .overlayBackground").toggle("fade");
		                alert("No space left. Please upgrade to upload new files.");
		            }
        		}
        		else
        		{
        			var userFilesdetails = userFiles.find({
                        "userId": userId,
                        "isDeleted": false
                    }).fetch();
                    var userReportFilesdetails = userReportFiles.find({
                        "userId": userId,
                        "isDeleted": false
                    }).fetch();
                    var merged = userFilesdetails.concat(userReportFilesdetails);
                    var fsize = 0;
                    for(var i = 0; i < merged.length; i++)
                    {
                        fsize += merged[i].fileSize;
                    }
                    var remaingingSize = storage - fsize;
		            if(remaingingSize >= size)
		            {
		                var a = getFolderPath(Session.get("folderPath"), [], Session.get("folderOwner"));
						var fullFolderPath = Session.get("fullFolderPath");
						if(filesToUpload.length > 0)
						{
							var counter = 0;
							recurrsiveFunc(filesToUpload[counter],filesToUpload,counter,function(){
								$(".waitingOverlay .overlayBackground").toggle("fade");
				                alert("Files was uploaded successfully.");
							});
						}
						else
						{
							$(".waitingOverlay .overlayBackground").toggle("fade");
						}
		            }
		            else
		            {		                
		                $(".waitingOverlay .overlayBackground").toggle("fade");
		                alert("No space left. Please upgrade to upload new files.");
		            }
        		}

			}
			else
			{
				$(".waitingOverlay .overlayBackground").toggle("fade");
			}
		}
		return;
	}
});
var selectFileOverlayFile = [];
Template.selectFileOverlay.onRendered(function(){
	selectFileOverlay = [];
});
Template.selectFileOverlay.events({
	'click .overlayBackground': function(e)
	{
		var elem = $(e.target);
		if(elem.attr("class") == "overlayBackground") {
			console.log("Enter");
			//$(".selectFileOverlay .overlayBackground").hide();
			closeMenu("selectFileOverlay");
		}
	},
	'click .takePhotoButton': function(e)
	{
		navigator.device.capture.captureImage(function(mediaFiles) {
		    var i, path, len;
		    window.resolveLocalFileSystemURL(mediaFiles[0].localURL, function (fileEntry) {
		    	fileEntry["type"] = "image/";

		    	fileEntry.file(function (file) {
		    		selectFileOverlay = [];
		    		selectFileOverlay.push(file);
		    		var reader = new FileReader();
					reader.onloadend = function (event) {
						var a = event.target.result;
						if(Router.current().route._path == "/contact/new")
						{
							//$(".addnewcontact #profilePhotoPreview").attr("src", a);
							orientation(selectFileOverlay[0], function(base64img, value) {
								console.log("value", value);
				                // $('#placeholder1').attr('src', base64img);				                    
				                // console.log(rotation[value]);
				                var rotated = $(".addnewcontact #profilePhotoPreview").attr('src', base64img);
				                if(value) {
				                  rotated.css('transform', rotation[value]);
				                  console.log("test ndm");
				                  return rotated.css('transform', rotation[value]);
				                  // console.log("value",rotated.css('transform', rotation[value]));
				                }
				            });
							$(".addnewcontact #selectOverlayFileHiddenContact").val(file["localURL"]);
						}
						else if(Router.current().route._path == "/contact/edit/:_id")
						{
							//$(".addnewcontact #profilePhotoPreview").attr("src", a);
							orientation(selectFileOverlay[0], function(base64img, value) {
								console.log("value", value);
				                // $('#placeholder1').attr('src', base64img);				                    
				                // console.log(rotation[value]);
				                var rotated = $(".editcontact #profilePhotoPreview").attr('src', base64img);
				                if(value) {
				                  rotated.css('transform', rotation[value]);
				                  console.log("test ndm");
				                  return rotated.css('transform', rotation[value]);
				                  // console.log("value",rotated.css('transform', rotation[value]));
				                }
				            });
							$(".editcontact #selectOverlayFileHiddenContact").val(file["localURL"]);
						}
						else 
						{
							//$(".editprofilerecite img.profilePic").attr("src", a);
							orientation(selectFileOverlay[0], function(base64img, value) {
								console.log("value", value);
				                // $('#placeholder1').attr('src', base64img);				                    
				                // console.log(rotation[value]);
				                var rotated = $('.editprofilerecite img.profilePic').attr('src', base64img);
				                if(value) {
				                  rotated.css('transform', rotation[value]);
				                  console.log("test ndm");
				                  return rotated.css('transform', rotation[value]);
				                  // console.log("value",rotated.css('transform', rotation[value]));
				                }
				            });


							$("#selectOverlayFileHidden").val(file["localURL"]);
						}
						//$(".selectFileOverlay .overlayBackground").hide();
						closeMenu("selectFileOverlay");
					};
					reader.readAsDataURL(file);
		    	});
		    });
		}, captureError, {limit:1});
	},
	'click .uploadMediaButton': function(e)
	{
		if(Router.current().route._path == "/contact/new" || Router.current().route._path == "/contact/edit/:_id")
		{
			$("#profilePhotoFile").attr("accept","image/*");
			$("#profilePhotoFile").click();
		}
		else
		{
			$("#selectOverlayFile").attr("accept","image/*,video/*");
			$("#selectOverlayFile").click();
		}
	},
	'click .uploadFileButton': function(e)
	{
		if(Router.current().route._path == "/contact/new" || Router.current().route._path == "/contact/edit/:_id")
		{
			$("#profilePhotoFile").attr("accept","image/*");
			$("#profilePhotoFile").click();
		}
		else
		{
			$("#selectOverlayFile").attr("accept","image/*,video/*");
			$("#selectOverlayFile").click();
		}
	},
	
});
function recurrsiveFunc(fileRec, fileArr, counter, callback)
{
	if(fileRec.size <= 10000000)
	{
		//uploadeFileToCloudinary(fileRec, Meteor.userId())
		/*var folder = Meteor.userId();
		if(Session.get("folderPath") != "")
		{
			folder += "/" + Session.get("folderPath");
		}
		console.log("folder",folder);*/
		
		if(typeof Router.current().params._id1 == "undefined" && typeof Router.current().params._id == "undefined")
		{
			Session.set("fullFolderPathForCloudinary", "/" + Meteor.userId());
		}
		else
		{
			var a = getFolderPath(Router.current().params._id1, [], Router.current().params._id);
		}
		Cloudinary.upload(fileRec, { resource_type: "auto","folder":Session.get("fullFolderPathForCloudinary") }, function(err, res){
	        if(err)
	        {
	            console.log(err);
	            counter++;
				if(counter < fileArr.length)
				{
					recurrsiveFunc(fileArr[counter], fileArr, counter, callback);
				}
				else
				{
					callback();
				}
	        }
	        else
	        {
	            //console.log(res);
	            Meteor.call("saveFile", Meteor.userId(), res, fileRec.name, fileRec.type, Session.get("folderPath"), function(err1, res1){
	                if(err1)
	                {
	                    console.log(err1);
	                    counter++;
						if(counter < fileArr.length)
						{
							recurrsiveFunc(fileArr[counter], fileArr, counter, callback);
						}
						else
						{
							callback();
						}
	                }
	                else
	                {
	                    console.log(res1);
	                    counter++;
						if(counter < fileArr.length)
						{
							recurrsiveFunc(fileArr[counter], fileArr, counter, callback);
						}
						else
						{
							callback();
						}
	                }
	                
	            });
	        }
	    });
	}
	else
	{
		console.log("File size should be less than 10 MB.");
		counter++;
		if(counter < fileArr.length)
		{
			recurrsiveFunc(fileArr[counter], fileArr, counter, callback);
		}
		else
		{
			callback();
		}
	}
}
Template.tabs.onRendered(function(){
	setTimeout(function(){
		var currentPath = Router.current().route._path;
		if(currentPath == "/home")
		{
			$("#homeTab").addClass("activeTab");
			$("#homeTab").find("img").attr("src","/img/homeiconblue.png");
			$("#filesTab").find("img").attr("src","/img/filetabicon.png");
			$("#accountsTab").find("img").attr("src","/img/accounttabicon.png");
			$("#reportsTab").find("img").attr("src","/img/reportstabicon.png");
		}
		else if(currentPath == "/reports")
		{
			$("#reportsTab").addClass("activeTab");
			$("#reportsTab").find("img").attr("src","/img/reportIconBlue.png");
			$("#filesTab").find("img").attr("src","/img/filetabicon.png");
			$("#homeTab").find("img").attr("src","/img/homeicon.png");
			$("#accountsTab").find("img").attr("src","/img/accounttabicon.png");
		}
		else if(currentPath == "/filelistview")
		{
			$("#filesTab").addClass("activeTab");
			$("#filesTab").find("img").attr("src","/img/FolderIconBlue.png");
			$("#homeTab").find("img").attr("src","/img/homeicon.png");
			$("#accountsTab").find("img").attr("src","/img/accounttabicon.png");
			$("#reportsTab").find("img").attr("src","/img/reportstabicon.png");
		}
		else if(currentPath == "/accounts")
		{
			$("#accountsTab").addClass("activeTab");
			$("#accountsTab").find("img").attr("src","/img/accounttabiconblue.png");
			$("#filesTab").find("img").attr("src","/img/filetabicon.png");
			$("#homeTab").find("img").attr("src","/img/homeicon.png");
			$("#reportsTab").find("img").attr("src","/img/reportstabicon.png");
		}
	},1000);
});
Template.tabs.events({
	'click #uploadFileTab': function(e)
	{
		//$(".createOverlay .overlayBackground").fadeIn();
		openMenu("createOverlay");
	},
	'click #accountsTab': function(e)
	{
		appHistoryPush("/accounts");
		Router.go("/accounts");
	},
	'click #filesTab': function(e)
	{
		appHistoryPush("/filelistview");
		Router.go("/filelistview");
	},
	'click #homeTab': function(e)
	{
		appHistoryPush("/home");
		//Router.go("/folders/" + Meteor.userId());
		Router.go("/home");
	},
	'click #reportsTab': function(e)
	{
		appHistoryPush("/reports");
		//Router.go("/folders/" + Meteor.userId());
		Router.go("/reports");
		//Router.go("/home");
	}
});
Template.fileControlOverlay.onRendered(function(){
	$(".copytocontacts.filesForCopy").hide();
});
Template.fileControlOverlay.onCreated(function(){

});
Template.fileControlOverlay.helpers({
	checkRoot: function(){
		var path = Router.current().route._path;
		console.log("path",path); 
		if(path !== "/reports"){
			return true;
		}
		else{
			return false;
		}
	}
});
Template.fileControlOverlay.events({
	  'click .foldercontrolsoverlay.fileFilter #copyToLi': function(e)
	  {
	    e.preventDefault();
	    var id = $(e.target).attr("data-id");
	    appHistoryPush(Router.current().originalUrl);
	    var currentPath = Router.current().originalUrl;
	    Session.set("selectedContactId", undefined);
	    Session.set("selectedContactMasterFolderId", undefined);
	    Session.set("selectedContactMasterSubFolderId", undefined);
	    //Session.set("previousURLApp",currentPath);
	    appHistoryPush("/copyto/file/"+id + "/copy");
	    Router.go("/copyto/file/"+id + "/copy");
	    closeMenu("foldercontrolsoverlay.fileFilter");
	  },
	  'click .foldercontrolsoverlay.fileFilter #moveToLi': function(e)
	  {
	    e.preventDefault();
	    var id = $(e.target).attr("data-id");
	    var currentPath = Router.current().originalUrl;
	    //Session.set("previousURLApp",currentPath);
	    appHistoryPush("/copyto/file/"+id + "/move");
	    Router.go("/copyto/file/"+id + "/move");
	    closeMenu("foldercontrolsoverlay.fileFilter");
	  },
	  'click .foldercontrolsoverlay.fileFilter #showinfolderID': function(e)
	  {
	    e.preventDefault();
	    var id = $(e.target).attr("data-id");
	    var fileDetails = userFiles.findOne({
	      "_id": fileId
	    });
	    if(fileDetails !== null)
	    {
	    	if(typeof fileDetails.fileFolder !== "undefined")
	    	{
	    		if(fileDetails.fileFolder !== "")
	    		{
	    			appHistoryPush("/sub-folder/"+fileDetails.userId+"/"+fileDetails.fileFolder);
	    			Router.go("/sub-folder/"+fileDetails.userId+"/"+fileDetails.fileFolder);
	    		}
	    		else
	    		{
	    			alert("File is in root folder.");
	    		}
	    	}
	    	else
    		{
    			alert("File is in root folder.");
    		}
	    }
	    closeMenu("foldercontrolsoverlay.fileFilter");
	  },
	  'click .foldercontrolsoverlay.fileFilter #printLi': function(e)
	  {
	  	e.preventDefault();
	  	var id = $(e.target).attr("data-id");
	  	var fileDetails = userFiles.find({
	      "_id": id
	    });
	    if(fileDetails.count() > 0)
	    {
	    	fileDetails = userFiles.findOne({
		      "_id": id
		    });
		    if(fileDetails.resourceType == "image")
		    {
		    	var url1 = fileDetails.fileUrl;
		        console.log("urls ", url1);
		        var url = url1.replace("http://","https://"); 
		        console.log("fileDetails.fileUrl ", url);
		    	var html = "<img src='"+url+"' style='width:100%;height:auto;'/>";
		    	if(Meteor.isCordova)
		    	{
		    		cordova.plugins.printer.print(html);
		    	}
		    	else
		    	{
		    		toDataURL1(url,function(dataurl, filename){
						var w=window.open();
						w.document.write('<img src="'+dataurl+'" style="width:100%;height:auto;"/>');
						w.print();
						w.close();
					},fileDetails.fileName)
		    	}
		    	
		    }
	    }
	    else
	    {
	    	fileDetails = userReportFiles.find({
		      "_id": id
		    });
		    if(fileDetails.count() > 0)
		    {
		    	fileDetails = userReportFiles.findOne({
			      "_id": id
			    });
			    if(fileDetails.resourceType == "image")
			    {
			    	var url1 = fileDetails.fileUrl;
			        console.log("urls ", url1);
			        var url = url1.replace("http://","https://"); 
			        console.log("fileDetails.fileUrl ", url);

			    	var html = "<img src='"+url+"' style='width:100%;height:auto;'/>";
			    	if(Meteor.isCordova)
			    	{
			    		cordova.plugins.printer.print(html);
			    	}
			    	else
			    	{
			    		toDataURL1(url,function(dataurl, filename){
							var w = window.open();
							w.document.write('<img src="'+dataurl+'" style="width:100%;height:auto;"/>');
							w.print();
							w.close();
						},fileDetails.fileName);
			    	}
			    }
			    else
			    {
			    	alert("Something went wrong. Please try again later.");
			    }
		    }
	    }
	  },
	'click .foldercontrolsoverlay.fileFilter #shareFileLi': function(e)
	{
		console.log("sadfsadfasd");
		var elem = $(e.target);
		//$(".foldercontrolsoverlay .overlayBackground").hide();
		closeMenu("foldercontrolsoverlay.fileFilter");
		//$(".sendItemOverlay .overlayBackground").fadeIn();
		openMenu("sendItemOverlay");
		
    	var fileId = elem.attr("data-id");
    	console.log("fileId",fileId);
    	var fileDetails = userFiles.findOne({
	      "_id": fileId
	    });
	    console.log("fileDetailsfileDetails",fileDetails);
	    if(typeof fileDetails !== "undefined")
	    {
	    	var fileName = fileDetails.fileName;
	    }
	    else
	    {
	    	fileDetails = userReportFiles.findOne({
		      "_id": fileId
		    });
		    if(typeof fileDetails !== "undefined")
		    {
		    	var fileName = fileDetails.fileName;
		    }
	    }
	    console.log("fileName", fileName);
	    $(".sendItemOverlay .discoveryopposings").html(fileName);
	    $(".sendItemOverlay .discoveryopposings").attr("data-id", fileId);
	},
	'click #downloadFileLi': function(e)
	{
		
		closeMenu("foldercontrolsoverlay");
		var elem = $(".foldercontrolsoverlay.fileFilter");
		var fileId = elem.attr("data-id");
		console.log("fileId",fileId);
		var fileDetails = userFiles.find({
	      "_id": fileId
	    });
	    if(fileDetails.count() > 0)
	    {
	    	fileDetails = userFiles.findOne({
		      "_id": fileId
		    });
	    }
	    else
	    {
	    	fileDetails = userReportFiles.find({
		      "_id": fileId
		    });
		    if(fileDetails.count() > 0)
		    {
		    	fileDetails = userReportFiles.findOne({
			      "_id": fileId
			    });
		    }
	    }
	    var fileName = fileDetails.fileName;
	    var fileUrl = fileDetails.fileUrl;
	    console.log(fileUrl);
	    if(Meteor.isCordova)
	    {
	    	if(device.platform == "Android")
	    	{
	    		var a = cordova.file.externalRootDirectory;
	    	}
	    	else
	    	{
	    		var a = cordova.file.syncedDataDirectory;
	    	}
	    	var dl = new download();
	    	console.log("dl",dl);
				 function DownloaderError(err) {
				    console.log("download error: " + err);
				    alert("download error");
				}
				 
				function DownloaderSuccess() {
					
				    alert("File is downloaded successfully.");
				}
				dl.Initialize({
				    fileSystem : a,
				    folder: "Download",
				    unzip: false,
				    remove: false,
				    timeout: 0,
				    success: DownloaderSuccess,
				    error: DownloaderError,
				    
				});
				dl.Get(fileUrl);

	    	
	    }
	    else
	    {
	    	console.log("testest", fileUrl, fileName);
	    	toDataURL1(fileUrl, function(dataUrl, FileName) {
			  download(dataUrl,FileName);	
			},fileName)
	    }
	    
		
		/*var zip = new JSZip();
		console.log("zip", zip);
		var count = 0;
		console.log("count", count);
		var zipFilename = "zipFilename.zip";
		var urls = [
		  'http://res.cloudinary.com/dhkzhknae/image/upload/v1563973232/ebKLSB3vXPMrkgSJ8/F9y6gfkSftwmwgwNK/s88ecs9dywhnu7hgtaw6.jpg',
		  'http://res.cloudinary.com/dhkzhknae/image/upload/v1563968587/ebKLSB3vXPMrkgSJ8/6A58b7i8KkwDD85e6/eeTjtvfCpnSSXddtZ/xcBfzYY7jMkN4id4s/wubwxfmmdudiytxynatp.jpg'
		];
		console.log("urls", urls);
		urls.forEach(function(url){
		  var filename = parseInt(Math.random()*1000000000000)+".jpg";
		  // loading a file and add it in a zip file
		  console.log("JSZipUtils", JSZipUtils);
		  JSZipUtils.getBinaryContent(url, function (err, data) {
		     if(err) {
		        throw err; // or handle the error
		     }
		     zip.file(filename, data, {binary:true});
		     count++;
		     if (count == urls.length) {
		       zip.generateAsync({type:'blob'}).then(function(content) {
		       		console.log(content);
		       		console.log(saveAs);
		          saveAs(content, "testMukesh.zip");
		       });
		    }
		  });
		});*/
	},
	'click .overlayBackground': function(e)
	{
		var elem = $(e.target);
		if(elem.attr("class") == "overlayBackground") {
			//$(".foldercontrolsoverlay .overlayBackground").hide();
			closeMenu("foldercontrolsoverlay");
		}
	},
	'click #renameFileLi > a': function(e)
	{
		//$(".foldercontrolsoverlay .overlayBackground").hide();
		closeMenu("foldercontrolsoverlay");
	},
	'click #tagFileLi': function(e)
	{
		//$(".foldercontrolsoverlay .overlayBackground").hide();
		closeMenu("foldercontrolsoverlay");
		//$(".tagOverlay .overlayBackground").fadeIn();
		openMenu("tagOverlay");
	},
	'click #deleteFileLi': function(e)
	{
		var id = $(e.target).attr("data-id");
		var c = confirm("Are you sure you want to delete?");
		if(c)
		{

			if(Router.current().route._path == "/reports")
			{
				
				Meteor.call("deleteFileFromReports", id, function(err, res){
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
			else
			{
				
				Meteor.call("deleteFile", id, function(err, res){
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
		}
		//$(".foldercontrolsoverlay .overlayBackground").hide();
		closeMenu("foldercontrolsoverlay");
	},
	'click #fileStarLi': function(e)
	{
		var id = $("#fileStarLi").attr("data-id");
		var currentAction = $("#fileStarLi").attr("data-status");
		Meteor.call("markFileAsStarred", Meteor.userId(), id, !currentAction, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				if(currentAction == "true")
				{
					$("#fileStarLi").attr("data-status", "false");
					$("#fileStarLi").find("img").attr("src","/img/StarBlackIcon.png");
					$("#fileStarLi").find("img").next().html("Add to Starred");
					$("#fileStarLi").find("img").next().removeClass("activeClass");
				}
				else
				{
					$("#fileStarLi").attr("data-status", "true");
					$("#fileStarLi").find("img").attr("src","/img/StarBlueIcon.png");
					$("#fileStarLi").find("img").next().html("Starred File");
					$("#fileStarLi").find("img").next().addClass("activeClass");
				}
			}
		});
	},
	'error .fileFolderName > .shape.main': function(e){
		var elem = $(e.target);
		elem.attr("src", "/fileIcons/other.png");
	},
	'click #addToReportLi': function(e)
	{
		e.preventDefault();
		var elem = $(e.target);
		var fileId = $("#addToReportLi").attr("data-id");
		var status = $("#addToReportLi").attr("data-status");
		console.log("status", status);
		if(status == "true")
		{
			Meteor.call("removeFileFromReportFolder", fileId, Meteor.userId(), function(err, res){
				if(err)
				{
					closeMenu("foldercontrolsoverlay");
					alert(err.reason);
				}
				else
				{
					closeMenu("foldercontrolsoverlay");
					setTimeout(function(){
						alert("File was removed from report folder.");
					},1000);
				}
			});
		}
		else
		{
			Meteor.call("addFileToReportFolder", fileId, Meteor.userId(), function(err, res){
				if(err)
				{
					closeMenu("foldercontrolsoverlay");
					alert(err.reason);
				}
				else
				{
					closeMenu("foldercontrolsoverlay");
					setTimeout(function(){
						alert("File was added to report folder.");
					},1000);
				}
			});
		}
	},
	'click .foldercontrolsoverlay.fileFilter #showFolder': function(e)
	 {
		e.preventDefault();
		var id = $(e.target).attr("data-id");
		var fileDetails = userFiles.findOne({
		 "_id": id
		});
	    if(fileDetails !== null)
		{
			if(typeof fileDetails.fileFolder !== "undefined")
			{
				if(fileDetails.fileFolder !== "")
				{
					Meteor.subscribe("getUserFolders",fileDetails.userId);
					var folderDetails = userFolders.findOne({
						"_id": fileDetails.fileFolder
					});
					appHistoryPush("/sub-folder/"+folderDetails.referenceId+"/"+fileDetails.fileFolder);
					Router.go("/sub-folder/"+folderDetails.referenceId+"/"+fileDetails.fileFolder);
				}
				else
				{
					alert("File is in root folder.");
				}
			}
			else
			{
				alert("File is in root folder.");
			}
		}
	   closeMenu("foldercontrolsoverlay.fileFilter");
	 },
});
Template.filterOptionsOverlay.events({
	'click .overlayBackground': function(e)
	{
		var elem = $(e.target);
		if(elem.attr("class") == "overlayBackground") {
			//$(".filteroptionslistoverlay .overlayBackground").hide();
			closeMenu("filteroptionslistoverlay");
		}
	},
	'click .listByModifiedDate': function(){
		Session.set("FileSortingValue", "dateModified");
		//$(".filteroptionslistoverlay .overlayBackground").fadeOut();
		closeMenu("filteroptionslistoverlay");
		$(".size.filterButtonFileListing").html("Date Modified");
	},
	'click .listByName': function(){
		Session.set("FileSortingValue", "fileName");
		//$(".filteroptionslistoverlay .overlayBackground").fadeOut();
		closeMenu("filteroptionslistoverlay");
		$(".size.filterButtonFileListing").html("Name");
	},
	'click .listBySize': function(){
		Session.set("FileSortingValue", "fileSize");
		//$(".filteroptionslistoverlay .overlayBackground").fadeOut();
		closeMenu("filteroptionslistoverlay");
		$(".size.filterButtonFileListing").html("Size");
	},
	'click .listByUploadDate': function(){
		Session.set("FileSortingValue", "dateCreated");
		//$(".filteroptionslistoverlay .overlayBackground").fadeOut();
		closeMenu("filteroptionslistoverlay");
		$(".size.filterButtonFileListing").html("Upload Date");
	},
	'click .listByType': function(){
		Session.set("FileSortingValue", "fileFormat");
		//$(".filteroptionslistoverlay .overlayBackground").fadeOut();
		closeMenu("filteroptionslistoverlay");
		$(".size.filterButtonFileListing").html("Type");
	}
});
Template.tagOverlay.onRendered(function(){
	String.prototype.trim = (function (trim) {
    if (!trim) // polyfill if not included in browser
        trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    else if (trim.call('.', '.') === '') // already supports this
        return trim;
    return function (chars) {
        if (!chars) return trim.call(this);
        chars = chars.replace(/([\^\\\]-])/g, '\\$1');
        return this.replace(new RegExp('^['+chars+']+|['+chars+']+$', 'g'), '');
    }
}(String.prototype.trim));

});
Template.tagOverlay.events({
	'click .childDiv': function(e){
		e.preventDefault();
		var elem = $(e.target);
		var parents = $(".parentDiv");
		parents.each(function(key, val){
			var a = $(val);
			if(a.hasClass("active")){
				a.removeClass("active");
			}
		});
		elem.parent().addClass("active");
		$("#colorName").val(elem.attr("data-color"));
		/**/
	},
	'click #addTagSaveButton': function(e){
		e.preventDefault();
		var currentPath = Router.current().route._path;
		if(currentPath == "/contact/new" || currentPath == "/contact/edit/:_id")
		{
			var colorName = $("#colorName").val();
			var tagName = $("#tagTextBox").val().trim(",");
			if(tagName == null || tagName == "")
			{
				alert("Please add valid tags to continue.");
				return;
			}
			if(colorName == null || colorName == "")
			{
				alert("Please select color to continue.");
				return;
			}
			tagName = tagName.split(",");
			var marge = []; //tagName+"_"+colorName;
			for(var i = 0; i < tagName.length; i++)
			{
				marge[i] = tagName[i] + "_" + colorName;
			}
			console.log("marge",marge);
			var oldTagNamesValue = $("#tagNames").val().trim();
			if(oldTagNamesValue == "")
			{
				var tags = [];
			}
			else
			{
				var tags = oldTagNamesValue.split(",");
			}
			console.log("tags", tags);
			if(marge.length > 0)
			{ 
				console.log("234 marge",marge);
				for(var j = 0; j < marge.length; j++)
				{
					if(tags.indexOf(marge[j]) < 0)
					{
						console.log("tags marge",marge);
						tags.push(marge[j]);
						console.log("tags marge final",tags);
						// var tags1 = tags.split("_");
						var a = marge[j].split("_");
						if(a[0].trim() !== "" && a[0].trim() !== null){
							console.log("a[0]",a);
							$(".tagsUL").append('<li><div class="tag"><p class="left"style="color:#'+a[1]+'" data-color="'+a[1]+'">'+a[0]+'</p><p class="right deleteButton">X</p></div></li>');
						}
						else{
							alert("Please enter tag name.");
						}
						
					}
				}
				
			}
			$("#tagNames").val(tags.toString());
			$("#tagTextBox").val("");
			$("#colorName").val("");
			$(".parentDiv.active").removeClass("active");
			closeMenu("tagOverlay");
		}
		else{
			var colorName = $("#colorName").val();
			var tagsArr = $("#tagTextBox").val();
			tagsArr = tagsArr.split(",");
			var userId = Meteor.userId();
			var fileType = "file";
			var currentPath = Router.current().route._path;
			if(currentPath == "/clientfile/:_id")
			{
				console.log("1", Router.current().params);
				var fileId = [Router.current().params._id];
				console.log(fileId);
			}
			else if(currentPath == "/sub-folder/:_id/:_id1")
			{
				fileType = "folder";
				var fileId = [Router.current().params._id];
			}
			else if(currentPath == "/reports-select")
			{
				var ids = $("#selectReportFilesIds").val();
				ids = ids.split(",");
				var fileId = ids;
			}
			else if(currentPath == "/filelistview/select")
			{
				var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
				var fileId = [];
				selectedFiles.each(function(key, val){
					var elem = $(val);
					var id = elem.attr("data-id");
					fileId.push(id);
				});
			}
			else
			{
				var fileId = [$("#tagFileLi").attr("data-id")];
			}
			var arr = [];
			console.log("fileId", fileId);
			for(var i = 0; i < fileId.length; i++)
			{
				var createdDate = new Date();
				for(var j = 0; j < tagsArr.length; j++)
				{
					var data = {
						"resourceType": fileType,
						"resourceId": fileId[i],
						"userId": userId,
						"tagText": tagsArr[j],
						"tagColor": $("#colorName").val(),
						"dateCreated": createdDate
					};
					arr.push(data);
				}
			}
			Meteor.call("addTag", arr, function(err, res){
				if(err)
				{
					
					if(err.reason == "Tag text is required in taggedfiles insert"){
						alert("Tag text is required");
					}
					else if(err.reason == "Tag color is required in taggedfiles insert"){
						alert("Tag color is required");
					}
					else{
						console.log("err.reason",err.reason);
						// alert(err.reason);
					}
					// console.log("err.reason",err.reason);
				}
				else
				{
					alert("Tag was added successfully.");
					//$(".tagOverlay .overlayBackground").fadeOut();
					$("#tagTextBox").val("");
					$("#colorName").val("");
					$(".parentDiv.active").removeClass("active");
					closeMenu("tagOverlay");
				}
			});
		}
		
	},
	'click #addTagCancelButton': function(e){
		e.preventDefault();
		//$(".tagOverlay .overlayBackground").fadeOut();
		closeMenu("tagOverlay");
	}
});

Template.multipleSelectFileOptionsOverlay.events({
	'click #multipleDownloadDiv': function(e)
	{
		e.preventDefault();
		var currentPath = Router.current().route._path;
		if(currentPath == "/reports-select")
		{
			var ids = $("#selectReportFilesIds").val();
			ids = ids.split(",");
		}
		else
		{
			var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
			var ids = [];
			selectedFiles.each(function(key, val){
				var elem = $(val);
				var id = elem.attr("data-id");
				ids.push(id);
			});
		}
		
		if(ids.length > 0)
		{
			var urls = [];
			urlsDevice = [];
			var fileDetail = userFiles.find({
				"_id": {
					$in: ids
				}
			});
			if(fileDetail.count() > 0)
			{
				fileDetail = fileDetail.fetch();
				for(var i = 0; i < fileDetail.length; i++)
				{
					urls.push(fileDetail[i].fileUrl);
					urlsDevice.push({
						"url": fileDetail[i].fileUrl
					})
				}
			}
			console.log(urlsDevice);
			closeMenu("multipleSelectFileOptionsOverlay");
			$(".waitingOverlay .overlayBackground").toggle("fade");
			if(Meteor.isCordova)
			{
				if(device.platform == "Android")
		    	{
		    		var a = cordova.file.externalRootDirectory;
		    	}
		    	else
		    	{
		    		var a = cordova.file.syncedDataDirectory;
		    	}
				Session.set("selectedFilesToDownload", urlsDevice.length);
				var currentDate = new Date();
				var folderName = "Recite_App_" + currentDate.getDate().toString() + currentDate.getMonth().toString() + currentDate.getFullYear().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString();
				
				console.log("downloader.isInitialized()", downloader.isInitialized());
			    if (!downloader.isInitialized()) { // Not initialized?
				  document.addEventListener("DOWNLOADER_initialized", function onInitialized(event) { //wait for it
				    console.log("event", event);
				    

				    event.target.removeEventListener("DOWNLOADER_initialized", onInitialized, false); //remove listener
				    
				  }, false);
				  downloader.init({folder: "Download/"+folderName, unzip: true, fileSystem: a});
					downloader.getMultipleFiles(urlsDevice);
					
				  return;
				}

			    
				
				

				/*countDownloadFiles = 0;
				recurrsiveDownloadFile(urls, urls[count], countDownloadFiles, folderName, function(){
					alert("Files were downloaded successfully.");
				});*/
			}
			else
			{
				var zip = new JSZip();
				var count = 0;
				var currentDate = new Date();
				var folderName = "Recite_App_" + currentDate.getDate().toString() + currentDate.getMonth().toString() + currentDate.getFullYear().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString();
				var zipFilename = folderName + ".zip";
				urls.forEach(function(url){
				  var filename = parseInt(Math.random()*1000000000000)+".jpg";
				  // loading a file and add it in a zip file
				  console.log("JSZipUtils", JSZipUtils);
				  JSZipUtils.getBinaryContent(url, function (err, data) {
				     if(err) {
				        throw err; // or handle the error
				     }
				     zip.file(filename, data, {binary:true});
				     count++;
				     if (count == urls.length) {
				     	console.log("zip", zip);
				       zip.generateAsync({type:'blob'}).then(function(content) {
				       		console.log("content", content);
				       		$(".waitingOverlay .overlayBackground").toggle("fade");
				          	saveAs(content, zipFilename);
				       });
				    }
				  });
				});
			}
		}
	},
	'click #multipleExportDiv': function(e)
	{
		e.preventDefault();
		var currentPath = Router.current().route._path;
		if(currentPath == "/reports-select")
		{
			var ids = $("#selectReportFilesIds").val();
			ids = ids.split(",");
		}
		else
		{
			var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
			var ids = [];
			selectedFiles.each(function(key, val){
				var elem = $(val);
				var id = elem.attr("data-id");
				ids.push(id);
			});
		}
		if(ids.length > 0)
		{
			var urls = [];
			urlsDevice = [];
			var fileDetail = userFiles.find({
				"_id": {
					$in: ids
				}
			});
			if(fileDetail.count() > 0)
			{
				fileDetail = fileDetail.fetch();
				for(var i = 0; i < fileDetail.length; i++)
				{
					urls.push(fileDetail[i].fileUrl);
					urlsDevice.push({
						"url": fileDetail[i].fileUrl
					})
				}
			}
			console.log(urlsDevice);
			closeMenu("multipleSelectFileOptionsOverlay");
			$(".waitingOverlay .overlayBackground").toggle("fade");
			if(Meteor.isCordova)
			{
				if(device.platform == "Android")
		    	{
		    		var a = cordova.file.externalRootDirectory;
		    	}
		    	else
		    	{
		    		var a = cordova.file.syncedDataDirectory;
		    	}
				Session.set("selectedFilesToDownload", urlsDevice.length);
				var currentDate = new Date();
				var folderName = "Recite_App_" + currentDate.getDate().toString() + currentDate.getMonth().toString() + currentDate.getFullYear().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString();
				
				console.log("downloader.isInitialized()", downloader.isInitialized());
			    if (!downloader.isInitialized()) { // Not initialized?
				  document.addEventListener("DOWNLOADER_initialized", function onInitialized(event) { //wait for it
				    console.log("event", event);
				    

				    event.target.removeEventListener("DOWNLOADER_initialized", onInitialized, false); //remove listener
				    
				  }, false);
				  
				  downloader.init({folder: "Download/"+folderName, unzip: true, fileSystem: a});
					downloader.getMultipleFiles(urlsDevice);
					
				  return;
				}

			    
				
				

				/*countDownloadFiles = 0;
				recurrsiveDownloadFile(urls, urls[count], countDownloadFiles, folderName, function(){
					alert("Files were downloaded successfully.");
				});*/
			}
			else
			{
				var zip = new JSZip();
				var count = 0;
				var currentDate = new Date();
				var folderName = "Recite_App_" + currentDate.getDate().toString() + currentDate.getMonth().toString() + currentDate.getFullYear().toString() + currentDate.getHours().toString() + currentDate.getMinutes().toString() + currentDate.getSeconds().toString();
				var zipFilename = folderName + ".zip";
				urls.forEach(function(url){
				  var filename = parseInt(Math.random()*1000000000000)+".jpg";
				  // loading a file and add it in a zip file
				  console.log("JSZipUtils", JSZipUtils);
				  JSZipUtils.getBinaryContent(url, function (err, data) {
				     if(err) {
				        throw err; // or handle the error
				     }
				     zip.file(filename, data, {binary:true});
				     count++;
				     if (count == urls.length) {
				     	console.log("zip", zip);
				       zip.generateAsync({type:'blob'}).then(function(content) {
				       		console.log("content", content);
				       		$(".waitingOverlay .overlayBackground").toggle("fade");
				          	saveAs(content, zipFilename);
				       });
				    }
				  });
				});
			}
		}
	},
	'click .copyFiles':function(e){
		var currentPath = Router.current().route._path;
		if(currentPath == "/reports-select")
		{
			var ids = $("#selectReportFilesIds").val();
			ids = ids.split(",");
		}
		else
		{
			var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
			var ids = [];
			selectedFiles.each(function(key, val){
				var elem = $(val);
				var id = elem.attr("data-id");
				ids.push(id);
			});
		}
		
		console.log("ids",ids);
		appHistoryPush("/copyto/multipleFile/"+ids.toString()+"/copy");
		Router.go("/copyto/multipleFile/"+ids.toString()+"/copy")
	},
	'click .moveFiles':function(e){
		var currentPath = Router.current().route._path;
		if(currentPath == "/reports-select")
		{
			var ids = $("#selectReportFilesIds").val();
			ids = ids.split(",");
		}
		else
		{
			var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
			var ids = [];
			selectedFiles.each(function(key, val){
				var elem = $(val);
				var id = elem.attr("data-id");
				ids.push(id);
			});
		}
		console.log("ids",ids);
		appHistoryPush("/copyto/multipleFile/"+ids.toString()+"/move");
		Router.go("/copyto/multipleFile/"+ids.toString()+"/move")
	},
	'click .overlayBackground': function(e)
	{
		e.preventDefault();
		var elem = $(e.target);
		if(elem.attr("class") == "overlayBackground") {
			//$(".multipleSelectFileOptionsOverlay .overlayBackground").hide();
			closeMenu("multipleSelectFileOptionsOverlay");
		}
	},
	'click #deleteMultipleButton': function(e)
	{
		var currentPath = Router.current().route._path;
		var c = confirm("Are you sure you want to delete selected files?");
		if(currentPath == "/reports-select")
		{
			var ids = $("#selectReportFilesIds").val();
			ids = ids.split(",");
		}
		else
		{
			var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
			var ids = [];
			selectedFiles.each(function(key, val){
				var elem = $(val);
				var id = elem.attr("data-id");
				ids.push(id);
			});
		}
		if(ids.length > 0)
		{
			if(c)
			{
				Meteor.call("deleteFileMultiple", ids, function(err, res){
					if(err)
					{
						alert(err.reason);
					}
					else
					{
						alert("Files was deleted successfully.");
					}
				});
			}
			//$(".multipleSelectFileOptionsOverlay .overlayBackground").hide();
			closeMenu("multipleSelectFileOptionsOverlay");

			Router.go("/filelistview");
		}
		else
		{
			alert("Please select atleast one file to continue.");
			return;
		}
		
	},
	'click #printMultipleFiles': function(e)
	{
		e.preventDefault();
		console.log("1");
		closeMenu("foldercontrolsoverlay.options");
		$(".waitingOverlay .overlayBackground").toggle("fade");

		var currentPath = Router.current().route._path;
		if(currentPath == "/reports-select")
		{
			var ids = $("#selectReportFilesIds").val();
			ids = ids.split(",");
		}
		else
		{
			var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
			var ids = [];
			selectedFiles.each(function(key, val){
				var elem = $(val);
				var id = elem.attr("data-id");
				ids.push(id);
			});
		}
		var html = "";
		if(ids.length > 0)
		{
			for(var i = 0; i < ids.length; i++)
			{
				var fileDetails = userFiles.find({
			      "_id": ids[i]
			    });
			    if(fileDetails.count() > 0)
			    {
			    	fileDetails = userFiles.findOne({
				      "_id": ids[i]
				    });
				    if(fileDetails.resourceType == "image")
				    {
				    	var url1 = fileDetails.fileUrl;
				        console.log("urls ", url1);
				        var url = url1.replace("http://","https://"); 
				        console.log("fileDetails.fileUrl ", url);
				    	if(Meteor.isCordova)
				    	{
				    		html += "<img src='"+url+"' style='width:100%;height:auto;'/>";
				    	}
				    	else
				    	{
				    		toDataURL1(url,function(dataurl, filename){
								html += '<img src="'+dataurl+'" style="width:100%;height:auto;"/>';
							},fileDetails.fileName);
				    	}
				    	
				    }
			    }
			    else
			    {
			    	fileDetails = userReportFiles.find({
				      "_id": ids[i]
				    });
				    if(fileDetails.count() > 0)
				    {
				    	fileDetails = userReportFiles.findOne({
					      "_id": ids[i]
					    });
					    if(fileDetails.resourceType == "image")
					    {
					    	var url1 = fileDetails.fileUrl;
					        console.log("urls ", url1);
					        var url = url1.replace("http://","https://"); 
					        console.log("fileDetails.fileUrl ", url);
					    	if(Meteor.isCordova)
					    	{
					    		html += "<img src='"+url+"' style='width:100%;height:auto;'/>";
					    	}
					    	else
					    	{
					    		toDataURL1(url,function(dataurl, filename){
									html += '<img src="'+dataurl+'" style="width:100%;height:auto;"/>';
								},fileDetails.fileName);
					    	}
					    }
				    }
			    }
			}
			setTimeout(function(){
				if(html != "")
				{
					if(Meteor.isCordova)
					{
						console.log("2");
						$(".waitingOverlay .overlayBackground").toggle("fade");
						cordova.plugins.printer.print(html);

					}
					else
					{
						console.log("3");
						$(".waitingOverlay .overlayBackground").toggle("fade");	
						var w = window.open();
						w.document.write(html);
						setTimeout(function(){
							w.print();
							w.close();
							
						},1000);
					}
				}
				console.log("4");
				// $(".waitingOverlay .overlayBackground").toggle("fade");
			},5000);
			// $(".waitingOverlay .overlayBackground").toggle("fade");
		}
		else{
			console.log("5");
			$(".waitingOverlay .overlayBackground").toggle("fade");
		}
	},
	'click #addTagMultiple': function(e)
	{
		//$(".multipleSelectFileOptionsOverlay .overlayBackground").hide();
		closeMenu("multipleSelectFileOptionsOverlay");
		//$(".tagOverlay .overlayBackground").fadeIn();
		openMenu("tagOverlay");
	},
	'click #addStarMultiple': function(){
		var currentPath = Router.current().route._path;
		if(currentPath == "/reports-select")
		{
			var ids = $("#selectReportFilesIds").val();
			ids = ids.split(",");
		}
		else
		{
			var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
			var ids = [];
			selectedFiles.each(function(key, val){
				var elem = $(val);
				var id = elem.attr("data-id");
				ids.push(id);
			});
		}
		
		Meteor.call("markFileAsStarredMultiple", Meteor.userId(), ids, true, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				alert("Files was added to starred successfully.");
			}
		});
		//$(".multipleSelectFileOptionsOverlay .overlayBackground").hide();
		closeMenu("multipleSelectFileOptionsOverlay");
		Router.go("/filelistview");
	},
	'click #shareFileMultiple': function(e)
	{
		e.preventDefault();
		$(".multipleSelectFileOptionsOverlay .overlayBackground").hide();
		var currentPath = Router.current().route._path;
		if(currentPath == "/reports-select")
		{
			var ids = $("#selectReportFilesIds").val();
			ids = ids.split(",");
			var selectedFiles = ids;
		}
		else
		{
			var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
		}
		closeMenu("multipleSelectFileOptionsOverlay");
		//$(".sendItemOverlay .overlayBackground").fadeIn();
		openMenu("sendItemOverlay");
		$(".sendItemOverlay .discoveryopposings").html(selectedFiles.length + " File(s)");
	}
});
Template.sendItemOverlay.onCreated(function(){
	Meteor.subscribe("getUserContacts", Meteor.userId(), function(){
		function formatState (state) {
	  
	  if(state.text == "")
	  {
	  	return false;
	  }
	  if (!state.id) {
	    return state.text;
	  }
	  var $state = $(
	    '<span class="optionTextSelect2">' + state.text + '</span>'
	  );
	  setTimeout(function(){
	  	$(".select2-selection__choice").each(function(key,val){
			var elem = $(val);
			var isAvaliable = elem.find(".optionTextSelect2").length;
			if(isAvaliable == 0)
			{
				elem.remove();
			}
		});
	  },100);
	  return $state;
	};
	$('.select2-dropdown').select2({
		tags:true,
		multiple:true,
		placeholder:"Email or Name",
		class: "sendToTextBox",
		tokenSeparators: [',', ' '],
		templateSelection: formatState
	});
	setTimeout(function(){
		var contacts =  userContacts.find({
							"userId": Meteor.userId()
						}).fetch();
		if(contacts.length > 0)
		{
			var optionsHTML = "";
			for(var i = 0; i < contacts.length; i++)
			{
				if(typeof contacts[i].personalEmail !== "undefined")
				{
					if(contacts[i].personalEmail !== "")
					{
						optionsHTML += '<option value="'+ contacts[i]._id + "_personal" +'">'+ contacts[i].fullName +' ('+ contacts[i].personalEmail +')</option>'
					}
				}
				if(typeof contacts[i].workEmail !== "undefined")
				{
					if(contacts[i].workEmail !== "")
					{
						optionsHTML += '<option value="'+ contacts[i]._id + "_work" +'">'+ contacts[i].fullName +' ('+ contacts[i].workEmail +')</option>'
					}
				}
			}
			$('.select2-dropdown').html(optionsHTML)
		}
	},500);
	});
});
Template.sendItemOverlay.onRendered(function(){

	
	
});
Template.sendItemOverlay.events({
	'click #cancelSendItemButton': function(e)
	{
		//$(".sendItemOverlay .overlayBackground").hide();
		closeMenu("sendItemOverlay");
	},
	'click .overlayBackground': function(e)
	{
		var elem = $(e.target);
		if(elem.attr("class") == "overlayBackground") {
			//$(".sendItemOverlay .overlayBackground").hide();
			closeMenu("sendItemOverlay");
		}
	},
	'click .sendToSubmitButton': function(e)
	{
		e.preventDefault();
		var sendTo = $('.select2-dropdown').val();
		console.log("test ndm");
		if(sendTo == null){
			alert("Please Enter email or name.");
			return;
		}
		var finalEmails = [];
		for(var i = 0; i < sendTo.length; i++)
		{
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sendTo[i]))
			{
				finalEmails.push(sendTo[i]);
			}
			else
			{
				var splittedIds = sendTo[i].split("_");
				var contactDetails = userContacts.find({
					"_id": splittedIds[0]
				});
				if(contactDetails.count() > 0)
				{
					contactDetails = contactDetails = userContacts.findOne({
						"_id": splittedIds[0]
					});
					if(splittedIds[1] == "personal")
					{
						if(typeof contactDetails.personalEmail !== "undefined")
						{
							if(contactDetails.personalEmail !== "")
							{
								finalEmails.push(contactDetails.personalEmail);
							}
						}
					}
					else
					{
						if(typeof contactDetails.workEmail !== "undefined")
						{
							if(contactDetails.workEmail !== "")
							{
								finalEmails.push(contactDetails.workEmail);
							}
						}
					}
				}
			}
		}
		var validation = validateMultipleEmail(finalEmails);
		console.log("vaildation",validation);
		var resultValidation = validation.result;
		if(resultValidation == false){
			alert(validation.message);
		}
		else{
			var viewCheckbox = $("#viewCheckbox").is(":checked");
			var editCheckbox = $("#editCheckbox").is(":checked");
			var messageTextArea = $("#messageTextArea").val();
			var currentPath = Router.current().route._path;
			var isFolder = 0;
			if(currentPath == "/filelistview/select")
			{
				var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
				var ids = [];
				selectedFiles.each(function(key, val){
					var elem = $(val);
					var id = elem.attr("data-id");
					ids.push(id);
				});
				var fileId = ids;
			}
			else if(currentPath == "/reports-select")
			{
				var ids = $("#selectReportFilesIds").val();
				ids = ids.split(",");
				var fileId = ids;
			}
			else if(currentPath == "/sub-folder/:_id/:_id1" || currentPath == "/reports" || currentPath == "/folders/:_id")
			{
				isFolder = 0;
				var fileIdd = $(".discoveryopposings").attr("data-id");
				var data = userFolders.find({
					$or: [
						{
							"_id": fileIdd
						},
						{	
							"folderPath": {
								$regex: new RegExp(fileIdd,'i')
							}
						}
					]
				});
				if(data.count() > 0)
				{
					isFolder = 1;
					data = data.fetch();
				}
				else
				{
					data = userReportFolders.find({
						$or: [
							{
								"_id": fileIdd
							},
							{	
								"folderPath": {
									$regex: new RegExp(fileIdd,'i')
								}
							}
						]
					});
					if(data.count() > 0)
					{
						isFolder = 1;
						data = data.fetch();
					}
					else
					{
						data = [];
					}
				}
				var folderIds = [];
				for(var i = 0; i < data.length; i++)
				{
					folderIds.push(data[i]._id);
				}
				var filesData = userFiles.find({
					"fileFolder": {
						$in: folderIds
					}
				});
				if(filesData.count() > 0)
				{
					filesData = filesData.fetch();
				}
				else
				{
					filesData = userReportFiles.find({
						"fileFolder": {
							$in: folderIds
						}
					});
					if(filesData.count() > 0)
					{
						filesData = filesData.fetch();
					}
					else
					{
						filesData = [];
					}
				}
				var fileId = [];
				if(filesData.length > 0)
				{
					for(var j = 0; j < filesData.length; j++)
					{
						fileId.push(filesData[j]._id);
					}
				}
				else
				{
					var fileId = [$(".discoveryopposings").attr("data-id")];
				}
			}
			else
			{
				var fileId = [$(".discoveryopposings").attr("data-id")];
			}
			console.log("fileId", fileId);
			var fileDetails = userFiles.find({
		      "_id": {
		      	$in: fileId
		      }
		    }).fetch();
		    if(fileDetails.length > 0)
		    {
		    	//var fileName = fileDetails.fileName;
				if(sendTo == null)
				{
					alert("Send to field is required.");
				}
				else
				{
					var html = "Hello<br><br>";
					if(fileDetails.length == 1)
					{
						html += "Follow below link to download the file: <br>";
						var fileUrl = fileDetails[0].fileUrl;
						html += "Link: " + fileUrl;
					}
					else
					{
						html += "Follow below links to download the file: <br>";
						html += "Links: <br>";
						for(var i = 0; i < fileDetails.length; i++)
						{
							html += (i+1) + ". " + fileDetails[i].fileUrl + "<br>";
						}
					}
					if(messageTextArea != "")
					{
						html += "<br><br>Message: " + messageTextArea;
					}
					html += "<br><br> Thank You,<br>Recite App Team.";
					
					Meteor.call("shareFile", sendTo, fileDetails, html, Meteor.userId(), viewCheckbox, editCheckbox, messageTextArea, function(err, res){
						if(err)
						{
							alert("Something went wrong. Please try again after sometime.");
						}
						else
						{
							if(res)
							{
								$(".select2-dropdown").val(null).trigger('change');
								$("#viewCheckbox").prop("checked", false);
								$("#editCheckbox").prop("checked", false);
								$("#messageTextArea").val("");
								//$(".sendItemOverlay .overlayBackground").hide();
								closeMenu("sendItemOverlay");
								//Router.go("/");
								if(isFolder)
									alert("Folder was shared successfully.");
								else
									alert("File was shared successfully.");
							}
						}
					});
				}	
		    }
		}
		
	}
});

Template.folderControlOverlay.helpers({
	checkRoot: function(){
		var path = Router.current().route._path;
		console.log("path",path); 
		if(path !== "/reports"){
			return true;
		}
		else{
			return false;
		}
	}
});


Template.folderControlOverlay.events({
	'click .foldercontrolsoverlay.options #copyFolderLi': function(e)
	  {
	    e.preventDefault();
	    var id = $(e.target).attr("data-id");
	    appHistoryPush("/copyto/folder/"+id + "/copy");
	    Router.go("/copyto/folder/"+id + "/copy");
	    closeMenu("foldercontrolsoverlay.options");
	  },
	  'click .foldercontrolsoverlay.options #moveFolderLi': function(e)
	  {
	    e.preventDefault();
	    var id = $(e.target).attr("data-id");
	    appHistoryPush("/copyto/folder/"+id + "/move");
	    Router.go("/copyto/folder/"+id + "/move");
	    closeMenu("foldercontrolsoverlay.options");
	  },
	'click .foldercontrolsoverlay.options #shareFileLi': function(e)
	{
		closeMenu("foldercontrolsoverlay.options");
		openMenu("sendItemOverlay");
		var elem = $(".foldercontrolsoverlay.options");
    	var fileId = elem.attr("data-id");
    	var fileDetails = userFolders.find({
	      "_id": fileId
	    });
	    if(fileDetails.count() > 0)
	    {
	    	fileDetails = userFolders.findOne({
		      "_id": fileId
		    });
	    }
	    else
	    {
	    	fileDetails = userReportFolders.find({
		      "_id": fileId
		    });
		    if(fileDetails.count() > 0)
		    {
		    	fileDetails = userReportFolders.findOne({
			      "_id": fileId
			    });
		    }
	    }
	    var fileName = fileDetails.folderName;
	    $(".sendItemOverlay .discoveryopposings").html(fileName);
	    $(".sendItemOverlay .discoveryopposings").attr("data-id", fileId);
	},
	'click .foldercontrolsoverlay.options #downloadFileLi': function(e)
	{
		var elem = $(e.target);
		var folderId = elem.attr("data-id");
		console.log("folderId", folderId);
		var folderDetails = userFolders.findOne({"_id":folderId});
		var allFolders = userFolders.find({
			$or:[
				{
					"_id": folderId
				},
				{
					"folderPath": {
						$regex: new RegExp(folderId)
					}
				}
			]
		});
		var allFolderIds = [];
		if(allFolders.count() > 0)
		{
			allFolders = allFolders.fetch();
			for(var j = 0; j < allFolders.length; j++)
			{
				allFolderIds.push(allFolders[j]._id);
			}
		}
		if(Meteor.isCordova)
		{
			if (!downloader.isInitialized()) { // Not initialized?
				$(".waitingOverlay .overlayBackground").toggle("fade");
			  document.addEventListener("DOWNLOADER_initialized", function onInitialized(event) { //wait for it
			    console.log("event", event);
			    

			    event.target.removeEventListener("DOWNLOADER_initialized", onInitialized, false); //remove listener
			    
			  }, false);
			  downloader.init({folder: "Download/"+folderDetails.folderName, unzip: true, fileSystem: cordova.file.externalRootDirectory});
				//downloader.getMultipleFiles(urlsDevice);
				var folderFiles = userFiles.find({
					"fileFolder": {
						$in: allFolderIds
					}
				});
				if(folderFiles.count() > 0)
				{
					console.log("folderFiles", folderFiles.count());
					folderFiles = folderFiles.fetch();
					console.log("folderFiles", folderFiles);
					Session.set("selectedFilesToDownload", folderFiles.length);
					var urls = [];
					for(var i = 0; i < folderFiles.length; i++)
					{
						urls.push({
							"url": folderFiles[i].fileUrl
						});
					}
					downloader.getMultipleFiles(urls);
				}
			  
			}
		}
		else
		{
			var folderFiles = userFiles.find({
				"fileFolder": {
					$in: allFolderIds
				}
			});
			var urls = [];
			if(folderFiles.count() > 0)
			{
				console.log("folderFiles", folderFiles.count());
				folderFiles = folderFiles.fetch();
				console.log("folderFiles", folderFiles);
				Session.set("selectedFilesToDownload", folderFiles.length);
				
				for(var i = 0; i < folderFiles.length; i++)
				{
					urls.push(folderFiles[i].fileUrl);
				}
			}
			var zip = new JSZip();
			console.log("zip", zip);
			var count = 0;
			console.log("count", count);
			var zipFilename = "zipFilename.zip";
			/*var urls = [
			  'http://res.cloudinary.com/dhkzhknae/image/upload/v1563973232/ebKLSB3vXPMrkgSJ8/F9y6gfkSftwmwgwNK/s88ecs9dywhnu7hgtaw6.jpg',
			  'http://res.cloudinary.com/dhkzhknae/image/upload/v1563968587/ebKLSB3vXPMrkgSJ8/6A58b7i8KkwDD85e6/eeTjtvfCpnSSXddtZ/xcBfzYY7jMkN4id4s/wubwxfmmdudiytxynatp.jpg'
			];*/
			console.log("urls", urls);
			urls.forEach(function(url){
			  var filename = parseInt(Math.random()*1000000000000)+".jpg";
			  // loading a file and add it in a zip file
			  console.log("JSZipUtils", JSZipUtils);
			  JSZipUtils.getBinaryContent(url, function (err, data) {
			     if(err) {
			        throw err; // or handle the error
			     }
			     zip.file(filename, data, {binary:true});
			     count++;
			     if (count == urls.length) {
			       zip.generateAsync({type:'blob'}).then(function(content) {
			       		console.log(content);
			       		console.log(saveAs);
			          saveAs(content, folderDetails.folderName);
			       });
			    }
			  });
			});
		}



		/*var fileDetails = userFiles.findOne({
	      "_id": fileId
	    });
	    var fileName = fileDetails.fileName;
	    var fileUrl = fileDetails.fileUrl;
		toDataURL(fileUrl, function(dataUrl, FileName) {
		  download(dataUrl,FileName);	
		},fileName)*/
		
	},
	'click .foldercontrolsoverlay.options #exportFileLi': function(e)
	{
		var elem = $(e.target);
		var folderId = elem.attr("data-id");
		var folderDetails = userFolders.findOne({"_id":folderId});
		var allFolders = userFolders.find({
			$or:[
				{
					"_id": folderId
				},
				{
					"folderPath": {
						$regex: new RegExp(folderId)
					}
				}
			]
		});
		var allFolderIds = [];
		if(allFolders.count() > 0)
		{
			allFolders = allFolders.fetch();
			for(var j = 0; j < allFolders.length; j++)
			{
				allFolderIds.push(allFolders[j]._id);
			}
		}
		if(Meteor.isCordova)
		{
			if (!downloader.isInitialized()) { // Not initialized?
				$(".waitingOverlay .overlayBackground").toggle("fade");
			  document.addEventListener("DOWNLOADER_initialized", function onInitialized(event) { //wait for it
			    console.log("event", event);
			    

			    event.target.removeEventListener("DOWNLOADER_initialized", onInitialized, false); //remove listener
			    
			  }, false);
			  downloader.init({folder: "Download/"+folderDetails.folderName, unzip: true, fileSystem: cordova.file.externalRootDirectory});
				//downloader.getMultipleFiles(urlsDevice);
				var folderFiles = userFiles.find({
					"fileFolder": {
						$in: allFolderIds
					}
				});
				if(folderFiles.count() > 0)
				{
					console.log("folderFiles", folderFiles.count());
					folderFiles = folderFiles.fetch();
					console.log("folderFiles", folderFiles);
					Session.set("selectedFilesToDownload", folderFiles.length);
					var urls = [];
					for(var i = 0; i < folderFiles.length; i++)
					{
						urls.push({
							"url": folderFiles[i].fileUrl
						});
					}
					downloader.getMultipleFiles(urls);
				}
			  
			}
		}
		else
		{
			var folderFiles = userFiles.find({
				"fileFolder": {
					$in: allFolderIds
				}
			});
			var urls = [];
			if(folderFiles.count() > 0)
			{
				console.log("folderFiles", folderFiles.count());
				folderFiles = folderFiles.fetch();
				console.log("folderFiles", folderFiles);
				Session.set("selectedFilesToDownload", folderFiles.length);
				
				for(var i = 0; i < folderFiles.length; i++)
				{
					urls.push(folderFiles[i].fileUrl);
				}
			}
			var zip = new JSZip();
			console.log("zip", zip);
			var count = 0;
			console.log("count", count);
			var zipFilename = "zipFilename.zip";
			/*var urls = [
			  'http://res.cloudinary.com/dhkzhknae/image/upload/v1563973232/ebKLSB3vXPMrkgSJ8/F9y6gfkSftwmwgwNK/s88ecs9dywhnu7hgtaw6.jpg',
			  'http://res.cloudinary.com/dhkzhknae/image/upload/v1563968587/ebKLSB3vXPMrkgSJ8/6A58b7i8KkwDD85e6/eeTjtvfCpnSSXddtZ/xcBfzYY7jMkN4id4s/wubwxfmmdudiytxynatp.jpg'
			];*/
			console.log("urls", urls);
			urls.forEach(function(url){
			  var filename = parseInt(Math.random()*1000000000000)+".jpg";
			  // loading a file and add it in a zip file
			  console.log("JSZipUtils", JSZipUtils);
			  JSZipUtils.getBinaryContent(url, function (err, data) {
			     if(err) {
			        throw err; // or handle the error
			     }
			     zip.file(filename, data, {binary:true});
			     count++;
			     if (count == urls.length) {
			       zip.generateAsync({type:'blob'}).then(function(content) {
			       		console.log(content);
			       		console.log(saveAs);
			          saveAs(content, folderDetails.folderName);
			       });
			    }
			  });
			});
		}



		/*var fileDetails = userFiles.findOne({
	      "_id": fileId
	    });
	    var fileName = fileDetails.fileName;
	    var fileUrl = fileDetails.fileUrl;
		toDataURL(fileUrl, function(dataUrl, FileName) {
		  download(dataUrl,FileName);	
		},fileName)*/
		
	},
	'click .foldercontrolsoverlay.options #printMultipleFiles': function(e)
	{
		e.preventDefault();
		closeMenu("foldercontrolsoverlay.options");
		$(".waitingOverlay .overlayBackground").toggle("fade");
		var currentPath = Router.current().route._path;
		var elem = $(e.target).attr("data-folderid");
		/*if(currentPath == "/reports-select")
		{
			var ids = $("#selectReportFilesIds").val();
			ids = ids.split(",");
		}
		else
		{
			var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
			var ids = [];
			selectedFiles.each(function(key, val){
				var elem = $(val);
				var id = elem.attr("data-id");
				ids.push(id);
			});
		}*/
		var ids = [];
		// var idss = userFiles.find({
		// 	"publicId": {
		// 		$regex: new RegExp(elem, "i")
		// 	},
		// 	"isDeleted": false
		// }).fetch();
		

		var idss = userFiles.find({
					$or: [
						{
							"publicId": {
								$regex: new RegExp(elem, "i")
							}
						},
						{
							"fileFolder": elem
						}
					],
					"isDeleted": false,
					"fileType":{
						$regex: new RegExp("image/", "i")
					}
					}).fetch();
		console.log("folderFiles userFiles", idss);

		if(idss.length > 0)
		{
			for(var i = 0; i < idss.length; i++)
			{
				ids.push(idss[i]._id);
			}
		}


		var html = "";
		if(ids.length > 0)
		{
			for(var i = 0; i < ids.length; i++)
			{
				var fileDetails = userFiles.find({
			      "_id": ids[i]
			    });
			    if(fileDetails.count() > 0)
			    {
			    	fileDetails = userFiles.findOne({
				      "_id": ids[i]
				    });
				    if(fileDetails.resourceType == "image")
				    {
				    	if(Meteor.isCordova)
				    	{
				    		html += "<img src='"+fileDetails.fileUrl+"' style='width:100%;height:auto;'/>";
				    	}
				    	else
				    	{
				    		toDataURL1(fileDetails.fileUrl,function(dataurl, filename){
								html += '<img src="'+dataurl+'" style="width:100%;height:auto;"/>';
							},fileDetails.fileName);
				    	}
				    	
				    }
			    }
			    // else
			    // {
			    // 	fileDetails = userReportFiles.find({
				   //    "_id": ids[i]
				   //  });
				   //  if(fileDetails.count() > 0)
				   //  {
				   //  	fileDetails = userReportFiles.findOne({
					  //     "_id": ids[i]
					  //   });
					  //   if(fileDetails.resourceType == "image")
					  //   {
					  //   	if(Meteor.isCordova)
					  //   	{
					  //   		html += "<img src='"+fileDetails.fileUrl+"' style='width:100%;height:auto;'/>";
					  //   	}
					  //   	else
					  //   	{
					  //   		toDataURL1(fileDetails.fileUrl,function(dataurl, filename){
							// 		html += '<img src="'+dataurl+'" style="width:100%;height:auto;"/>';
							// 	},fileDetails.fileName);
					  //   	}
					  //   }
				   //  }
			    // }
			}
			setTimeout(function(){
				if(html != "")
				{
					if(Meteor.isCordova)
					{$(".waitingOverlay .overlayBackground").toggle("fade");
						cordova.plugins.printer.print(html);
					}
					else
					{
						$(".waitingOverlay .overlayBackground").toggle("fade");
						var w = window.open();
						w.document.write(html);
						setTimeout(function(){
							w.print();
							w.close();
							
						},1000);
					}
				}
				else{
					$(".waitingOverlay .overlayBackground").toggle("fade");
				}
			},5000);
		}
		else{
			$(".waitingOverlay .overlayBackground").toggle("fade");
		}
	},
	'click .foldercontrolsoverlay.options .overlayBackground': function(e)
	{
		var elem = $(e.target);
		if(elem.attr("class") == "overlayBackground") {
			//$(".foldercontrolsoverlay .overlayBackground").hide();
			closeMenu("foldercontrolsoverlay.options");
		}
	},
	'click .foldercontrolsoverlay.options #renameFileLi > a': function(e)
	{
		//$(".foldercontrolsoverlay .overlayBackground").hide();
		closeMenu("foldercontrolsoverlay");
	},
	'click .foldercontrolsoverlay.options #tagFileLi': function(e)
	{
		//$(".foldercontrolsoverlay .overlayBackground").hide();
		closeMenu("foldercontrolsoverlay.options");
		//$(".tagOverlay .overlayBackground").fadeIn();
		openMenu("tagOverlay");
	},
	'click .foldercontrolsoverlay.options #deleteFileLi': function(e)
	{
		var id = $(e.target).attr("data-id");
		var c = confirm("Are you sure you want to delete? \n\n All decisions are final. ");
		if(c)
		{
			var currentPath = Router.current().route._path;
			if(currentPath == "/reports")
			{
				var action = "reports";
			}
			else
			{
				var action = "files";
			}
			if(action == "reports")
			{
				Meteor.call("deleteFolderFromReports", id, function(err, res){
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
			else
			{
				Meteor.call("deleteFolder", id, action, function(err, res){
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
			
		}
		//$(".foldercontrolsoverlay .overlayBackground").hide();
		closeMenu("foldercontrolsoverlay.options");
	},
	'click .foldercontrolsoverlay.options #fileStarLi': function(e)
	{
		var id = $(".foldercontrolsoverlay.options #fileStarLi").attr("data-id");
		var currentAction = $(".foldercontrolsoverlay.options #fileStarLi").attr("data-status");
		Meteor.call("markFolderAsStarred", Meteor.userId(), id, !currentAction, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				if(currentAction == "true")
				{
					$(".foldercontrolsoverlay.options #fileStarLi").attr("data-status", "false");
					$(".foldercontrolsoverlay.options #fileStarLi").find("img").attr("src","/img/StarBlackIcon.png");
					$(".foldercontrolsoverlay.options #fileStarLi").find("img").next().html("Add to Starred");
					$(".foldercontrolsoverlay.options #fileStarLi").find("img").next().removeClass("activeClass");
				}
				else
				{
					$(".foldercontrolsoverlay.options #fileStarLi").attr("data-status", "true");
					$(".foldercontrolsoverlay.options #fileStarLi").find("img").attr("src","/img/StarBlueIcon.png");
					$(".foldercontrolsoverlay.options #fileStarLi").find("img").next().html("Starred Folder");
					$(".foldercontrolsoverlay.options #fileStarLi").find("img").next().addClass("activeClass");
				}
			}
			closeMenu("foldercontrolsoverlay.options");
		});
	},
	'click .foldercontrolsoverlay.options #addToReportLi': function(e)
	{
		e.preventDefault();
		var elem = $(e.target);
		var folderId = $(".foldercontrolsoverlay.options #addToReportLi").attr("data-id");
		var status = $(".foldercontrolsoverlay.options #addToReportLi").attr("data-status");
		console.log(status, "status");
		if(status == "true")
		{
			Meteor.call("removeFolderFromReportFolder", folderId, Meteor.userId(), function(err, res){
				if(err)
				{
					closeMenu("foldercontrolsoverlay.options");
					alert(err.reason);
				}
				else
				{
					closeMenu("foldercontrolsoverlay.options");
					setTimeout(function(){
						alert("Folder was removed from report folder successfully.");
					},1000);
				}
			});
		}
		else
		{
			Meteor.call("addFolderToReportFolder", folderId, Meteor.userId(), function(err, res){
				if(err)
				{
					closeMenu("foldercontrolsoverlay.options");
					alert(err.reason);
				}
				else
				{
					closeMenu("foldercontrolsoverlay.options");
					setTimeout(function(){
						alert("Folder was added to report folder successfully.");
					},1000);
				}
			});
		}
		
	},
		// 'click .foldercontrolsoverlay #showFolder': function(e)
		//  {
		//    e.preventDefault();
		//    var id = $(e.target).attr("data-id");
		//    var fileDetails = userFiles.findOne({
		//      "_id": id
		//    });
		//    var folderDetails = userFolders.findOne({
		//      "_id": fileDetails.fileFolder
		//    });
		//    Router.go("/sub-folder/"+folderDetails.referenceId+"/"+fileDetails.fileFolder);
		//    // closeMenu("foldercontrolsoverlay.fileFilter");
		//  },
});





function recurrsiveDownloadFile(filesArr, fileRec, counter, folderName, callback)
{
	counter++;
	var dl = new download();
	console.log("dl",dl);
	function DownloaderErrorMultiple(err) {
		console.log("download error: " + err);
		if(counter <= (filesArr.length - 1))
		{
			recurrsiveDownloadFile(filesArr, filesArr[counter], counter, folderName, callback);
		}
		else
		{
			callback();
		}
	}
	function DownloaderSuccessMultiple() {
	    if(counter <= (filesArr.length - 1))
		{
			recurrsiveDownloadFile(filesArr, filesArr[counter], counter, folderName, callback);
		}
		else
		{
			callback();
		}
	}
	dl.Initialize({
	    fileSystem : cordova.file.externalRootDirectory,
	    folder: "Download/" + folderName,
	    unzip: false,
	    remove: false,
	    timeout: 0,
	    success: DownloaderSuccessMultiple,
	    error: DownloaderErrorMultiple,
	});
	console.log("fileRec", fileRec);
	dl.Get(fileRec);
}

Template.imageViewer.events({
	'click #closeImageViewer': function(e)
	{
		e.preventDefault();
		$(".imageViewer").fadeOut();
	}
});


Template.notificationOverlay.onCreated(function(){
Meteor.subscribe("getUserNotifications", Meteor.userId());

});
Template.notificationOverlay.onRendered(function(){});
Template.notificationOverlay.helpers({});
Template.notificationOverlay.events({
	'click .overlayBackground': function(){
		closeMenu("notificationOverlay")
	},
	'click #unReadNotification': function(e)
	{
		e.preventDefault();
		Meteor.call("markAllNotificationAsRead", Meteor.userId(), function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				alert("Notifications are marked as read.");
			}
		});
	} 
});




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