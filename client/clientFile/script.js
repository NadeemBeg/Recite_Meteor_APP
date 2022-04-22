const pretty = require('prettysize');
Template.clientFile.onCreated(function(){
	console.log(Template.instance().data.id);
	Meteor.subscribe("getUserFolders", Meteor.userId());
	Meteor.subscribe("getFileDetails", Template.instance().data.id);
	Meteor.subscribe("getFileTags", Template.instance().data.id);
	Meteor.subscribe("allCommentsOnFile",Template.instance().data.id);
	Meteor.subscribe("allUsers");
	
});
Template.clientFile.onRendered(function(){
	var fileId = Template.instance().data.id;
	setTimeout(function(){
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
		var iconPath = getFileIcon(fileDetails.fileName);
		$(".path5133").attr("src",iconPath);
	},500);
	
});
Template.clientFile.helpers({
	foldername:function(folder){
		console.log("this folder ",folder);
		var folderId = folder.fileFolder;
		if(folderId == null || folderId == undefined || folderId == ""){
			return "-";
		}
		else{
			var folderFind = userFolders.findOne({_id:folderId});
			if(folderFind == null || folderFind == undefined || folderFind == ""){
				return "-";
			}
			else{
				return folderFind.folderName;
			}
		}
	},
	userName:function(id){
		var a = Meteor.users.findOne({"_id":id});
		var name = a.profile.fullName;
		if(name.indexOf(" ") > -1)
		{
			var splitted = name.split(" ");
			return splitted[0] + " " + splitted[1][0].toUpperCase() + ".";
		}
		else
		{
			return name;
		}
	},
	totalComment: function(){
		// console.log("id",id);
		var commentss = [];
		var findFile = fileComments.find({fileId: Template.instance().data.id}).fetch();	
		return findFile;
	},
	getFileDetails: function()
	{
		var fileId = Template.instance().data.id;
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
		console.log("fileDetails",fileDetails);
		return fileDetails;
	},
	isFileImage: function(){
		var fileId = Template.instance().data.id;
		var fileDetails = userFiles.find({
			"_id": fileId
		});
		if(fileDetails.count() > 0)
		{
			fileDetails = userFiles.findOne({
				"_id": fileId
			});
		}
		if(fileDetails.fileType.indexOf("image") > -1)
		{
			return true;
		}
		else
		{
			return false;
		}
		
	},
	isFileVideo: function(){
		var fileId = Template.instance().data.id;
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
		if(fileDetails.fileType.indexOf("video") > -1)
		{
			return true;
		}
		else
		{
			return false;
		}
		
	},
	getFileSize: function(size)
	{
		var str = pretty(size, false, false, 0);
    	return str;
	},
	getUploadedByText: function(rec)
	{
		if(typeof rec !== "undefined")
		{
			var uploadedByUserId = rec.userId;
			var createdDate = rec.dateCreated;
			var html = "";
			var userDetails = Meteor.users.findOne({
				"_id": uploadedByUserId
			});
			html += userDetails.profile.fullName + ", ";
			console.log(moment(createdDate).format('hh:mm A'));
			html += "on " + moment(createdDate).format('hh:mm A, ddd Do MMM YYYY');
			return html;
		}
		
	},
	getTagsListCount: function()
	{
		return userTaggedFiles.find({
			"resourceId": Template.instance().data.id
		}).count();
	},
	getTagsList: function()
	{
		return userTaggedFiles.find({
			"resourceId": Template.instance().data.id
		}).fetch();
	},
	isAllowedComment: function(){
		var per = getFilePermission(Template.instance().data.id, Meteor.userId());
		if(per == 2 || per == 3)
		{
			return true;
		}
		else
		{
			var permission2 = getFilePermissionForNotification(Template.instance().data.id, Meteor.userId());
		      console.log("permission2",permission2);
		      if(permission2 == 3)
		        return true;
		      else
		        return false;
		}
	},
	getPorjectName: function(n){
		console.log("project", n);
	}
});
Template.clientFile.events({
	'click .previewImageFile': function(e)
	{
		e.preventDefault();
		var fileId = Template.instance().data.id;
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
		console.log("fileDetails",fileDetails);

		var url1 = fileDetails.fileUrl;
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

		file = new File([data], fileNAME, metadata);

		orientation(data, function(base64img, value) {
            // $('#placeholder1').attr('src', base64img);
            // console.log("rotation[value]",rotation[value]);
            // return $('#profileImage').attr('src', base64img);
            var rotated = $('.profilePic').attr('src', base64img);
            if(value) {
            	console.log("test ndm");
            	return rotated.css('transform', rotation[value]);
              // console.log("value",rotated.css('transform', rotation[value]));
            }
        });
		 // ... do something with the file or return it
		}
		createFile();

		previewImageFile(fileDetails.fileUrl);
	},
	'click .previewVideoFile': function(e)
	{
		e.preventDefault();
		var fileId = Template.instance().data.id;
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
		console.log(fileDetails);
		previewVideoFile(fileDetails.fileUrl);
	},
	'click .backbuttontopnav': function(){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
	},
	'click #addTag': function(e){
		e.preventDefault();
		//$(".tagOverlay .overlayBackground").fadeIn();
		openMenu("tagOverlay");
	},
	'click #copyToClipBoard': function(e)
	{
		e.preventDefault();
		var copyText = document.getElementById("myInput");
		copyText.select();
		document.execCommand("copy");
		if(Meteor.isCordova)
		{
			window.plugins.socialsharing.share('Share', null, null, copyText.value);
		}
		else
		{
			alert("Copied text: " + copyText.value);
		}
		
	},
	'click .fileCommentPostButton':function(e)
	{
		e.preventDefault();
		var fileId = Template.instance().data.id;
		var comment = $("#fileCommentTextBox").val();
		if(comment == null || comment == "")
		{
			alert("Please enter comment to continue.");
		}
		else
		{
			var data = {
				"userId": Meteor.userId(),
				"fileId": fileId,
				"comments": comment,
				"dateCreated": new Date()
			}
			Meteor.call("addCommentForFile", data, function(err, res){
				if(err)
				{
					alert(err.reason);
				}
				else
				{
					alert("Comment was submitted successfully.");
					$("#fileCommentTextBox").val("");
				}
			})
		}
	},
	'click .removeTag': function(e)
	{
		e.preventDefault();
		var tagId = $(e.target).attr("data-tagid");
		Meteor.call("removeTag", tagId, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				alert("Tag was removed successfully.");
			}
		});
	}
});

function previewImageFile(url)
{
	$(".imageViewer").find("img").remove();
	$(".imageViewer").find("video").remove();
	$(".imageViewer").append("<img src='"+url+"' class='img-responsive' />");
	$(".imageViewer").fadeToggle();
}
function previewVideoFile(url)
{
	$(".imageViewer").find("img").remove();
	$(".imageViewer").find("video").remove();
	$(".imageViewer").append('<video controls autoplay><source src="'+url+'" class="img-responsive">Your browser does not support the video tag.</video>');
	$(".imageViewer").fadeToggle();
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
