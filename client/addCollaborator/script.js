Template.addCollaboratorpage.onCreated(function(){});
Template.addCollaboratorpage.onRendered(function(){
	$(".copytocontacts.contactslistsearch").hide();
	$(".copytocontacts.projectlistsearch").hide();
});
Template.addCollaboratorpage.helpers({});
Template.addCollaboratorpage.events({
	'click .addMasterFolder':function(e){
		appHistoryPush("/folder/new");
		Router.go("/folder/new");
	},
	'click .backbuttontopnav': function(e){
		var a = appHistoryPull();
		console.log(a);
		Router.go(a);
	},
	'click #addEmailButton': function(e)
	{
		e.preventDefault();
		$.confirm({
		    title: '',
		    content: '' +
		    '<form action="" class="formName">' +
		    '<div class="form-group">' +
		    '<label>Enter email address</label>' +
		    '<input type="text" placeholder="Email" class="name form-control" required />' +
		    '</div>' +
		    '</form>',
		    buttons: {
		        formSubmit: {
		            text: 'Submit',
		            btnClass: 'btn-blue',
		            action: function () {
		                var c = this.$content.find('.name').val();
		                if($("#recipientEmail").val() == '')
						{
							// var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
							var re = validateEmail(c);
							 // var emails = re.test(String(c).toLowerCase());
							 var emails = re;
							 console.log("emails",emails);
							 console.log("emails", emails);
							 if(emails !== false){
							 	$("#recipientEmail").val(c);
							 }
							 else{
							 	if(c !== null){
							 		alert("Enter vaild email");
							 	}
							 }
						}
						else
						{
							// var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
							var re = validateEmail(c);
							 // var emails = re.test(String(c).toLowerCase());
							 var emails = re;
							 console.log("emails", emails);
							 if(emails !== false){
							 	$("#recipientEmail").val($("#recipientEmail").val() + "," + c);
							 }
							 else{
							 	if(c !== null){
							 		alert("Enter vaild email");
							 	}
							 	// alert("Enter vaild email");
							 }	
						}
		            }
		        },
		        cancel: function () {
		            //close
		        },
		    },
		    onContentReady: function () {
		        // bind to events
		        var jc = this;
		        this.$content.find('form').on('submit', function (e) {
		            // if the user submits the form by pressing enter in the field.
		            e.preventDefault();
		            jc.$$formSubmit.trigger('click'); // reference the button and click it
		        });
		    }
		});



		
		
	},
	'click .goBtn': function(e)
	{
		e.preventDefault();
		var val = $("#searchContact").val();
		if(val == "")
		{
			// alert("Please enter contact name to search.");
			Session.set("searchedContactVal", undefined);
			$(".copytocontacts.contactslistsearch").slideToggle();
		}
		else
		{
			Session.set("searchedContactVal", val);
			$(".copytocontacts.contactslistsearch").slideToggle();
		}
	},
	'click .SelectBtn': function(e){
		e.preventDefault();
		var val = $("#chooseProjects").val();
		if(val == "")
		{
			// alert("Please enter project name to search.");
			Session.set("searchedProjectVal", undefined);
			$(".copytocontacts.projectlistsearch").slideToggle();
		}
		else
		{
			Session.set("searchedProjectVal", val);
			$(".copytocontacts.projectlistsearch").slideToggle();
		}
	},
	'click .sendInvite': function(e)
	{
		e.preventDefault();
		var selectedEmails = $("#recipientEmail").val();
		// var results =[];
		selectedEmails = selectedEmails.split(",");
		var selectedContacts = Session.get("selectedContacts");
		var selectedProjects = Session.get("selectedPorjects");
		var permission = $("input[name='selectPermission']:checked").val();
		if(selectedProjects == undefined || selectedProjects == null){
			alert("Please Select Project.")
			return;
		}
		if(permission == undefined || permission == 0){
			alert("Please select any permission.")
			return;
		}
		
		if(selectedEmails != ""){
			var checkMailValidation = validateMultipleEmail(selectedEmails);
			var results = checkMailValidation.result;
			if(results == false){
				alert(checkMailValidation.message);
				return;
			}
			else{
				console.log("selectedEmails",selectedEmails);
			}
		}
		else if(selectedContacts !== undefined){
		}
		else{
			alert("Please Select Email Address or Contact's Name");
			return;
		}

		console.log("selectedEmails",selectedEmails == "");
		if(selectedEmails == ""){
			selectedEmails = null;
		}
		Meteor.call("addCollaborator", Meteor.userId(), selectedEmails, selectedContacts, selectedProjects, permission, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{

				alert("Collaborator was added successfully.");
				Session.set("selectedContacts",undefined);
				Session.set("selectedPorjects",undefined);
				$("#chooseProjects").val("");
				$("#searchContact").val("");
				Router.go("/collaboratorsPage");
			}
		});
	},
	'click .systemAdminButton': function(e)
	{
		e.preventDefault();
		var selectedEmails = $("#systemAdminEmail").val();
		// var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
		var res= validateEmail(selectedEmails);
		console.log("res",res);
		// var emails = re.test(String(selectedEmails).toLowerCase());
		if(res !== false){
			Meteor.call("addCollaboratorSystemAdmin", Meteor.userId(), selectedEmails, function(err, res){
				if(err)
				{
					alert(err.reason);
				}
				else
				{
					alert("Collaborator was added successfully.");
					$("#systemAdminEmail").val("");
				}
			});
		}
		else{
			alert("Please Enter vaild Email Address");
			return;
		}
	}
});
