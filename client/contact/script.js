var profilePhoto = [];
Template.addNewContact.onCreated(function(){});
Template.addNewContact.onRendered(function(){
	profilePhoto = [];
	$("#workNumber").inputmask();
	$("#personalNumber").inputmask();
});
Template.addNewContact.helpers({});
Template.addNewContact.events({
	'click .backbuttontopnav': function(e)
	{
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
		// appHistoryPush("/home");
		// Router.go("/home");
		// // Router.go("/");
	},
	'click #addContactSaveButton': function(e)
	{
		e.preventDefault();
		var fullName = $("#fullName").val();
		var contactTitle = $("#contactTitle").val();
		var company = $("#company").val();
		var workNumber = $("#workNumber").val();
		workNumber = workNumber.replace(/[()-]/g,"");
		var personalNumber = $("#personalNumber").val();
		personalNumber = personalNumber.replace(/[()-]/g,"");
		var personalEmail = $("#personalEmail").val();
		var workEmail = $("#workEmail").val();
		var homeAddress = $("#homeAddress").val();
		var workAddress = $("#workAddress").val();
		var website = $("#website").val();
		var facebook = $("#facebook").val();
		var linkedin = $("#linkedin").val();
		var b = /^(?![0-9]*$)[a-zA-Z0-9 ]+$/
		var a = /^[0-9]{10}$/gm
		var az = /^[0-9]{5,6}$/gm
		if(fullName == "" || fullName == null)
		{
			alert("Full name is required.");
		}
		else if(!b.test(fullName))
		{
			alert("Full Name is invalid.");
		}
		else if(personalNumber == "" || personalNumber == null)
		{
			alert("Personal number is required.");
		}
		else if(!a.test(personalNumber))
		{
			var message = "Please enter valid personal number.";
			alert(message);
		}
		else
		{
			if(personalEmail !== "" || personalEmail !== null)
			{
				if(!validateEmail(personalEmail.trim()))
				{
					var message = "Please enter valid personal email.";
					alert(message);
					return;
				}
			}
			if(workEmail !== "" || workEmail !== null)
			{
				if(!validateEmail(workEmail.trim()))
				{
					var message = "Please enter valid work email.";
					alert(message);
					return;
				}
			}
			var oldTagNamesValue = $("#tagNames").val();
			if(oldTagNamesValue == "")
			{
				var tags = [];
			}
			else
			{
				var tags = oldTagNamesValue.split(",");
			}
			var data = {
				"userId": Meteor.userId(),
				"fullName": fullName,
				"contactTitle": contactTitle,
				"company": company,
				"workNumber": workNumber,
				"personalNumber": personalNumber,
				"workEmail": workEmail,
				"personalEmail": personalEmail,
				"homeAddress": homeAddress,
				"workAddress": workAddress,
				"website": website,
				"facebook": facebook,
				"linkedin": linkedin,
				"contactTags": tags
			}
			Meteor.call("addNewContact", data, function(err, res){
				if(err)
				{
					alert(err.reason);
				}
				else
				{
					
					if(Meteor.isCordova)
					{
						if($("#selectOverlayFileHidden").val() == "" && profilePhoto.length == 0)
						{
							alert("Contact was added successfully.");
							setTimeout(function(){
								Router.go("/");
							},1000);
						}
						else
						{
							if(profilePhoto.length > 0)
							{
								Cloudinary.upload(profilePhoto[0], {}, function(err, res1){
							        if(err)
							        {
							            console.log(err);
							        }
							        else
							        {
							            console.log(res);
							            Meteor.call("setContactProfilePic", res1, res, function(err11, res11){
											console.log(res11);
											console.log(err11);
											alert("Contact was added successfully.");
										});
							            
							        }
							    });
							}
							else
							{
								var fileElment = $("#selectOverlayFileHiddenContact").val();
								window.resolveLocalFileSystemURL(fileElment, function (fileEntry) {
									fileEntry["type"] = "image/";
									fileEntry.file(function (file) {
										profilePhoto = [];
										profilePhoto.push(file);
										Cloudinary.upload(profilePhoto[0], {}, function(err, res1){
									        if(err)
									        {
									            console.log(err);
									        }
									        else
									        {
									            console.log(res);
									            Meteor.call("setContactProfilePic", res1, res, function(err11, res11){
													console.log(res11);
													console.log(err11);
													alert("Contact was added successfully.");
												});
									            
									        }
									    });
									});
								});
							}
						}
					}
					else
					{
						if(profilePhoto.length > 0)
						{
							Cloudinary.upload(profilePhoto[0], {}, function(err, res1){
						        if(err)
						        {
						            console.log(err);
						        }
						        else
						        {
						            console.log(res);
						            Meteor.call("setContactProfilePic", res1, res, function(err11, res11){
										console.log(res11);
										console.log(err11);
										alert("Contact was added successfully.");
									});
						            
						        }
						    });
						}
						else
						{
							alert("Contact was added successfully.");
						}
					}
					Router.go("/");
				}
			});
		}
	},
	'click .profilePhotoPreview': function(e){
		e.preventDefault();
		console.log("test");
		if(!Meteor.isCordova)
		{
			$("#profilePhotoFile").click()
		}
		else
		{
			openMenu("selectFileOverlay");
		}
	},

	/*'click .addNewProfilePic':function(e){
		e.preventDefault();
		console.log("test");
		if(!Meteor.isCordova)
		{
			$("#profilePhotoFile").click()
		}
		else
		{
			openMenu("selectFileOverlay");
		}
	},*/
	'click .addNewCameraButton': function(e){
		e.preventDefault();
		console.log("test");
		if(!Meteor.isCordova)
		{
			$("#profilePhotoFile").click()
		}
		else
		{
			openMenu("selectFileOverlay");
		}
	},
	'change #profilePhotoFile': function(e)
	{
		var fileSelected = e.currentTarget.files[0];
		if(fileSelected.type.indexOf("image/") < 0)
		{
			$("#profilePhotoFile").val("");
			alert("Please select image file only.");
		}
		else
		{
			profilePhoto = [];
			profilePhoto.push(fileSelected);
			var reader = new FileReader();
			reader.onload = (function(theFile) {
				$(".selectFileOverlay .overlayBackground").hide();
				return function(e) {
					$("#profilePhotoPreview").attr("src", e.target.result);
				};
			})(fileSelected);
			orientation(fileSelected, function(base64img, value) {
                // $('#placeholder1').attr('src', base64img);				                    
                // console.log(rotation[value]);
                var rotated = $('#profilePhotoPreview').attr('src', base64img);
                if(value) {
                  rotated.css('transform', rotation[value]);
                  // console.log("value",rotated.css('transform', rotation[value]));
                }
            });
			reader.readAsDataURL(fileSelected);
		}
	},
	'click .addTagsIcon': function(e)
	{
		e.preventDefault();
		openMenu("tagOverlay");
		// var getTagName = prompt("Tag Name: ");
		// var oldTagNamesValue = $("#tagNames").val();
		// if(oldTagNamesValue == "")
		// {
		// 	var tags = [];
		// }
		// else
		// {
		// 	var tags = oldTagNamesValue.split(",");
		// }
		// if(getTagName !== "" && getTagName !== null)
		// {
		// 	if(tags.indexOf(getTagName) < 0)
		// 	{
		// 		tags.push(getTagName);
		// 		$(".tagsUL").append('<li><div class="tag"><p class="left">'+getTagName+'</p><p class="right deleteButton">X</p></div></li>');
		// 	}
		// }
		// $("#tagNames").val(tags.toString());

	},
	'click .right.deleteButton': function(e)
	{
		e.preventDefault();
		var tagName = $(e.target).prev("p").html();
		var colorName = $(e.target).prev("p").attr("data-color");
		var oldTagNamesValue = $("#tagNames").val();
		if(oldTagNamesValue == "")
		{
			var tags = [];
		}
		else
		{
			var tags = oldTagNamesValue.split(",");
		}
		var newTags = [];
		for(var i = 0; i < tags.length; i++)
		{
			console.log("tagNamecolorName", tagName+"_"+colorName);
			if(tags[i] != tagName+"_"+colorName)
			{
				newTags.push(tags[i]);
			}
		}
		$("#tagNames").val(newTags.toString());
		$(e.target).parent().parent().remove();
	}
});


