Template.emailSupport.onCreated(function(){});
Template.emailSupport.onRendered(function(){
	/*var windowHeight = $(window).height();
	var topHeaderHeight = $(".topHeader").outerHeight();
	$(".middleContent").css("height",(windowHeight - topHeaderHeight) + "px");*/
	$( "#emailBody" ).keyup( function() {
	   $( "#output_div" ).html( $( this ).val().replace(/\n/g, '<br />') );
	});
});
Template.emailSupport.helpers({});
Template.emailSupport.events({
	'click .backbuttontopnav': function(e)
	{
		Router.go("/accounts");
	},
	'click .emailSupportCancel': function(e)
	{
		Router.go("/accounts");
	},
	'click #emailSupportSendButton': function(e)
	{
		var to = $("#toTextBox").val();
		var from = $("#ccbcc").val();
		var temp =[];
		if(to == "" && from == ""){
			alert("Please Enter Receipents.");
		}
		else{
			
			if(to !== ""){
				temp = to.split(",");
			}
			if(from !== ""){
				var a =  from.split(",");
				for(var j =0;j<a.length; j++){
					temp.push(a[j]);
				}
			}
			console.log("temp",temp);
			var mainUser = Meteor.user();
			var username = mainUser.username;
			var checkUser =  temp.indexOf(username);
			if(checkUser >= 0){
				alert("You cannot use logged in user email id.");
			}
			else{
				console.log("temp222",temp);
				var validMail = validateMultipleEmail(temp);
				console.log("validMail",validMail);
				var results = validMail.result;
				if(results == false){
					alert(validMail.message);
				}
				else{
					var subject = $("#subject").val();
					var emailBody = $("#emailBody").val();
					emailBody.replace("\n","<br>");
					if(to == "" || to == null)
					{
						alert("Please enter to email");
					}
					else if(subject == "" || subject == null)
					{
						alert("Please enter to subject");
					}
					else if(emailBody == "" || emailBody == null)
					{
						alert("Please enter something in message");
					}
					else
					{			
						if(from !== null || from !== "")
						{
							to = to + "," + from;
						}
						emailBody = $( "#output_div" ).html();
						Meteor.call(
						  'sendEmail',
						  to.split(","),
						  from,
						  subject,
						  emailBody
						);
						alert("Email was send successfully.");
						Router.go("/accounts");
					}
				}	
			}
		}			
	},
	'click #addMoreEmail': function(e)
	{
		e.preventDefault();
		var email = prompt("Email:");
		var toTextBox = $("#toTextBox");
		if(email !== null)
		{
			if(email.trim() !== "")
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
			{
				if(toTextBox.val().trim() == "")
				{
					toTextBox.val(email);
				}
				else
				{
					toTextBox.val(toTextBox.val() + ", " + email);
				}
			}
			else
			{
				alert("Please enter valid email address.");
			}
		}
	}
});