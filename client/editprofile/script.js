var profilePicFile = [];
Template.editprofile.onCreated(function(){});
Template.editprofile.onRendered(function(){
	profilePicFile = [];
	$(".phonenumbermask").inputmask();
});
Template.editprofile.helpers({
	getUserDetails: function(){
		if(Meteor.userId() !== null)
		{
			return Meteor.user();
		}
	},
	getUserName: function(){
		if(Meteor.userId() !== null)
		{
			if(typeof Meteor.user() == "undefined")
				return;

			var fullName = Meteor.user().profile.fullName;
			var splittedName = fullName.split(" ");
			if(splittedName.length > 0)
			{
				if(typeof splittedName[0] !== "undefined")
				{
					var firstName = splittedName[0];
				}
				else
				{
					var firstName = "";
				}

				if(typeof splittedName[1] !== "undefined")
				{
					var lastName = splittedName[1];
				}
				else
				{
					var lastName = "";
				}
				return {
					"firstName": firstName,
					"lastName": lastName
				}
			}
		}
	},
	getProfilePic: function(){
		setTimeout(function(){
			if(Meteor.userId() !== null)
			{
				if(typeof Meteor.user() == "undefined")
					return "/img/BoyIconEdit.png";

				if(typeof Meteor.user().profile.profilePic !== "undefined")
				{
					// return Meteor.user().profile.profilePic;
					var url1 = Meteor.user().profile.profilePic;
		            // console.log("urls ", url1);
		            var url = url1.replace("http://","https://"); 
		            // console.log("urls ", url);
		          	// var fileName11 = url;

					var fileNAME= url.split('/').pop();
					// console.log("fileNAME getProfilePic",fileNAME);

					async function createFile(){
						let response = await fetch(url);
						// console.log("response getProfilePic" ,response);	
						let data = await response.blob();
						// console.log("data getProfilePic",data);
						 let metadata = {
						   type: data.type
						 };
						console.log("metadata",metadata);
						file = new File([data], fileNAME, metadata);
						// console.log("data",data);
						orientation(data, function(base64img, value) {
							// console.log("base64img",base64img);
		                    // $('#placeholder1').attr('src', base64img);
		                    // console.log("rotation[value]",rotation[value]);
		                    // return $('#profileImage').attr('src', base64img);
		                    var rotated = $('.profilePic').attr('src', base64img);
		                    // console.log("rotated1212",rotated);
		                    if(value) {
		                      return rotated.css('transform', rotation[value]);
		                      // console.log("value",rotated.css('transform', rotation[value]));
		                    }
		                });
					 // ... do something with the file or return it
					}
					createFile();
				}
				else
				{
					return "/img/BoyIconEdit.png";
				}
			}
			else
			{
				return "/img/BoyIconEdit.png";
			}
		},700);
	}
});
Template.editprofile.events({
	'change #selectOverlayFile': function(e)
	{
		var a;
		// console.log("test");
		//$(".selectFileOverlay .overlayBackground").hide();
		//$(".waitingOverlay .overlayBackground").toggle("fade");
		var elem = $(e.target);
		var filesToUpload = e.currentTarget.files[0];
		// console.log("change filesToUpload",filesToUpload);
		profilePicFile = [];
		profilePicFile.push(filesToUpload);
		// console.log("change profilePicFile",profilePicFile)
		var reader = new FileReader();
		reader.onloadend = function (event) {
			a = event.target.result;
			// console.log(" change a",a);


				//$(".editprofilerecite img.profilePic").attr("src", a);

				//$(".selectFileOverlay .overlayBackground").hide();
				console.log('filesToUpload["localURL"]', filesToUpload["localURL"]);
				$("#selectOverlayFileHidden").val(filesToUpload["localURL"]);
				orientation(filesToUpload, function(base64img, value) {
					// console.log("value", value);
	                // $('#placeholder1').attr('src', base64img);				                    
	                // console.log(rotation[value]);
	                var rotated = $('.editprofilerecite img.profilePic').attr('src', base64img);
	                if(value) {
	                  rotated.css('transform', rotation[value]);
	                  // console.log("test ndm");
	                  return rotated.css('transform', rotation[value]);
	                  // console.log("value",rotated.css('transform', rotation[value]));
	                }
	            });
				/*Cloudinary.upload(a, {"resouce_type":"image"}, function(err, res){
		        	console.log(res);
		        	console.log(err);
				});*/
			};


			reader.readAsDataURL(filesToUpload);
			$(".selectFileOverlay .overlayBackground").hide();
		
		// if(filesToUpload.length > 0)
		// {
		// 	var counter = 0;
		// 	recurrsiveFuncProfilePic(filesToUpload[counter],filesToUpload,counter,function(){
		// 		$(".waitingOverlay .overlayBackground").toggle("fade");
  //               alert("Files was uploaded successfully.");
		// 	});
		// }
		// else
		// {
		// 	$(".waitingOverlay .overlayBackground").toggle("fade");
		// }
	},
	/*'click #editProfileCancelButton': function(e)
	{
		e.preventDefault();
		Router.go("/accounts");
	},*/
	'click .backbuttontopnav': function(e)
	{
		e.preventDefault();
		Router.go("/accounts");
	},
	'click #editProfileSaveButton': function(e){
		e.preventDefault();
		var firstName = $("#firstName").val();
		var lastName = $("#lastName").val();
		var personalEmail = $("#personalEmail").val();
		var companyEmail = $("#companyEmail").val();
		var jobTitle = $("#jobTitle").val();
		var officeNumber = $("#officeNumber").val();
		officeNumber = officeNumber.replace(/[()-]/g,"");
		var officeExtNumber = $("#officeExtNumber").val();
		officeExtNumber = officeExtNumber.replace(/[()-]/g,"");
		var mobileNumber = $("#mobileNumber").val();
		mobileNumber = mobileNumber.replace(/[()-]/g,"");
		var homeNumber = $("#homeNumber").val();
		homeNumber = homeNumber.replace(/[()-]/g,"");
		var faxNumber = $("#faxNumber").val();
		faxNumber = faxNumber.replace(/[()-]/g,"");
		var line1 = $("#line1").val();
		var line2 = $("#line2").val();
		var city = $("#city").val();
		var state = $("#state").val();
		var zipCode = $("#zipCode").val();
		var country = $("#country").val();
		var publicProfile = $("#publicProfile").val();
		var privateNotes = $("#privateNotes").val();
		var twitter = $("#twitter").val();
		var linkedin = $("#linkedin").val();
		var googles = $("#google").val();
		var facebook = $("#facebook").val();
		var website = $("#website").val();
		var b = /^(?![0-9]*$)[a-zA-Z0-9 ]+$/
		var a = /^[0-9]{10}$/gm
		var az = /^[0-9]{4,6}$/gm
		console
		if(firstName == "" || firstName == null)
		{
			alert("First Name is required.");
		}
		else if(!b.test(firstName))
		{
			alert("First Name is invalid.");
		}
		else if(lastName == "" || lastName == null)
		{
			alert("Last Name is required.");
		}
		else if(!b.test(lastName))
		{
			alert("Last Name is invalid.");
		}
		else if(personalEmail == "" || personalEmail == null)
		{
			alert("Personal Email is required.");
		}
		else if(mobileNumber == "" || mobileNumber == null)
		{
			alert("Mobile Number is required.");
		}
		else if(!a.test(mobileNumber))
		{
			var message = "Please enter valid mobile number.";
			alert(message);
		}
		else if(zipCode !== ""){
			if(!az.test(zipCode))
			{
				alert("Please enter valid Zip/Postal Code.");
			}
			else
			{
				var userData = {
					"profile.fullName": firstName + " " + lastName,
					"profile.phoneNumber": mobileNumber,
					"profile.companyEmail": companyEmail ? companyEmail : "",
					"profile.jobTitle": jobTitle ? jobTitle : "",
					"profile.phoneNumberOffice": officeNumber ? officeNumber : "",
					"profile.phoneNumberOfficeExt": officeExtNumber ? officeExtNumber : "",
					"profile.phoneNumberHome": homeNumber ? homeNumber : "",
					"profile.phoneNumberFax": faxNumber ? faxNumber : "",
					"profile.addressLine1": line1 ? line1 : "",
					"profile.addressLine2": line2 ? line2 : "",
					"profile.addressCity": city ? city : "",
					"profile.addressState": state ? state : "",
					"profile.addressZip": zipCode ? zipCode : "",
					"profile.addressCountry": country ? country : "",
					"profile.publicNotes": publicProfile ? publicProfile : "",
					"profile.privateNotes": privateNotes ? privateNotes : "",
					"profile.socialFacebook": facebook ? facebook : "",
					"profile.socialGoogle": googles ? googles : "",
					"profile.socialTwitter": twitter ? twitter : "",
					"profile.socialLinkedIn": linkedin ? linkedin : "",
					"profile.socialWebsite": website ? website : "",
					"username": personalEmail
				}
				$(".waitingOverlay .overlayBackground").fadeIn();
				Meteor.call("editProfile", Meteor.userId(), userData, function(err, res){
					if(err)
					{
						alert(err.reason);
						$(".waitingOverlay .overlayBackground").fadeOut();
					}
					else
					{
						if(!Meteor.isCordova) {
							if(profilePicFile.length > 0)
							{
								var counter = 0;
								recurrsiveFuncProfilePic(profilePicFile[counter],profilePicFile,counter,function(){
									//$(".waitingOverlay .overlayBackground").toggle("fade");
					                profilePicFile = [];
					                $(".waitingOverlay .overlayBackground").fadeOut();
									setTimeout(function(){
										alert("Profile saved successfully.");
										Router.go("/accounts");
									},1000);
									
								});
							}
							else
							{
								$(".waitingOverlay .overlayBackground").fadeOut();
								setTimeout(function(){
									alert("Profile saved successfully.");
									Router.go("/accounts");
								},1000);
							}
							
							
						}
						else
						{
							console.log('$("#selectOverlayFileHidden").val()',$("#selectOverlayFileHidden").val());
							if($("#selectOverlayFileHidden").val() == "" && profilePicFile.length == 0)
							{
								$(".waitingOverlay .overlayBackground").fadeOut();
								setTimeout(function(){
									alert("Profile saved successfully.");
									Router.go("/accounts");
								},1000);
							}
							else
							{
								if(profilePicFile.length > 0)
								{
									var counter = 0;
									recurrsiveFuncProfilePic(profilePicFile[counter],profilePicFile,counter,function(){
										//$(".waitingOverlay .overlayBackground").toggle("fade");
						                profilePicFile = [];
						                $(".waitingOverlay .overlayBackground").fadeOut();
						                setTimeout(function(){
						                	alert("Profile saved successfully.");
											Router.go("/accounts");
										},1000);
									});
								}
								else
								{
									var fileElment = $("#selectOverlayFileHidden").val();
									window.resolveLocalFileSystemURL(fileElment, function (fileEntry) {
										fileEntry["type"] = "image/";
										fileEntry.file(function (file) {
											profilePicFile.push(file);
											var counter = 0;
											recurrsiveFuncProfilePic(profilePicFile[counter],profilePicFile,counter,function(){
												//$(".waitingOverlay .overlayBackground").toggle("fade");
								                profilePicFile = [];
								                $(".waitingOverlay .overlayBackground").fadeOut();
								                setTimeout(function(){
								                	alert("Profile saved successfully.");
													Router.go("/accounts");
												},1000);
											});
										});
									});
								}
							}
						}
					}
				});
			}
		}
		else
			{
				var userData = {
					"profile.fullName": firstName + " " + lastName,
					"profile.phoneNumber": mobileNumber,
					"profile.companyEmail": companyEmail ? companyEmail : "",
					"profile.jobTitle": jobTitle ? jobTitle : "",
					"profile.phoneNumberOffice": officeNumber ? officeNumber : "",
					"profile.phoneNumberOfficeExt": officeExtNumber ? officeExtNumber : "",
					"profile.phoneNumberHome": homeNumber ? homeNumber : "",
					"profile.phoneNumberFax": faxNumber ? faxNumber : "",
					"profile.addressLine1": line1 ? line1 : "",
					"profile.addressLine2": line2 ? line2 : "",
					"profile.addressCity": city ? city : "",
					"profile.addressState": state ? state : "",
					"profile.addressZip": zipCode ? zipCode : "",
					"profile.addressCountry": country ? country : "",
					"profile.publicNotes": publicProfile ? publicProfile : "",
					"profile.privateNotes": privateNotes ? privateNotes : "",
					"profile.socialFacebook": facebook ? facebook : "",
					"profile.socialGoogle": googles ? googles : "",
					"profile.socialTwitter": twitter ? twitter : "",
					"profile.socialLinkedIn": linkedin ? linkedin : "",
					"profile.socialWebsite": website ? website : "",
					"username": personalEmail
				}
				$(".waitingOverlay .overlayBackground").fadeIn();
				Meteor.call("editProfile", Meteor.userId(), userData, function(err, res){
					if(err)
					{
						alert(err.reason);
						$(".waitingOverlay .overlayBackground").fadeOut();
					}
					else
					{
						if(!Meteor.isCordova) {
							if(profilePicFile.length > 0)
							{
								var counter = 0;
								recurrsiveFuncProfilePic(profilePicFile[counter],profilePicFile,counter,function(){
									//$(".waitingOverlay .overlayBackground").toggle("fade");
					                profilePicFile = [];
					                $(".waitingOverlay .overlayBackground").fadeOut();
									setTimeout(function(){
										alert("Profile saved successfully.");
										Router.go("/accounts");
									},1000);
									
								});
							}
							else
							{
								$(".waitingOverlay .overlayBackground").fadeOut();
								setTimeout(function(){
									alert("Profile saved successfully.");
									Router.go("/accounts");
								},1000);
							}
							
							
						}
						else
						{
							console.log('$("#selectOverlayFileHidden").val()',$("#selectOverlayFileHidden").val());
							if($("#selectOverlayFileHidden").val() == "" && profilePicFile.length == 0)
							{
								$(".waitingOverlay .overlayBackground").fadeOut();
								setTimeout(function(){
									alert("Profile saved successfully.");
									Router.go("/accounts");
								},1000);
							}
							else
							{
								if(profilePicFile.length > 0)
								{
									var counter = 0;
									recurrsiveFuncProfilePic(profilePicFile[counter],profilePicFile,counter,function(){
										//$(".waitingOverlay .overlayBackground").toggle("fade");
						                profilePicFile = [];
						                $(".waitingOverlay .overlayBackground").fadeOut();
						                setTimeout(function(){
						                	alert("Profile saved successfully.");
											Router.go("/accounts");
										},1000);
									});
								}
								else
								{
									var fileElment = $("#selectOverlayFileHidden").val();
									window.resolveLocalFileSystemURL(fileElment, function (fileEntry) {
										fileEntry["type"] = "image/";
										fileEntry.file(function (file) {
											profilePicFile.push(file);
											var counter = 0;
											recurrsiveFuncProfilePic(profilePicFile[counter],profilePicFile,counter,function(){
												//$(".waitingOverlay .overlayBackground").toggle("fade");
								                profilePicFile = [];
								                $(".waitingOverlay .overlayBackground").fadeOut();
								                setTimeout(function(){
								                	alert("Profile saved successfully.");
													Router.go("/accounts");
												},1000);
											});
										});
									});
								}
							}
						}
					}
				});
			}
		// else if(zipCode !== "" || zipCode !== null)
		// {
		// 	if(!az.test(zipCode))
		// 	{
		// 		alert("Please enter valid Zip/Postal Code.");
		// 	}
			
		
		
	},
	'click .cameraUploadeButton': function(e)
	{
		e.preventDefault();
		if(Meteor.isCordova)
		{
			/*$(".selectFileOverlay .overlayBackground").fadeIn();
			$(".selectFileOverlay .overlayBody").fadeIn();*/
			openMenu("selectFileOverlay");
		}
		else
		{
			$("#selectOverlayFile").click();
		}
	},
	'click .profilePic': function(e)
	{
		e.preventDefault();
		if(Meteor.isCordova)
		{
			/*$(".selectFileOverlay .overlayBackground").fadeIn();
			$(".selectFileOverlay .overlayBody").fadeIn();*/
			openMenu("selectFileOverlay");
		}
		else
		{
			$("#selectOverlayFile").click();
		}
	}
});
function recurrsiveFuncProfilePic(fileRec, fileArr, counter, callback)
{
	console.log("fileRec",fileRec);
	if(fileRec.size <= 10000000)
	{
		//uploadeFileToCloudinary(fileRec, Meteor.userId())
		Cloudinary.upload(fileRec, {}, function(err, res){
			console.log("res", res);
			console.log(err);
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
	            Meteor.call("saveFileProfilePic", Meteor.userId(), res, fileRec.name, fileRec.type, function(err1, res1){
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
							console.log("123");
							recurrsiveFunc(fileArr[counter], fileArr, counter, callback);
						}
						else
						{
							console.log("321");
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
