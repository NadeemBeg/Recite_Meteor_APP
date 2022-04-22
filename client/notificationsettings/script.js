Template.notificationsettings.onCreated(function(){});
Template.notificationsettings.onRendered(function(){});
Template.notificationsettings.events({
	'click .backbuttontopnav': function(e)
	{
		Router.go('/accounts');
	},
	'change #notificationActive': function(e)
	{
		e.preventDefault();
		console.log("test notificationActive");
		var result = $(e.target).is(":checked");
		var optionsChecked = $("input[name='notificationActive']").is(":checked");
		if(!optionsChecked)
		{
			var alwaysOn = true;
			var eighttoeight = false;
			var off = false;
		}
		else
		{
			var val = $("input[name='notificationActive']:checked").val();
			switch(val) {
			  case "0":
			    var alwaysOn = true;
				var eighttoeight = false;
				var off = false;
			    break;
			  case "1":
			    var alwaysOn = false;
				var eighttoeight = true;
				var off = false;
			    break;
			  case "2":
			    var alwaysOn = false;
				var eighttoeight = false;
				var off = true;
			    break;
			}
		}
		Meteor.call("setNotificationSettings", Meteor.userId(), result, alwaysOn, eighttoeight, off, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				// alert("Notification settings was saved successfully.");
			}
		});
	},
	"change input[name='pushradio']": function(e)
	{
		e.preventDefault();
		console.log("test input[name='pushradio']");
		var val = $("input[name='pushradio']:checked").val();
		console.log(val);
		switch(val) {
		  case "0":
		    var alwaysOn = true;
			var eighttoeight = false;
			var off = false;
		    break;
		  case "1":
		    var alwaysOn = false;
			var eighttoeight = true;
			var off = false;
		    break;
		  case "2":
		    var alwaysOn = false;
			var eighttoeight = false;
			var off = true;
		    break;
		}
		Meteor.call("setNotificationSettingsValues", Meteor.userId(), alwaysOn, eighttoeight, off, function(err, res){
			if(err)
			{
				alert(err.reason);
			}
			else
			{
				// alert("Notification settings was saved successfully.");
			}
		});
	}
});
Template.notificationsettings.helpers({
	getUserData: function(){
		var a =  Meteor.user();
		if(typeof a !== "undefined")
		{
			return a.profile;
		}
	}
});