var contactAddList = new ReactiveVar([]);
var contactAddListSearch = new ReactiveVar([]);
Template.addContactsFromDevice.onCreated(function(){
	Meteor.subscribe("getUserContacts", Meteor.userId());
});
Template.addContactsFromDevice.onRendered(function(){
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	options.desiredFields = [];
	var filter = ["displayName", "phoneNumbers"];
	navigator.contacts.find(filter, contactSuccess, contactError, options);
	contactAddListSearch.set([]);
});
Template.addContactsFromDevice.helpers({
	showSearchBar:function(){
		var c = contactAddListSearch.get();
		if(contactAddListSearch.get().length > 0)
		{
			var c = contactAddListSearch.get()
		}
		else
		{
			var c =  contactAddList.get();
		}
		var finalList = [];
		for(var i = 0; i < c.length ; i++)
		{
			if(isNotAddedInContacts(c[i]))
			{
				finalList.push(c[i]);
			}
		}

		if(finalList.length > 1){
			return true;
		}
		else{
			return false;
		}
		// return finalList.length;
	},
	getContactList: function()
	{
		console.log(contactAddList);
		if($(".addnewcontactsfromdevice #searchTextBoxInvite").val() !== "")
		{
			var c = contactAddListSearch.get();
		}
		else
		{
			if(contactAddListSearch.get().length > 0)
			{
				var c = contactAddListSearch.get()
			}
			else
			{
				var c =  contactAddList.get();
			}
		}
		var finalList = [];
		for(var i = 0; i < c.length ; i++)
		{
			if(isNotAddedInContacts(c[i]))
			{
				finalList.push(c[i]);
			}
		}
		return finalList
	},
	getContactListCount: function(){
		if($(".addnewcontactsfromdevice #searchTextBoxInvite").val() !== "")
		{
			var c = contactAddListSearch.get();
		}
		else
		{
			if(contactAddListSearch.get().length > 0)
			{
				var c = contactAddListSearch.get()
			}
			else
			{
				var c =  contactAddList.get();
			}
		}
		var finalList = [];
		for(var i = 0; i < c.length ; i++)
		{
			if(isNotAddedInContacts(c[i]))
			{
				finalList.push(c[i]);
			}
		}
		return finalList.length;
	}
});
Template.addContactsFromDevice.events({
	'click .addButton': function(e)
	{
		e.preventDefault();
		var rawId = $(e.target).attr("data-rawid");
		if($(".addnewcontactsfromdevice #searchTextBoxInvite").val() !== "")
		{
			var c = contactAddListSearch.get();
		}
		else
		{
			if(contactAddListSearch.get().length > 0)
			{
				var c = contactAddListSearch.get()
			}
			else
			{
				var c =  contactAddList.get();
			}
		}
		var cc;
		for(var i = 0; i < c.length ; i++)
		{
			if(c[i].otherFields.rawId == rawId)
			{
				cc = c[i];
			}
		}
		if(cc.otherFields.organizations !== null)
		{
			var contactTitle = cc.otherFields.organizations[0].title;
			var contactCompany = cc.otherFields.organizations[0].name;
		}
		else
		{
			var contactTitle = "";
			var contactCompany = "";
		}
		var homeAddress = "";
		var workAddress = "";
		if(cc.otherFields.addresses !== null)
		{
			
			for(var i = 0; i < cc.otherFields.addresses.length; i++)
			{
				var r = cc.otherFields.addresses[i];
				if(r.type == "work")
				{
					workAddress = r.formatted;
				}
				if(r.type == "home" || r.type == "other")
				{
					homeAddress = r.formatted;
				}
			}
		}
		var website = "";
		if(cc.otherFields.urls !== null)
		{
			for(var i = 0; i < cc.otherFields.urls.length; i++)
			{
				var r = cc.otherFields.urls[i];
				if(r.type == "other")
				{
					website = r.value;
				}
			}
		}
		var phoneNumber = cc.contactNumber
		phoneNumber = phoneNumber.replace("(","");
		phoneNumber = phoneNumber.replace(")","");
		phoneNumber = phoneNumber.split(' ').join('');
		phoneNumber = phoneNumber.replace("-","");
		var phoneNumber1 = cc.contactWorkNumber
		phoneNumber1 = phoneNumber1.replace("(","");
		phoneNumber1 = phoneNumber1.replace(")","");
		phoneNumber1 = phoneNumber1.split(' ').join('');
		phoneNumber1 = phoneNumber1.replace("-","");
		var contactInsertData = {
			"userId": Meteor.userId(),
			"fullName": cc.contactName,
			"contactTitle": contactTitle,
			"company": contactCompany,
			"workNumber": phoneNumber1,
			"personalNumber": phoneNumber,
			"workEmail": cc.contactWorkEmail,
			"personalEmail": cc.contactPersonalEmail,
			"homeAddress": homeAddress,
			"workAddress": workAddress,
			"website": website,
			"facebook": "",
			"linkedin": "",
			"contactTags": []
		}
		console.log(contactInsertData);
		Meteor.call("addNewContact", contactInsertData, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				alert("Contact added successfully.");
			}
		});
	},
	'click .allAddButton': function(e)
	{
		e.preventDefault();
		if($(".addnewcontactsfromdevice #searchTextBoxInvite").val() !== "")
		{
			var c = contactAddListSearch.get();
		}
		else
		{
			if(contactAddListSearch.get().length > 0)
			{
				var c = contactAddListSearch.get()
			}
			else
			{
				var c =  contactAddList.get();
			}
		}
		var finalList = [];
		for(var i = 0; i < c.length ; i++)
		{
			if(isNotAddedInContacts(c[i]))
			{
				finalList.push(c[i]);
			}
		}
		var cc;
		cc = finalList;
		console.log(cc);
		var contactInsertData = [];
		for(var j = 0; j < cc.length; j++)
		{
			var rec = cc[j];
			console.log(rec);
			if(typeof rec !== "undefined")
			{
				if(rec.otherFields.organizations !== null)
				{
					var contactTitle = rec.otherFields.organizations[0].title;
					var contactCompany = rec.otherFields.organizations[0].name;
				}
				else
				{
					var contactTitle = "";
					var contactCompany = "";
				}
				var homeAddress = "";
				var workAddress = "";
				if(rec.otherFields.addresses !== null)
				{
					
					for(var i = 0; i < rec.otherFields.addresses.length; i++)
					{
						var r = rec.otherFields.addresses[i];
						if(r.type == "work")
						{
							workAddress = r.formatted;
						}
						if(r.type == "home" || r.type == "other")
						{
							homeAddress = r.formatted;
						}
					}
				}
				var website = "";
				if(rec.otherFields.urls !== null)
				{
					for(var i = 0; i < rec.otherFields.urls.length; i++)
					{
						var r = rec.otherFields.urls[i];
						if(r.type == "other")
						{
							website = r.value;
						}
					}
				}
				var phoneNumber = rec.contactNumber
				phoneNumber = phoneNumber.replace("(","");
				phoneNumber = phoneNumber.replace(")","");
				phoneNumber = phoneNumber.split(' ').join('');
				phoneNumber = phoneNumber.replace("-","");
				var phoneNumber1 = rec.contactWorkNumber
				phoneNumber1 = phoneNumber1.replace("(","");
				phoneNumber1 = phoneNumber1.replace(")","");
				phoneNumber1 = phoneNumber1.split(' ').join('');
				phoneNumber1 = phoneNumber1.replace("-","");
				var dd = {
					"userId": Meteor.userId(),
					"fullName": rec.contactName,
					"contactTitle": contactTitle,
					"company": contactCompany,
					"workNumber": phoneNumber1,
					"personalNumber": phoneNumber,
					"workEmail": rec.contactWorkEmail,
					"personalEmail": rec.contactPersonalEmail,
					"homeAddress": homeAddress,
					"workAddress": workAddress,
					"website": website,
					"facebook": "",
					"linkedin": "",
					"contactTags": []
				}
				contactInsertData.push(dd);
			}
		}
		console.log(contactInsertData);
		$(".waitingOverlay .overlayBackground").fadeIn();
		Meteor.call("addNewContactMultiple", contactInsertData, function(err, res){
			if(err)
			{
				$(".waitingOverlay .overlayBackground").fadeOut();
				alert(err.reason);
			}
			else
			{
				$(".waitingOverlay .overlayBackground").fadeOut();
				alert("Contacts was added successfully.");
			}
		});
	},
	'click .backbuttontopnav':function(e)
	{
		Router.go("/");
	},
	'keyup #searchTextBoxInvite': function(e)
	{
		var val = $(e.target).val();
		var searchArray = contactAddListSearch.get();
		if(val == "" || val == null)
		{
			contactAddListSearch.set([]);
		}
		else
		{
			var allContacts = contactAddList.get();
			var filteredContacts = [];
			for(var i = 0; i < allContacts.length; i++)
			{
				var displayName = allContacts[i].contactName.toLowerCase();
				if(displayName.indexOf(val.toLowerCase()) >= 0)
				{
		    		filteredContacts.push(allContacts[i]);
				}
				else {
					var phoneNumbers = allContacts[i].contactNumber;
					if(phoneNumbers.indexOf(val.toLowerCase()) >= 0)
					{
						filteredContacts.push(allContacts[i]);
					}
				}
			}
			if(filteredContacts.length > 0)
			{
				if(JSON.stringify(searchArray) !== JSON.stringify(filteredContacts))
			    {
			    	contactAddListSearch.set(filteredContacts);
			    }
			}
			else
			{
				contactAddListSearch.set([]);
			}
		}
	}
});
function contactSuccess(contacts) {
    var checkedContacts = [];
    var tempContacts = [];
    for(var i = 0; i < contacts.length; i++)
    {
    	console.log(contacts[i]);
    	var checkC = checkContact(contacts[i]);
    	if(checkC)
    	{
    		if(tempContacts.indexOf(contacts[i].phoneNumbers[0].value) < 0)
    		{
    			var c = {
	    			"contactName": contacts[i].displayName,
	    			"contactNumber": getNumber(contacts[i],"home"),
	    			"contactWorkNumber": getNumber(contacts[i],"work"),
	    			"contactPersonalEmail": getEmail(contacts[i],"home"),
	    			"contactWorkEmail": getEmail(contacts[i],"work"),
	    			"contactImage": getPhoto(contacts[i]),
	    			"otherFields": contacts[i]
	    		}
    			if(1)
    			{
		    		checkedContacts.push(c);
		    		tempContacts.push(contacts[i].phoneNumbers[0].value);
    			}
    		}
    	}
    }
    if(JSON.stringify(contactAddList) !== JSON.stringify(checkedContacts))
    {
    	contactAddList.set(checkedContacts);
    }
};
function contactError(contactError) {
	console.log(contactError);
    alert('Error occured while fetching contacts. Please try after sometime');
};
function checkContact(contact)
{
	if(contact.phoneNumbers == null)
	{
		return false;
	}
	else if(contact.displayName == null)
	{
		return false;
	}
	{
		return true;
	}
}
function getEmail(contact, type)
{
	if(contact.emails == null)
	{
		return "";
	}
	else
	{
		var ee = contact.emails;
		var emailAdd = "";
		if(type == "work")
		{
			for(var i = 0; i < ee.length; i++)
			{
				if(ee[i].type == "work" || ee[i].type == "Work")
				{
					emailAdd = ee[i].value;
				}
			}
		}
		else
		{
			for(var i = 0; i < ee.length; i++)
			{
				if(ee[i].type == "home" || ee[i].type == "Home" || ee[i].type == "other" || ee[i].type == "Other" || ee[i].type == "mobile" || ee[i].type == "Mobile")
				{
					emailAdd = ee[i].value;
					break;
				}
			}
		}
		return emailAdd;
	}
}
function getNumber(contact, type)
{
	if(contact.phoneNumbers == null)
	{
		return "";
	}
	else
	{
		var ee = contact.phoneNumbers;
		var emailAdd = "";
		if(type == "work")
		{
			for(var i = 0; i < ee.length; i++)
			{
				if(ee[i].type == "work" || ee[i].type == "Work")
				{
					emailAdd = ee[i].value;
					break;
				}
			}
		}
		else
		{
			for(var i = 0; i < ee.length; i++)
			{
				if(ee[i].type == "home" || ee[i].type == "Home" || ee[i].type == "other" || ee[i].type == "Other" || ee[i].type == "mobile" || ee[i].type == "Mobile")
				{
					emailAdd = ee[i].value;
					break;
				}
			}
		}
		return emailAdd;
	}
}
function getPhoto(contact)
{
	if(contact.photos == null)
	{
		return "";
	}
	else
	{
		return contact.photos[0].value;
	}
}
function isNotAddedInContacts(contact)
{
	var emailAdd = contact.contactPersonalEmail;
	var emailAdd1 = contact.contactWorkEmail;
	var emailAddRecs = userContacts.find({
		$or: [
			{
				"personalEmail": emailAdd
			},
			{
				"workEmail": emailAdd1
			}
		]
	});
	var phoneNumber = contact.contactNumber;
	var phoneNumber1 = contact.contactWorkNumber;
	console.log(phoneNumber);
	phoneNumber = phoneNumber.replace("+","");
	phoneNumber = phoneNumber.replace("*","");
	phoneNumber = phoneNumber.replace("#","");
	phoneNumber = phoneNumber.replace("(","");
	phoneNumber = phoneNumber.replace(")","");
	phoneNumber = phoneNumber.replace("-","");
	phoneNumber = phoneNumber.split(' ').join('');
	phoneNumber1 = phoneNumber1.replace("+","");
	phoneNumber1 = phoneNumber1.replace("*","");
	phoneNumber1 = phoneNumber1.replace("#","");
	phoneNumber1 = phoneNumber1.replace("(","");
	phoneNumber1 = phoneNumber1.replace(")","");
	phoneNumber1 = phoneNumber1.split(' ').join('');
	phoneNumber1 = phoneNumber1.replace("-","");
	console.log(phoneNumber);
	var phoneNumberRecs = userContacts.find({
		$or: [
			{
				"personalNumber": new RegExp(phoneNumber,"i")
			},
			{
				"workNumber": new RegExp(phoneNumber1,"i")
			}
		]
	});
	if(emailAddRecs.count() == 0 && phoneNumberRecs.count() == 0)
	{
		return true;
	}
	else
	{
		return false;
	}
}

