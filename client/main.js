import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { WebApp } from 'meteor/webapp';

import './main.html';

Meteor.startup(function() {
	//Meteor.call("sendSMS", "+919714843622", "2819 is your Recite verification code, enter in Recite Verify Account. Expires in 10 minutes.", function(err, res){});
	if(Meteor.isCordova)
	{
		Push.Configure({
		  android: {
		    senderID: 988979084578,
		    alert: true,
		    badge: true,
		    sound: true,
		    vibrate: true,
		    clearNotifications: true
		    // icon: '',
		    // iconColor: ''
		  },
		  ios: {
		    alert: true,
		    badge: true,
		    sound: true
		  }
		});
		Push.allow({
	        send: function(userId, notification) {
	            return true; // Allow all users to send
	        }
	    });
	    Push.addListener('startup', function(notification) {
		    Router.go("/notifications");
		  }); 
	    Push.addListener('message', function(notification) {
		    Router.go("/notifications");
		  }); 
		if(Meteor.user() !== null)
		{
			PushNotification.createChannel(
			    function() {
			        console.log('createChannel');
			    },
			    function() {
			        console.log('error');
			    },
			    {
					id: Meteor.userId(), //Use any Id you prefer, but the same Id for this channel must be sent from the server, 
					description: 'Recite App Android Channel', //And any description your prefer
					importance: 3,
					vibration: true
				}
			);
		}

		document.addEventListener("deviceready", onDeviceReady, false);
		document.addEventListener("backbutton", onBackKeyDown, false);  

	}
	function onBackKeyDown(e) { 
	   e.preventDefault(); 
	   if($(".imageViewer").is(":visible"))
	   {
	   		$(".imageViewer").fadeOut();
	   }
	   else if($(".createOverlay .overlayBackground").is(":visible"))
	   {
	   		$(".createOverlay .overlayBody").slideUp(300);
    		$(".createOverlay .overlayBackground").fadeOut();
	   }
	   else if($(".foldercontrolsoverlay.fileFilter .overlayBackground").is(":visible"))
	   {
	   		$(".foldercontrolsoverlay.fileFilter .overlayBody").slideUp(300);
    		$(".foldercontrolsoverlay.fileFilter .overlayBackground").fadeOut();
	   }
	   else if($(".foldercontrolsoverlay.options .overlayBackground").is(":visible"))
	   {
	   		$(".foldercontrolsoverlay.options .overlayBody").slideUp(300);
    		$(".foldercontrolsoverlay.options .overlayBackground").fadeOut();
	   }
	   else if($(".filteroptionslistoverlay .overlayBackground").is(":visible"))
	   {
	   		$(".filteroptionslistoverlay .overlayBody").slideUp(300);
    		$(".filteroptionslistoverlay .overlayBackground").fadeOut();
	   }
	   else if($(".tagOverlay .overlayBackground").is(":visible"))
	   {
	   		$(".tagOverlay .overlayBody").slideUp(300);
    		$(".tagOverlay .overlayBackground").fadeOut();
	   }
	   else if($(".sendItemOverlay .overlayBackground").is(":visible"))
	   {
	   		$(".sendItemOverlay .overlayBody").slideUp(300);
    		$(".sendItemOverlay .overlayBackground").fadeOut();
	   }
	   else if($(".selectFileOverlay .overlayBackground").is(":visible"))
	   {
	   		$(".selectFileOverlay .overlayBody").slideUp(300);
    		$(".selectFileOverlay .overlayBackground").fadeOut();
	   }
	   else if($(".multipleSelectFileOptionsOverlay .overlayBackground").is(":visible"))
	   {
	   		$(".multipleSelectFileOptionsOverlay .overlayBody").slideUp(300);
    		$(".multipleSelectFileOptionsOverlay .overlayBackground").fadeOut();
	   }
	   else if($(".notificationOverlay .overlayBackground").is(":visible"))
	   {
	   		$(".notificationOverlay .overlayBody").slideUp(300);
    		$(".notificationOverlay .overlayBackground").fadeOut();
	   }
	   else
	   {
	   		var r = Router.current().route._path;
	   		var notAllowed = ["/home","/","/filelistview","/reports","/accounts"];
	   		if(notAllowed.indexOf(r) == -1)
	   		{
	   			if($(".backbuttontopnav").length > 0)
	   			{
	   				$(".backbuttontopnav").click();
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
	   }
	}
	function onDeviceReady()
	{
		if(device.platform == "Android")
		{
			
			
			function error() {
			  console.warn('Camera permission is not turned on');
			}
			function success( status ) {
			  if( !status.hasPermission ) error();
			}
			cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.WRITE_EXTERNAL_STORAGE, success, error);

			document.addEventListener("DOWNLOADER_downloadSuccess", function(event){
			  console.log("event1", event);
			  var currentFile = Session.get("selectedFilesToDownload");
			  console.log("currentFile", currentFile);
			  currentFile--;
			  console.log("currentFile -- ", currentFile);
			  Session.set("selectedFilesToDownload", currentFile);
			  if(currentFile == 0)
			  {
			  	alert("Download was successful.");
			  	$(".waitingOverlay .overlayBackground").toggle("fade");
			  	downloader.abort();
			  	appHistoryPull();
			  	if(Router.current().route._path == "/filelistview/select")
			  	{
			  		Router.go("/filelistview");
			  	}
			  }
			});
			
		
		}
	}

	
});