const pretty = require('prettysize');
/*import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');*/
var ta = require('time-ago')  // node.js
var listView = new ReactiveVar("list");
var searchText = new ReactiveVar("");
var sortOrder = new ReactiveVar();
Template.fileListView.onCreated(function(){
  Meteor.subscribe("getFilesByUserFiltered", Meteor.userId());
  Meteor.subscribe("getAllCollaborations");
  Meteor.subscribe("getUserStarredFiles", Meteor.userId());
  Meteor.subscribe("getUserNotifications", Meteor.userId());
  Meteor.subscribe("getUserSharedFiles", Meteor.userId());
});
Template.fileListView.onRendered(function(){
  searchText.set("");
  appHistoryPush("/filelistview");
  Session.set("folderOwner", Meteor.userId());
  Session.set("folderPath", "");
  listView.set("list");
  sortOrder.set(-1);
  Session.set("FileSortingValue", "dateCreated");

  var a = setInterval(function(){
    if($(".gotoFileDetails").length > 0)
    {
      $(".gotoFileDetails").on( "swipeleft", function(e){var elem = $(e.target);
        $(".leftSide").each(function(key, val){
          $(val).removeClass("leftSide");
          $(val).find(".ListDeleteButtonRed").css("display","none");
        })
        elem.parents(".fileListItem").addClass("leftSide");
        elem.parents(".fileListItem").find(".ListDeleteButtonRed").css("display","block");
      });
      $(".gotoFileDetails").on( "swiperight", function(e){var elem = $(e.target);
        $(".leftSide").each(function(key, val){
          $(val).removeClass("leftSide");
          $(val).find(".ListDeleteButtonRed").css("display","none");
        })
      });
      clearInterval(a);
    }
  },1000);
});
Template.fileListView.events({
  'click .ListDeleteButtonRed':function(e){
    e.preventDefault();
    e.stopPropagation();
    var c = confirm("Are you sure you want to delete? \n\n All decisions are final. ");
    var fileId = $(e.target).attr("data-fileId");
    console.log("fileId",fileId);
    if(c)
    {
      Meteor.call("deleteFile", fileId, function(err, res){
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
  },
  'click .belloringalarmvoicereminder':function(e){
    e.preventDefault();
    appHistoryPush("/notifications");
    Router.go("/notifications");
  },
  'click .foldercontrolsoverlay.fileFilter .ListDeleteButtonRed': function(e){
    e.preventDefault();
    var fileId = $(e.target).attr("data-fileid");
    var c = confirm("Are you sure you want to delete?");
    if(c)
    {
      Meteor.call("deleteFile", fileId, function(err, res){
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
  },
  'swipeleft  .gotoFileDetails': function(e)
  {
    var elem = $(e.target);
    $(".leftSide").each(function(key, val){
      $(val).removeClass("leftSide");
      $(val).find(".ListDeleteButtonRed").css("display","none");
    })
    elem.parents(".fileListItem").addClass("leftSide");
    elem.parents(".fileListItem").find(".ListDeleteButtonRed").css("display","block");
  },
  'click  .gotoFileDetails': function(e)
  {
    var fileId = $(e.target).attr("data-id");
    var fileDetails = userFiles.findOne({
      "_id": fileId
    });
    if(fileDetails !== null)
    {
      Session.set("folderOwner", fileDetails.userId);
      Session.set("folderPath", "");
    }
    appHistoryPush("/clientfile/" + fileId);
    Router.go("/clientfile/" + fileId);
  },
  'click  .listViewButton': function(e)
  {
    var elem = $(e.target);
    var currentView = elem.attr("data-view");
    if(currentView == "list")
    {
      listView.set("grid");
      Session.set("ListViewType", "grid");
      elem.attr("data-view", "grid");
    }
    else
    {
      listView.set("list");
      Session.set("ListViewType", "list");
      elem.attr("data-view", "list");
    }
  },
  'click  .sortOrderButton': function(e)
  {
    var elem = $(e.target);
    var currentSort = (elem.attr("data-sort"));
    if(currentSort == "-1")
    {
      sortOrder.set(1);
      elem.attr("data-sort", "1");
      elem.addClass("rotateClass");
    }
    else
    {
      sortOrder.set(-1);
      elem.attr("data-sort", "-1");
      elem.removeClass("rotateClass");
    }
  },
  'keyup  .searchTextbox': function(e)
  {
    var elem = $(e.target);
    searchText.set(elem.val());
    // $(".searchTextbox").val(searchText);
  },
  'click .moreFileControls': function(e)
  {
    // console.log("test ndm")
    var elem = $(e.target);
    var fileId = elem.attr("data-fileId");
    var fileDetails = userFiles.findOne({
      "_id": fileId
    });
    console.log("fileDetails",fileDetails);

    var fileIcon = getFileIcon(fileDetails.fileName);
    var fileNameHTML = "";
    var str = pretty(fileDetails.fileSize, false, false, 0);
    var d = ta.ago(fileDetails.dateCreated)
    fileNameHTML += fileDetails.fileName + "<p>" + str + ", modified " + d;
    $(" .createOverlayUl").find(".fileFolderName").find(".fileNameInOverlay").html(fileNameHTML);
    $(" #deleteFileLi").attr("data-id", fileId);
    $(".foldercontrolsoverlay.fileFilter").attr("data-id", fileId);
    $(" #renameFileLi").find("a").attr("href","/file/rename/" + fileId);
    $(" #deleteFileLi").attr("data-id", fileId);
    $(" #fileStarLi").attr("data-id", fileId);
    $(" #tagFileLi").attr("data-id", fileId);
    $(" #printLi").attr("data-id", fileId);
    $(" #shareFileLi").attr("data-id", fileId);
    $(" #copyToLi").attr("data-id", fileId);
    $(" #moveToLi").attr("data-id", fileId);
    $(" #showFolder").attr("data-id", fileId);
    $(" #addToReportLi").attr("data-id", fileId);
    $(" .fileFolderName .shape.main").attr("src", fileIcon);
    var getIsStarred = userStarredFiles.find({
      "userId": Meteor.userId(),
      "fileId": fileId
    });
    var fileFormatVideo = fileDetails.fileType;
    var a = fileFormatVideo.split("/");
    console.log("a[0]",a[0]);
    if(a[0] == "video" || a[0] == "application" || a[0] == "audio" || a[0] == "text"){
        console.log("fileDetails.fileType",fileDetails.fileFormat);
        $(" #printLi").hide();
        $(" #printLi").attr("data-status", false);
        $(" #printLi").find("img").attr("src","/img/PrinterIcon.png");
        $(" #printLi").find("img").next().html("Print");
        $(" #printLi").find("img").next().removeClass("activeClass");

      }
      else{
        $(" #printLi").show();
        $(" #printLi").attr("data-status", true);
        $(" #printLi").find("img").attr("src","/img/PrinterIcon.png");
        $(" #printLi").find("img").next().html("Print");
        $(" #printLi").find("img").next().addClass("activeClass");
      }
    
    if(getIsStarred.count() == 0)
    {
      $(" #fileStarLi").attr("data-status", false);
      $(" #fileStarLi").find("img").attr("src","/img/StarBlackIcon.png");
      $(" #fileStarLi").find("img").next().html("Add to Starred");
      $(" #fileStarLi").find("img").next().removeClass("activeClass");
    }
    else
    {
      $(" #fileStarLi").attr("data-status", true);
      $(" #fileStarLi").find("img").attr("src","/img/StarBlueIcon.png");
      $(" #fileStarLi").find("img").next().html("Starred File");
      $(" #fileStarLi").find("img").next().addClass("activeClass");
    }

    if(fileDetails.showInReports)
    {
      $(" #addToReportLi").attr("data-status", true);
      $(" #addToReportLi").find("img").attr("src","/img/reportIconBlue.png");
      $(" #addToReportLi").find("img").next().html("Added in Report Folder");
      $(" #addToReportLi").find("img").next().addClass("activeClass");
    }
    else
    {
      $(" #addToReportLi").attr("data-status", false);
      $(" #addToReportLi").find("img").attr("src","/img/ReportFolderIcon.png");
      $(" #addToReportLi").find("img").next().html("Add in Report Folder");
      $(" #addToReportLi").find("img").next().removeClass("activeClass");
    }
    //$(".foldercontrolsoverlay .overlayBackground").fadeIn();
    openMenu("foldercontrolsoverlay.fileFilter");
  },
  'click  .filterButtonFileListing': function(e)
  {
    //$(".filteroptionslistoverlay .overlayBackground").fadeIn();
    openMenu("filteroptionslistoverlay");
  },
  'error  .path5387': function(e){
    var elem = $(e.target);
    elem.attr("src", "/fileIcons/other.png");
  },
  'click  #selectFileListingView': function(e)
  {
    e.preventDefault();
    appHistoryPush("/filelistview/select");
    Router.go("/filelistview/select");
  },
  'click  #gotonotifications': function(e)
  {
    e.preventDefault();
    appHistoryPush("/notifications");
    Router.go("/notifications");
  }
});
Template.fileListView.helpers({
  showMoreOption: function(id){
    var fileId = id;
    var userId = Meteor.userId();
    var permission = getFilePermission(fileId, userId);
    console.log("permission",permission);
   
    if(permission == 3 || permission == 2)
    {
      return true;
    }
    else
    {
       var permission2 = getFilePermissionForNotification(fileId, userId);
      console.log("getFilePermissionForNotification",permission2);
      if(permission2 == 3)
        return true;
      else
        return false;
    }
  },
  getFileIcon: function(n){
    return getFileIcon(n);
  },
  getFileName: function(fileName){
    var explodedFileName = fileName.substr(0,fileName.lastIndexOf("."));
    var explodedFileExtension = fileName.substr(fileName.lastIndexOf("."));
    var newFileName = "";
    if(fileName.length > 15)
    {
      newFileName += explodedFileName.substr(0,15) + "...." + explodedFileExtension;
    }
    else
    {
      newFileName = fileName;
    }
    return newFileName
  },
  isNotStarred:function(fileId){
    var oldData = userStarredFiles.find({
      "userId": Meteor.userId(),
      "fileId": fileId
    });
    if(oldData.count() == 0)
    {
      return true;
    }
    else
    {
      return false;
    }
  },
 getFiles: function()
{
      var finalCollaborators = [];
      var fullAccessUser = [];
      var limitedAccessUsers = [];
      var folderIdsAccess = [];
      var coll = [];

      if(Meteor.user() != undefined)
      {
            var collaborators = getCollaborators(Meteor.user());
            if(collaborators.length > 0)
            {
                  for(var i = 0; i < collaborators.length; i++)
                  {
                        coll.push(collaborators[i].userId);
                        if(collaborators[i].fullAccess)
                        {
                              fullAccessUser.push(collaborators[i].userId);
                              finalCollaborators.push(collaborators[i].userId);
                        }
                        else
                        {
                              limitedAccessUsers.push(collaborators[i].userId);

                              if(typeof collaborators[i].projectIds !== "undefined")
                              {
                                    if(collaborators[i].projectIds.length > 0)
                                    {
                                          for(var j = 0; j < collaborators[i].projectIds.length; j++)
                                          {
                                                folderIdsAccess.push(collaborators[i].projectIds[j]);
                                          }
                                    }
                              }
                        }
                  }
            }
            Meteor.subscribe("getCollaboratorsFiles",coll);
      }
      var data = [];

      var cuurentUserEmail = Meteor.user.username;
      var fetchFileInUserSharedFiles = userSharedFiles.find({
            $or: [
            {"toUserEmail": cuurentUserEmail},
            {"contactUserEmail": cuurentUserEmail}
            ]
      },{
            sort:{
                  dateUpdated: -1,
                  dateCreated: -1
            }
      }).fetch();

      var cuurentUserEmail = Meteor.user().username;
      var fetchFileInUserSharedFiles = userSharedFiles.find({
            $or: [
            {"toUserEmail": cuurentUserEmail},
            {"contactUserEmail": cuurentUserEmail}
            ]
      },{
            sort:{
                  dateUpdated: -1,
                  dateCreated: -1
            }
      }).fetch();

      var filesIdsByNotification = [];
      if(fetchFileInUserSharedFiles.length > 0 )
      {
            for(var i= 0; i< fetchFileInUserSharedFiles.length; i++){
                  filesIdsByNotification.push(fetchFileInUserSharedFiles[i].fileId)
            }
      }

      finalCollaborators.push(Meteor.userId());

      var searchTextVal = searchText.get();

      if(searchTextVal == "")
      {
            if(Session.get("FileSortingValue") == "")
            {
                  var filesList = userFiles.find({
                        $or:
                        [
                        {
                              "userId": {
                                    $in: finalCollaborators
                              }
                        },
                        {
                              "fileFolder": {
                                    $in: folderIdsAccess
                              }
                        },
                        {
                              "_id": {
                                    $in: filesIdsByNotification
                              }
                        }
                        ],
                        "isDeleted": false
                  });
                  return filesList;
            }
            else{
                  if(Session.get("FileSortingValue") == "fileName")
                  {
                        var sort = {
                              fileName: sortOrder.get()
                        };
                  }
                  else if(Session.get("FileSortingValue") == "dateCreated")
                  {
                        var sort = {
                              dateCreated: sortOrder.get()
                        };
                  }
                  else if(Session.get("FileSortingValue") == "dateModified")
                  {
                        var sort = {
                              dateModified: sortOrder.get()
                        };
                  }
                  else if(Session.get("FileSortingValue") == "fileSize")
                  {
                        var sort = {
                              fileSize: sortOrder.get()
                        };
                  }
                  else if(Session.get("FileSortingValue") == "fileFormat")
                  {
                      var sort = {
                          fileFormat: sortOrder.get()
                      };
                  }
                  var filesList = userFiles.find({
                        $or:
                        [
                        {
                              "userId": {
                                    $in: finalCollaborators
                              }
                        },
                        {
                              "fileFolder": {
                                    $in: folderIdsAccess
                              }
                        },
                        {
                              "_id": {
                                    $in: filesIdsByNotification
                              }
                        }
                        ],
                        "isDeleted": false
                  },{sort : sort});

                  return filesList;
            }
      }
      else{
            console.log("fdsfds");
            if(Session.get("FileSortingValue") == "")
            {
                  var filesList = userFiles.find({
                        $or:
                        [
                        {
                              "userId": {
                                    $in: finalCollaborators
                              }
                        },
                        {
                              "fileFolder": {
                                    $in: folderIdsAccess
                              }
                        },
                        {
                              "_id": {
                                    $in: filesIdsByNotification
                              }
                        }
                        ],
                        "isDeleted": false,
                        "fileName": {'$regex': new RegExp(searchTextVal, "i")},
                  });

                  return filesList;
            }
            else{
                  if(Session.get("FileSortingValue") == "fileName")
                  {
                        var sort = {
                              fileName: sortOrder.get()
                        };
                  }
                  else if(Session.get("FileSortingValue") == "dateCreated")
                  {
                        var sort = {
                              dateCreated: sortOrder.get()
                        };
                  }
                  else if(Session.get("FileSortingValue") == "dateModified")
                  {
                        var sort = {
                              dateModified: sortOrder.get()
                        };
                  }
                  else if(Session.get("FileSortingValue") == "fileSize")
                  {
                        var sort = {
                              fileSize: sortOrder.get()
                        };
                  }
                  else if(Session.get("FileSortingValue") == "fileFormat")
                  {
                        var sort = {
                              fileFormat: sortOrder.get()
                        };
                  }
                  var filesList = userFiles.find({
                        $or:
                        [
                        {
                              "userId": {
                                    $in: finalCollaborators
                              }
                        },
                        {
                              "fileFolder": {
                                    $in: folderIdsAccess
                              }
                        },
                        {
                              "_id": {
                                    $in: filesIdsByNotification
                              }
                        }
                        ],
                        "isDeleted": false,
                        "fileName": {'$regex': new RegExp(searchTextVal, "i")},
                  },{
                        sort: sort
                  });
                  return filesList;
            }
      }
},
  getSize: function(param)
  {
    var str = pretty(param, false, false, 0);
    return str;
  },
  getModifiedDate: function(param)
  {
    return ta.ago(param);
  },
  isListView: function()
  {
    var v = Session.get("ListViewType");
    
    if(typeof v == "undefined")
    {
      v = "list";
    }
    console.log("v",v);
    if(v == "list")
    {
      return true;
    }
    else
    {
      return false;
    }
  },
  isGridView: function()
  {
    var v = Session.get("ListViewType");

    if(typeof v == "undefined")
    {
      v = "list";
    }
    console.log("v",v);
    if(v == "grid")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
});



var listViewSelect = new ReactiveVar("list");
var searchTextSelect = new ReactiveVar("");
var sortOrderSelect = new ReactiveVar();
Template.fileListViewSelect.onCreated(function(){
  Meteor.subscribe("getFilesByUser", Meteor.userId());
  Meteor.subscribe("getUserStarredFiles", Meteor.userId());
});
Template.fileListViewSelect.onRendered(function(){
  listViewSelect.set("list");
  sortOrderSelect.set(-1);
  // Session.set("totalSelectedFiles", '')
  //Session.set("FileSortingValue", "dateCreated");
});
Template.fileListViewSelect.helpers({
  getFileIcon: function(n){
    return getFileIcon(n);
  },
  getFileName: function(fileName){
    var explodedFileName = fileName.substr(0,fileName.lastIndexOf("."));
    var explodedFileExtension = fileName.substr(fileName.lastIndexOf("."));
    var newFileName = "";
    if(fileName.length > 15)
    {
      newFileName += explodedFileName.substr(0,15) + "...." + explodedFileExtension;
    }
    else
    {
      newFileName = fileName;
    }
    return newFileName
  },
  isNotStarred:function(fileId){
    var oldData = userStarredFiles.find({
      "userId": Meteor.userId(),
      "fileId": fileId
    });
    if(oldData.count() == 0)
    {
      return true;
    }
    else
    {
      return false;
    }
  },
  getFiles: function()
  {
    var finalCollaborators = [];
    var fullAccessUser = [];
    var limitedAccessUsers = [];
    var folderIdsAccess = [];
    var coll = [];
    if(Meteor.user() != undefined)
    {
      var collaborators = getCollaborators(Meteor.user());
      if(collaborators.length > 0)
      {
        for(var i = 0; i < collaborators.length; i++)
        {
          coll.push(collaborators[i].userId);
          if(collaborators[i].fullAccess)
          {
            fullAccessUser.push(collaborators[i].userId);
            finalCollaborators.push(collaborators[i].userId);
          }
          else
          {
            limitedAccessUsers.push(collaborators[i].userId);
            
            if(typeof collaborators[i].projectIds !== "undefined")
            {
              if(collaborators[i].projectIds.length > 0)
              {
                for(var j = 0; j < collaborators[i].projectIds.length; j++)
                {
                  folderIdsAccess.push(collaborators[i].projectIds[j]);
                }
              }
            }
          }
        }
      }
      Meteor.subscribe("getCollaboratorsFiles",coll);
    }    
    finalCollaborators.push(Meteor.userId());
    var searchTextVal = searchTextSelect.get();
    if(searchTextVal == "")
    {
      if(Session.get("FileSortingValue") == "")
      {
        var filesList = userFiles.find({
          $or:
          [
            {
              "userId": {
                $in: finalCollaborators
              }
            },
            {
              "fileFolder": {
                $in: folderIdsAccess
              }
            }
          ],
          "isDeleted": false
        });
      }
      else
      {
        if(Session.get("FileSortingValue") == "fileName")
        {
          var sort = {
            fileName: sortOrderSelect.get()
          };
        }
        else if(Session.get("FileSortingValue") == "dateCreated")
        {
          var sort = {
            dateCreated: sortOrderSelect.get()
          };
        }
        else if(Session.get("FileSortingValue") == "dateModified")
        {
          var sort = {
            dateModified: sortOrderSelect.get()
          };
        }
        else if(Session.get("FileSortingValue") == "fileSize")
        {
          var sort = {
            fileSize: sortOrderSelect.get()
          };
        }
        else if(Session.get("FileSortingValue") == "fileFormat")
        {
          var sort = {
            fileFormat: sortOrderSelect.get()
          };
        }
        var filesList = userFiles.find({
          $or:
          [
            {
              "userId": {
                $in: finalCollaborators
              }
            },
            {
              "fileFolder": {
                $in: folderIdsAccess
              }
            }
          ],
          "isDeleted": false
        },{
          sort: sort
        });
      }
    }
    else
    {
      if(Session.get("FileSortingValue") == "")
      {
        var filesList = userFiles.find({
          $or:
          [
            {
              "userId": {
                $in: finalCollaborators
              }
            },
            {
              "fileFolder": {
                $in: folderIdsAccess
              }
            }
          ],
          "isDeleted": false,
          "fileName": {'$regex': new RegExp(searchTextVal, "i")}
        });
      }
      else
      {
        if(Session.get("FileSortingValue") == "fileName")
        {
          var sort = {
            fileName: sortOrderSelect.get()
          };
        }
        else if(Session.get("FileSortingValue") == "dateCreated")
        {
          var sort = {
            dateCreated: sortOrderSelect.get()
          };
        }
        else if(Session.get("FileSortingValue") == "dateModified")
        {
          var sort = {
            dateModified: sortOrderSelect.get()
          };
        }
        else if(Session.get("FileSortingValue") == "fileSize")
        {
          var sort = {
            fileSize: sortOrderSelect.get()
          };
        }
        else if(Session.get("FileSortingValue") == "fileFormat")
        {
          var sort = {
            fileFormat: sortOrderSelect.get()
          };
        }
        var filesList = userFiles.find({
          $or:
          [
            {
              "userId": {
                $in: finalCollaborators
              }
            },
            {
              "fileFolder": {
                $in: folderIdsAccess
              }
            }
          ],
          "isDeleted": false,
          "fileName": {'$regex': new RegExp(searchTextVal, "i")}
        },{
          sort: sort
        });
      }
      
    }
    if(filesList.count() > 0)
    {
      var data = filesList.fetch();
      var newData = [];
      for(var j = 0; j < data.length; j++)
      {
        var rec = data[j];
        var permissionFile = getFilePermission(rec._id, Meteor.userId());

        if(permissionFile == 3)
        {
          newData.push(rec);
        }
      }
      return newData;
    }
  },
  getSize: function(param)
  {
    var str = pretty(param, false, false, 0);
    return str;
  },
  getModifiedDate: function(param)
  {
    return ta.ago(param);
  },
  isListView: function()
  {
    var v = Session.get("ListViewType");
    
    if(typeof v == "undefined")
    {
      v = "list";
    }
    console.log("v",v);
    if(v == "list")
    {
      return true;
    }
    else
    {
      return false;
    }
  },
  isGridView: function()
  {
    var v = Session.get("ListViewType");

    if(typeof v == "undefined")
    {
      v = "list";
    }
    console.log("v",v);
    if(v == "grid")
    {
      return true;
    }
    else
    {
      return false;
    }
  }
});
Template.fileListViewSelect.events({
  'click .listViewButton': function(e)
  {
    var elem = $(e.target);
    var currentView = elem.attr("data-view");
    if(currentView == "list")
    {
      listViewSelect.set("grid");
      Session.set("ListViewType", "grid");
      elem.attr("data-view", "grid");
    }
    else
    {
      listViewSelect.set("list");
      Session.set("ListViewType", "list");
      elem.attr("data-view", "list");
    }
  },
  'click .sortOrderButton': function(e)
  {
    var elem = $(e.target);
    var currentSort = (elem.attr("data-sort"));
    if(currentSort == "-1")
    {
      sortOrderSelect.set(1);
      elem.attr("data-sort", "1");
      elem.addClass("rotateClass");
    }
    else
    {
      sortOrderSelect.set(-1);
      elem.attr("data-sort", "-1");
      elem.removeClass("rotateClass");
    }
  },
  'keyup .searchTextbox': function(e)
  {
    var elem = $(e.target);
    searchTextSelect.set(elem.val());
  },
  'click .moreFileControls': function(e)
  {
    console.log("fdsfdsfDS")
    var elem = $(e.target);
    var fileId = elem.attr("data-fileId");
    var fileDetails = userFiles.findOne({
      "_id": fileId
    });
    var fileIcon = getFileIcon(fileDetails.fileName);
    var fileNameHTML = "";
    var str = pretty(fileDetails.fileSize, false, false, 0);
    var d = ta.ago(fileDetails.dateCreated)
    fileNameHTML += fileDetails.fileName + "<p>" + str + ", modified " + d;
    $(".createOverlayUl").find(".fileFolderName").find(".fileNameInOverlay").html(fileNameHTML);
    $("#renameFileLi").find("a").attr("href","/file/rename/" + fileId);
    $("#deleteFileLi").attr("data-id", fileId);
    $("#printLi").attr("data-id", fileId);
    $("#shareFileLi").attr("data-id", fileId);
    $("#fileStarLi").attr("data-id", fileId);
    $("#showFolder").attr("data-id", fileId);
    $("#tagFileLi").attr("data-id", fileId);
    $("#showFolder").attr("data-id", fileId);
    $(".fileFolderName .shape.main").attr("src", fileIcon);
    var getIsStarred = userStarredFiles.find({
      "userId": Meteor.userId(),
      "fileId": fileId
    });

    // if(fileDetails.fileFormat == "mp4"){
    //   $("#printLi").attr("data-status", false);
    // }

    if(getIsStarred.count() == 0)
    {
      $("#fileStarLi").attr("data-status", false);
      $("#fileStarLi").find("img").attr("src","/img/StarBlackIcon.png");
      $("#fileStarLi").find("img").next().html("Add to Starred");
      $("#fileStarLi").find("img").next().removeClass("activeClass");
    }
    else
    {
      $("#fileStarLi").attr("data-status", true);
      $("#fileStarLi").find("img").attr("src","/img/StarBlueIcon.png");
      $("#fileStarLi").find("img").next().html("Starred File");
      $("#fileStarLi").find("img").next().addClass("activeClass");
    }
    //$(".foldercontrolsoverlay .overlayBackground").fadeIn();
    openMenu("foldercontrolsoverlay.fileFilter");
  },
  'click .filterButtonFileListing': function(e)
  {
    //$(".filteroptionslistoverlay .overlayBackground").fadeIn();
    openMenu("filteroptionslistoverlay");
  },
  'error .path5387': function(e){
    var elem = $(e.target);
    elem.attr("src", "/fileIcons/other.png");
  },
  'click .backbuttontopnav': function(e)
  {
    e.preventDefault();
    
    Router.go("/filelistview");
  },
  'change .selectFiles': function(e)
  {
    e.preventDefault();
    var status = $(e.target).is(":checked");    
    var id = $(e.target).attr("data-id");

      
    if(status)
    {      
      $("." + id).prop("checked",true);      
    }
    else
    {
      $("." + id).prop("checked",false);
      

    }
  },
  'click .nextButton': function(e){
    e.preventDefault();
    var selectedFiles = $(".selectedFilesDiv .filelistViewDiv .selectFiles:checked");
    if(selectedFiles.length == 0)
    {
      var selectedFiles = $(".selectedFilesDiv .filesiconview .selectFiles:checked");
      if(selectedFiles.length == 0)
      {
        alert("Please select atleast one file to continue.");
        return;
      }
      else
      {
        openMenu("multipleSelectFileOptionsOverlay");
      }
    }
    else
    {
      //$(".multipleSelectFileOptionsOverlay .overlayBackground").fadeIn();
      openMenu("multipleSelectFileOptionsOverlay");
    }
  },
  'click .gotoFileDetails': function(e)
  {
    var target = $(e.target);
    var parentRow = target.parents(".parentRow");
    var selectElem = parentRow.find(".selectFiles");
    var id = selectElem.attr("data-id");
    var status = selectElem.is(":checked");
    selectElem.prop("checked", !status);
    $("." + id).prop("checked",!status);
  }
});