Template.editContact.onRendered(function(){
	$("#workNumber").inputmask();
	$("#personalNumber").inputmask();
});
Template.editContact.events({
	'click .backbuttontopnav': function()
	{
		var a = appHistoryPull();
		Router.go(a);		
	},
	'click .profilePhotoPreview': function(e){
		e.preventDefault();
		console.log("test");
		if(!Meteor.isCordova)
		{
			$("#profilePhotoFile").click()
		}
		else
		{
			openMenu("selectFileOverlay");
		}
	},
	'click .addTagsIcon': function(e)
	{

		e.preventDefault();
		openMenu("tagOverlay");

		// e.preventDefault();
		// var getTagName = prompt("Tag Name: ");
		// var oldTagNamesValue = $("#tagNames").val();
		// if(oldTagNamesValue == "")
		// {
		// 	var tags = [];
		// }
		// else
		// {
		// 	var tags = oldTagNamesValue.split(",");
		// }
		// if(getTagName !== "" && getTagName !== null)
		// {
		// 	if(tags.indexOf(getTagName) < 0)
		// 	{
		// 		tags.push(getTagName);
		// 		$(".tagsUL").append('<li><div class="tag"><p class="left">'+getTagName+'</p><p class="right deleteButton">X</p></div></li>');
		// 	}
		// }
		// $("#tagNames").val(tags.toString());

	},
	'click .right.deleteButton': function(e)
	{
		e.preventDefault();
		var tagName = $(e.target).prev("p").html();
		console.log("tagName",tagName);
		var oldTagNamesValue = $("#tagNames").val();
		// console.log("oldTagNamesValue",oldTagNamesValue);
		if(oldTagNamesValue == "")
		{
			var tags = [];
		}
		else
		{
			var tags = oldTagNamesValue.split(",");
			console.log("tags",tags)
		}
		var newTags = [];
		for(var i = 0; i < tags.length; i++)
		{
			var name = tags[i].split('_');
			if(name[0] != tagName)
			{

				console.log("tagName tags"+[i],tags[i]);
				newTags.push(tags[i]);
			}
		}
		console.log("newTags",newTags.toString());
		$("#tagNames").val(newTags);
		$(e.target).parent().parent().remove();
	},
	'click .addNewCameraButton': function(e){
		e.preventDefault();
		console.log("test12");
		if(!Meteor.isCordova)
		{
			$("#profilePhotoFile").click()
		}
		else
		{
			$(".selectFileOverlay .overlayBackground").fadeIn();
			$(".selectFileOverlay .overlayBody").fadeIn();

			// $(".selectFileOverlay .overlayBackground").fadeIn();
		}
	},

	
	
	'change #profilePhotoFile': function(e)
	{
		var fileSelected = e.currentTarget.files[0];
		if(fileSelected.type.indexOf("image/") < 0)
		{
			$("#profilePhotoFile").val("");
			alert("Please select image file only.");
		}
		else
		{
			profilePhoto = [];
			profilePhoto.push(fileSelected);
			var reader = new FileReader();
			reader.onload = (function(theFile) {
				$(".selectFileOverlay .overlayBackground").hide();
				return function(e) {
					$("#profilePhotoPreview").attr("src", e.target.result);
				};
			})(fileSelected);
			orientation(fileSelected, function(base64img, value) {
                // $('#placeholder1').attr('src', base64img);				                    
                // console.log(rotation[value]);
                var rotated = $('#profilePhotoPreview').attr('src', base64img);
                if(value) {
                  rotated.css('transform', rotation[value]);
                  // console.log("value",rotated.css('transform', rotation[value]));
                }
            });
			reader.readAsDataURL(fileSelected);
		}
	},
	'click #editContactSaveButton': function(e)
	{
		e.preventDefault();
		var fullName = $("#fullName").val();
		var contactTitle = $("#contactTitle").val();
		var company = $("#company").val();
		// var workNumber = $("#workNumber").val();
		// var personalNumber = $("#personalNumber").val();

		var workNumber = $("#workNumber").val();
		workNumber = workNumber.replace(/[()-]/g,"");
		var personalNumber = $("#personalNumber").val();
		personalNumber = personalNumber.replace(/[()-]/g,"");


		var personalEmail = $("#personalEmail").val();
		var workEmail = $("#workEmail").val();
		var homeAddress = $("#homeAddress").val();
		var workAddress = $("#workAddress").val();
		var website = $("#website").val();
		var facebook = $("#facebook").val();
		var linkedin = $("#linkedin").val();

		var b = /^(?![0-9]*$)[a-zA-Z0-9 ]+$/
		var a = /^[0-9]{10}$/gm
		var az = /^[0-9]{5,6}$/gm
		if(fullName == "" || fullName == null)
		{
			alert("Full name is required.");
		}
		else if(!b.test(fullName))
		{
			alert("Full Name is invalid.");
		}
		else if(personalNumber == "" || personalNumber == null)
		{
			alert("Personal number is required.");
		}
		else if(!a.test(personalNumber))
		{
			var message = "Please enter valid personal number.";
			alert(message);
		}
		else
		{
			if(personalEmail !== "" || personalEmail !== null)
			{
				if(!validateEmail(personalEmail.trim()))
				{
					var message = "Please enter valid personal email.";
					alert(message);
					return;
				}
			}
			if(workEmail !== "" || workEmail !== null)
			{
				if(!validateEmail(workEmail.trim()))
				{
					var message = "Please enter valid work email.";
					alert(message);
					return;
				}
			}
			var oldTagNamesValue = $("#tagNames").val();
			if(oldTagNamesValue == "")
			{
				var tags = [];
			}
			else
			{
				var tags = oldTagNamesValue.split(",");
			}
			var data = {
				"fullName": fullName,
				"contactTitle": contactTitle,
				"company": company,
				"workNumber": workNumber,
				"personalNumber": personalNumber,
				"workEmail": workEmail,
				"personalEmail": personalEmail,
				"homeAddress": homeAddress,
				"workAddress": workAddress,
				"website": website,
				"facebook": facebook,
				"linkedin": linkedin,
				"contactTags": tags
			}
			var userId = Template.instance().data.id;
			var userDetails = userContacts.find({
				"_id": userId
			});
			if(userDetails) {
				var aaa = userContacts.findOne({
					"_id": userId
				});
				$(".waitingOverlay .overlayBackground").toggle("fade");
				Meteor.call("editNewContact", aaa._id, data, function(err, res){
					if(err)
					{
						alert(err.reason);
					}
					else
					{
						
						if(Meteor.isCordova)
						{
							if($("#selectOverlayFileHidden").val() == "" && profilePhoto.length == 0)
							{
								$(".waitingOverlay .overlayBackground").toggle("fade");
								alert("Contact was edited successfully.");
								setTimeout(function(){
									Router.go("/");
								},1000);
							}
							else
							{
								if(profilePhoto.length > 0)
								{
									console.log("Mukesh 1");
									Cloudinary.upload(profilePhoto[0], {}, function(err, res1){
								        if(err)
								        {
								            console.log(err);
								        }
								        else
								        {
								            console.log(res);
								            Meteor.call("setContactProfilePic", res1, aaa._id, function(err11, res11){
												console.log(res11);
												console.log(err11);
												$(".waitingOverlay .overlayBackground").toggle("fade");
												alert("Contact was edited successfully.");
												setTimeout(function(){
													Router.go("/");
												},1000);
											});
								            
								        }
								    });
								}
								else
								{
									console.log("Mukesh 2");
									var fileElment = $("#selectOverlayFileHiddenContact").val();
									window.resolveLocalFileSystemURL(fileElment, function (fileEntry) {
										fileEntry["type"] = "image/";
										fileEntry.file(function (file) {
											profilePhoto = [];
											profilePhoto.push(file);
											Cloudinary.upload(profilePhoto[0], {}, function(err, res1){
										        if(err)
										        {
										            console.log(err);
										        }
										        else
										        {
										            console.log(res);
										            profilePhoto = [];
										            Meteor.call("setContactProfilePic", res1, aaa._id, function(err11, res11){
														console.log(res11);
														console.log(err11);
														$(".waitingOverlay .overlayBackground").toggle("fade");
														alert("Contact was edited successfully.23");
														setTimeout(function(){
															Router.go("/");
														},1000);
													});
										            
										        }
										    });
										});
									});
								}
							}
						}
						else
						{
							if(profilePhoto.length > 0)
							{
								Cloudinary.upload(profilePhoto[0], {}, function(err, res1){
							        if(err)
							        {
							            console.log(err);
							        }
							        else
							        {
							            console.log(res);
							            Meteor.call("setContactProfilePic", res1, aaa._id, function(err11, res11){
											console.log(res11);
											console.log(err11);
											$(".waitingOverlay .overlayBackground").toggle("fade");
											alert("Contact was edited successfully.");
											setTimeout(function(){
												Router.go("/");
											},1000);
										});
							            
							        }
							    });
							}
							else
							{
								$(".waitingOverlay .overlayBackground").toggle("fade");
								alert("Contact was edited successfully.");
								Router.go("/");
							}
						}
						
					}
				});
			}
		}
	},
});
Template.editContact.helpers({
	getDetails: function(){
		var contactDetails = userContacts.find({
			"_id": Template.instance().data.id
		});
		if(contactDetails.count() > 0)
		{
			contactDetails = userContacts.findOne({
				"_id": Template.instance().data.id
			});
			console.log(contactDetails.profilePic);
			console
			return contactDetails;
		}
		/*var userId = Template.instance().data.id;
		var userDetails = Meteor.users.findOne({
			"_id": userId
		});
		if(userDetails) {
			return userContacts.findOne({
				$or: [
					{"personalEmail":userDetails.username},
					{"workEmail":userDetails.username},
				], 
				userId: Meteor.userId()
			});
		}*/
	},
	profilePhotoEdit: function(){
		var contactDetails = userContacts.find({
			"_id": Template.instance().data.id
		});
		if(contactDetails.count() > 0)
		{
			contactDetails = userContacts.findOne({
				"_id": Template.instance().data.id
			});
			console.log(contactDetails.profilePic);
			var profilePic = contactDetails.profilePic;
			var match = profilePic.match(/http:/g);
			if(match == "http:"){
				var a = profilePic.replace("http://","https://");
				return a;
			}
			else{
				return profilePic;	
			}
		}
	},
	nameOfTag: function(){
		console.log("thistage",this);
		var name = this.split('_');
		console.log("name",name);
		return name[0];
	},
	colorOfTag: function(){
		console.log("thistage",this);
		var color = this.split('_');
		if(color[1] == undefined){
			return "161617";
		}
		else{
			console.log("color",color[1]);
			return color[1];
		}
		
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
