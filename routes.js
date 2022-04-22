Router.configure({layoutTemplate: 'layout'});
Transitions.transitionOut = 'slideFadeRightOut';
Transitions.transitionIn = 'slideFadeRightIn';
Router.route('/', function () {
  if(Meteor.isCordova)
  {
    var isFirst = localStorage.getItem("newlyInstalled");
    if(isFirst == null)
    {
      var renderTemplate = "appIntro";
    }
    else if(isFirst == "No")
    {
      var renderTemplate = "appLogin";
    }
    else if(isFirst == "Yes")
    {
      var renderTemplate = "appIntro";
    }
  }
  else
  {
    var renderTemplate = "appLogin";
  }
  this.render(renderTemplate, {
    data: function() { return []; }
  });
});

Router.route('/signin', {
  name: "appLogin"
});
Router.route('/upgrade', {
  name: "storageUpgrade"
});
Router.route('/signup', {
  name: "appSignup"
});
Router.route("/reset-password", 
{
  name: "resetpassword"
});
Router.route("/intro", 
{
  name: "appIntro"
});
Router.route("/verify-number", 
{
  name: "verificationone"
});
Router.route("/verify-code", 
{
  name: "verificationtwo"
});
Router.route("/settings", 
{
  name: "notificationsettings"
});
Router.route("/notifications", 
{
  name: "notifications"
});
Router.route("/fileiconview", 
{
  name: "fileiconview"
});
Router.route("/filelistview", 
{
  name: "fileListView"
});
Router.route("/filelistview/select", 
{
  name: "fileListViewSelect"
});
Router.route("/reports", 
{
  name: "reportsTab"
});
Router.route("/reports-select", 
{
  name: "reportsTabSelect"
});
Router.route("/contacts/list/:_id", 
{
  name: "contactslistsearch",
  data: function () {
    if(this.params._id)
      return {param:this.params._id};
  }
});
Router.route("/clientfile/:_id", 
{
  name: "clientFile",
  data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/folders/:_id", 
{
  name: "userFolders",
  data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/sub-folder/:_id/:_id1", 
{
  name: "subFolders",
  data: function () {
    if(this.params._id && this.params._id1)
      return {userId : this.params._id, folderId: this.params._id1};
  }
});
Router.route("/folder/new", 
{
  name: "createFolder"
});
Router.route("/email-support", 
{
  name: "emailSupport"
});
Router.route("/contact/new",
{
  name: "addNewContact"
});
Router.route("/contact/edit/:_id",{
  name: "editContact",
  data: function() {
    if(this.params._id)
      return {
        "id": this.params._id
      }
  }
});
Router.route("/add-contact",
{
  name: "addContactsFromDevice"
});
Router.route("/invite-contact",{
  name: "inviteContact"
});
Router.route("/file/rename/:_id", 
{
  name: "fileRename",
  data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/edit-profile/:_id", 
{
  name: "editprofile",
  data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/copyto/:_id/:_id1/:_id2", 
{
  name: "copyto",
  data: function () {
    if(this.params._id && this.params._id1 && this.params._id2)
      return {type:this.params._id, id:this.params._id1, action:this.params._id2};
  }
});
Router.route("/copytocontacts", 
{
  name: "copytocontacts"
});
Router.route("/copytocontactsmasterfolders/:_id", 
{
  name: "copytocontactsmasterfolders",
  data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/copytocontactsmastersubfolders/:_id", 
{
  name: "copytocontactsmastersubfolders",
  data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/accounts", 
{
  name: "accountsTab"
});
Router.route("/home", 
{
  name: "homeTab"
});
Router.route("/contact-list", 
{
  name: "contactslist"
});
Router.route("/create-export", 
{
  name: "createExport"
});
Router.route("/exportTo", 
{
  name: "exportTo"
});
Router.route("/exportTocontacts", 
{
  name: "exportTocontacts"
});
Router.route("/exportTocontactssmasterfolders/:_id", 
{
  name: "exportTocontactssmasterfolders",
  data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/exportTocontactsmastersubfolders/:_id", 
{
  name: "exportTocontactsmastersubfolders",
  data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/payment", 
{
  name: "payment"
});

Router.route("/cardPayment", 
{
  name: "cardPaymentPage"
});
Router.route("/collaboratorsPage", 
{
  name: "collaboratorsPage"
});
Router.route("/collaboratorInfoPage/:_id", 
{
  name: "collaboratorInfoPage",
   data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/editCollaboratorPage/:_id", 
{
  name: "editCollaboratorPage",
   data: function () {
    if(this.params._id)
      return {id:this.params._id};
  }
});
Router.route("/addCollaboratorpage", 
{
  name: "addCollaboratorpage"
});
Router.onBeforeAction(function() {
    var routeName = Router.current().route.path();
    console.log(routeName);
    if (_.include(['/signin', '/signup', '/reset-password', '/' ,'/termsofservice', '/intro'], routeName)) {
      if(routeName == "/reset-password")
      {
        this.next();
      }
      else
      {
        if (Meteor.userId() != null)
        {
          if (typeof Meteor.user() !== "undefined") {
            Router.go('/home');
            this.next();
          }
          else
          {
            this.next();
          }
        } 
        else
        {
          this.next();
        }
      }
    }
    else 
    {
      if (Meteor.userId() == null)
      {
        Router.go('/signin');
        this.next();
      } else {
        this.next();
      }
    }
});
/*Router.onBeforeAction(function() {
    var routeName = Router.current().route.path();
    console.log(routeName);
    if (_.include(['/signin', '/signup', '/reset-password', '/' ,'/termsofservice', '/intro'], routeName)) {
      if(routeName == "/reset-password")
      {
        this.next();
      }
      else
      {
        console.log("path", routeName);
        if (Meteor.userId() != null)
        {
          if (typeof Meteor.user() !== "undefined") {
            if(typeof Meteor.user().profile.isNumberVerified !== "undefined")
            {
              if(Meteor.user().profile.isNumberVerified)
              {
                Router.go('/home');
                this.next();
              }
              else
              {
                Router.go('/verify-number');
                this.next();
              }
            }
            else
            {
              Router.go('/verify-number');
              this.next();
            }
            
            //Router.go("/folders/" + Meteor.userId());
            
          }
          else
          {
            this.next();
          }
        } 
        else
        {
          this.next();
        }
      }
    }
    else 
    {
      console.log("else");
      if (Meteor.userId() == null)
      {
        Router.go('/signin');
        this.next();
      } else {
        console.log("else1");
        if(typeof Meteor.user().profile.isNumberVerified !== "undefined")
        {
          if(Meteor.user().profile.isNumberVerified)
          {
            if(routeName == "/verify-code" || routeName == "/verify-number")
            {
              Router.go('/home');
              this.next();
            }
            else
            {
              this.next();
            }
          }
          else
          {
            if(routeName == "/verify-code")
            {
              Router.go('/verify-code');
              this.next();
            }
            else
            {
              Router.go('/verify-number');
              this.next();
            }

            
          }
        }
        else
        {
          Router.go('/verify-number');
          this.next();
        }
      }
    }
});*/