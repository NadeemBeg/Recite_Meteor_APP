function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  return re.test(email);
}
function validateNumber(num) {
  var re = /^[0-9]{10}$/gm;
  return re.test(num);
}
function uploadeFileToCloudinary(fileParam, userId, callback, params)
{
    Cloudinary.upload(fileParam, {}, function(err, res){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(res);
            callback(res,params[0]);
            
        }
    });
}
function getFileIcon(fileName)
{
    var fileExt = fileName.substr(fileName.lastIndexOf(".") + 1).toLowerCase();
    var fileIconPath = "/fileIcons/" + fileExt + ".png";
    return fileIconPath;
}
function getFolderPath(folderId, path, userId)
{
    path.push(folderId);
    var folderDetails = userFolders.find({
        "_id": folderId
    });
    if(folderDetails.count() > 0)
    {
        folderDetails = userFolders.findOne({
            "_id": folderId
        });
    }
    else
    {
        folderDetails = userReportFolders.find({
            "_id": folderId
        });
        if(folderDetails.count() > 0)
        {
            folderDetails = userReportFolders.findOne({
                "_id": folderId
            });
        }
    }
    if(typeof folderDetails !== "undefined")
    {
        if(typeof folderDetails.parentId !== "undefined")
        {
            getFolderPath(folderDetails.parentId, path, userId);
        }
        else
        {
            path.push(userId);
            var reversedPath = path.reverse();
            var joinedPath = reversedPath.join("_");
            var joinedPath1 = reversedPath.join("/");
            Session.set("fullFolderPathForCloudinary", joinedPath1);
            Session.set("fullFolderPath", joinedPath);
        }
    }
}
function getFolderFilesCount(folderId)
{
    Meteor.subscribe("getFilesByFolder",folderId);
    var folderFiles = userFiles.find({
        "fileFolder": folderId,
        "isDeleted": false
    });
    console.log("folderFiles.count()",folderFiles.count());
    if(folderFiles.count() == 0)
    {
        folderFiles = userReportFiles.find({
            "fileFolder": folderId,
            "isDeleted": false
        });
        return folderFiles.count();
    }
    else
    {
        return folderFiles.count();
    }
}
function getFolderFoldersCount(folderId)
{
    var folderFiles = userFolders.find({
        "parentId": folderId,
        "isDeleted": false
    });
    if(folderFiles.count() == 0)
    {
        folderFiles = userReportFolders.find({
            "parentId": folderId,
            "isDeleted": false
        });
        return folderFiles.count();
    }
    else
    {
        return folderFiles.count();
    }
}

function getFilesList(subFolderId,searchVal){
    if(typeof searchVal == "undefined")
    {
        searchVal = ""
    }
    if(searchVal == "")
    {
        var data = userFiles.find({
            "fileFolder": subFolderId,
            "isDeleted": false
        });
        if(data.count() > 0)
        {
            console.log("data.fetch()", data.fetch());
            return data.fetch();
        }
    }
    else
    {
        var data = userFiles.find({
            "fileFolder": subFolderId,
            "isDeleted": false,
            "fileName": new RegExp(searchVal, "i")
        });
        if(data.count() > 0)
        {
            return data.fetch();
        }
    }
    
}
function getFoldersList(subFolderId,searchVal)
{
    if(typeof searchVal == "undefined")
    {
        searchVal = ""
    }
    if(searchVal == "")
    {
        var data = userFolders.find({
            "parentId": subFolderId,
            "isDeleted": false
        });
        if(data.count() > 0)
        {
            return data.fetch();
        }
        else
        {
            data = userReportFolders.find({
                "parentId": subFolderId,
                "isDeleted": false
            });
            if(data.count() > 0)
            {
                return data.fetch();
            }
            else
            {
                return [];
            }
        }
    }
    else
    {
        var data = userFolders.find({
            "parentId": subFolderId,
            "isDeleted": false,
            "folderName": new RegExp(searchVal, "i")
        });
        if(data.count() > 0)
        {
            return data.fetch();
        }
        else
        {
            data = userReportFolders.find({
                "parentId": subFolderId,
                "isDeleted": false,
                "folderName": new RegExp(searchVal, "i")
            });
            if(data.count() > 0)
            {
                return data.fetch();
            }
            else
            {
                return [];
            }
        }
    }
    
}
function getFileSize(fileId)
{
    var fileDetails = userFiles.findOne({
        "_id": fileId
    });
    if(typeof fileDetails.fileSize !== "undefined")
        return fileDetails.fileSize;
    else
        return 0; 
}
var size = 0;
function hasFilesOrFolders(folderId)
{
    var filesCount = getFolderFilesCount(folderId);
    var folderCount = getFolderFoldersCount(folderId);
    if(filesCount || folderCount)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function hasChild(folderId)
{
    var folderDetails = userFolders.find({
        "parentId": folderId
    });
    if(folderDetails.count() > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function getFolderSize(folderId)
{
    var folderDetails = userFolders.findOne({
        "_id": folderId
    });
    if(typeof folderDetails !== "undefined")
    {
        var foldersList = [];
        var foldersData = userFolders.find({
            $or: [
                {"folderPath": new RegExp(folderId)},
                {"_id": folderId}
            ]
        });
        var size = 0;
        if(foldersData.count() > 0)
        {
            foldersData = foldersData.fetch();
            for(var i = 0; i < foldersData.length; i++)
            {
                var r = foldersData[i];
                var filesList = getFilesList(r._id);
                if(typeof filesList !== "undefined")
                {
                    if(filesList.length > 0)
                    {
                        for(var j = 0; j < filesList.length; j++)
                        {
                            size += filesList[j].fileSize;
                        }
                    }
                }
            }
        }
        return size;
    }
    

        /*var folderDetails = userFolders.findOne({
            "_id": FileorFolderId
        });
        var filesList = getFilesList(folderDetails._id);
        var folderList = getFoldersList(folderDetails._id);
        var totalSize = 0;
        for(var i = 0; i < filesList.length; i++)
        {
            totalSize += getFileOrFolderSize(filesList[i]._id, "file");
        }
        for(var j = 0; j < folderList.length; j++)
        {
            var folderIds = folderList[i]._id;

        }*/
        
    
}
function isFolderHasFilesOrFolders(folderId, searchVal)
{
    if(typeof searchVal == "undefined")
    {
        var c1 = {
            "parentId": folderId
        }
        var c2 = {
            "fileFolder": folderId
        }
    }
    else
    {
        var c1 = {
            "parentId": folderId,
            "folderName": new RegExp(searchVal, "i")
        }
        var c2 = {
            "fileFolder": folderId,
            "fileName": new RegExp(searchVal, "i")
        }
    }
    var folderFiles = userFolders.find(c1);
    var folderFiles1 = userFiles.find(c2);
    if(folderFiles.count() > 0 || folderFiles1.count() > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function openMenu(menuName)
{
   $("."+menuName+" .overlayBackground").fadeIn();
   $("."+menuName+" .overlayBody").slideDown(300);
   var length = $("."+menuName+" .overlayBody").length;
   if(length > 0)
   {
       $("."+menuName+" .overlayBody").scrollTop(0);
   }
}
function closeMenu(menuName)
{
    $("."+menuName+" .overlayBody").slideUp(300);
    $("."+menuName+" .overlayBackground").fadeOut();
}
function toDataURL1(url, callback, fileName) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
        // console.log(reader.result);
        // console.log(fileName);
      callback(reader.result, fileName);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
function changeModifiedDateFolder(folderId,d)
{
    Meteor.call("changeModifiedDateFolder", folderId, d, function(err,res){});
}
function changeModifiedDateFile(fileId,d)
{
    Meteor.call("changeModifiedDateFile", fileId, d, function(err,res){});
}



function getUserPlanDetails(userId, callback)
{
    
    var a = callback;
    Meteor.subscribe("getUserPlans", userId, function(){
        Session.set("getUserPlansSession", true);
    });
    Tracker.autorun(function(){
        if(Session.get("getUserPlansSession") == true)
        {

            var userDetails = Meteor.users.findOne({
                "_id": userId
            });
            var userPlanDetails = userPlans.find({
                "userId": userId,
                "isExpired": false
            },{
                $sort: {
                    "recordDate": -1
                }
            });
            Session.set("getUserPlansSession", undefined);
            if(userPlanDetails.count() > 0)
            {
                userPlanDetails = userPlans.findOne({
                    "userId": userId,
                    "isExpired": false
                },{
                    $sort: {
                        "recordDate": -1
                    }
                });
                a(userPlanDetails);
            }
            else
            {
                a([]);
            }
        }
    });
}

function getTotalStorageUsed(userId, fromRange, toRange, callback)
{
    var a = callback;
    Meteor.subscribe("getFilesByUser", userId, function(){
        Session.set("getFilesByUsergetReportFilesByUser",true);
    });

    Meteor.subscribe("getReportFilesByUser", userId, function(){
        Session.set("getFilesByUsergetReportFilesByUser",true);
    });

    setTimeout(function(){
        if(typeof fromRange !== "undefined" && typeof toRange !== "undefined")
        {
            fromRange.setHours(0);
            fromRange.setMinutes(0);
            fromRange.setSeconds(0);
            toRange.setHours(23);
            toRange.setMinutes(59);
            toRange.setSeconds(59);
            Tracker.autorun(function(){
                if(true)
                {
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
                    Session.set("getFilesByUsergetReportFilesByUser",undefined);
                    var size = 0;
                    for(var i = 0; i < merged.length; i++)
                    {
                        size += merged[i].fileSize;
                    }
                    //return size;
                    a(size);
                }
            });
        }
        else
        {
            Tracker.autorun(function(){
                if(true)
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
                    Session.set("getFilesByUsergetReportFilesByUser",undefined);
                    var size = 0;
                    for(var i = 0; i < merged.length; i++)
                    {
                        size += merged[i].fileSize;
                    }
                    //return size;
                    a(size);
                }
            });
        }
    },1000);
}

function isUploadAllowed(userId, fileSize, callback)
{
    var aa = callback;
    var userDetails = Meteor.users.findOne({
        "_id": userId
    });
    var fileSize = fileSize;
    var planDetails = getUserPlanDetails(userId, function(plan){
        var storage = 0;
        if(plan.length == 0)
        {
            storage = 2000000000;
        }
        else
        {
            if(plan.planType == "Monthly")
            {
                storage = 100000000000;
            }
            else
            {
                storage = 10000000000000000;
            }
        }
        getTotalStorageUsed(userId, plan.planStartDate, plan.planEndDate, function(size){
            var remaingingSize = storage - size;
            if(remaingingSize >= fileSize)
            {
                aa(true);
            }
            else
            {
                aa(false);
            }

        });
    });
}

function getCollaborators(userRec)
{
    // console.log(userRec);
    Meteor.subscribe("getAllCollaborations",userRec.username);
    var emailAddress = userRec.username.toLowerCase();
    var collboratorsDetails = userCollaborations.find({
        $or: [
            {"emailAddress": emailAddress},
            {"contactEmail": emailAddress}
        ]
    });
    if(collboratorsDetails.count() > 0)
    {
       return collboratorsDetails.fetch(); 
    }
    else
    {
        return [];
    }
}
// function getFilePermissionForNotification(fileId, userId)
// {
//     var notificationUnReadList = notificationDetails.find({
//       "toUserId": userId
//     }).fetch();
//     var sharedFileTableIds = [];
//     var filesIdsByNotification = [];
//     if(notificationUnReadList.length > 0)
//     {
//       for(var b = 0; b < notificationUnReadList.length; b++)
//       {
//         sharedFileTableIds.push(notificationUnReadList[b].shareedFileTableId);
//       }
      
//       Meteor.subscribe("getSharedFileTableByIds", sharedFileTableIds);
      
//       var sharedFilesListTable = sharedFilesList.findOne({
//         "sharedFilesDetailsTableId": {
//           $in: sharedFileTableIds
//         },
//         "fileIds": fileId
//       },{
//         sort:{
//             sharedFileDate: -1
//         }
//       });

//       console.log("sharedFilesListTablesharedFilesListTable",sharedFilesListTable);
//       if(sharedFilesListTable !== null)
//       {
//         var ref = sharedFilesListTable.sharedFilesDetailsTableId;
//         var refObj = sharedFilesDetails.find({_id:ref},{sort:{ sharedFileDate: -1} });
//         console.log("refObjrefObjrefObjrefObjrefObj",refObj);
//         if(refObj.count() > 0)
//         {
//             refObj = sharedFilesDetails.findOne({_id:ref});
//             if(typeof refObj.editPermission !== "undefined")
//             {
//                 if(refObj.editPermission)
//                 {
//                     return 3;
//                 }
//                 else
//                 {
//                     if(typeof refObj.viewPermission !== "undefined")
//                     {
//                         if(refObj.viewPermission)
//                         {
//                             return 1;
//                         }
//                     }
//                     else
//                     {
//                         return 0;
//                     }
//                 }
//             }
//             else
//             {
//                 if(typeof refObj.viewPermission !== "undefined")
//                 {
//                     if(refObj.viewPermission)
//                     {
//                         return 1;
//                     }
//                 }
//                 else
//                 {
//                     return 0;
//                 }
//             }
//         }
//         /*for(var m = 0; m < sharedFilesListTable.length; m++)
//         {
//           if(typeof sharedFilesListTable[m].fileIds !== "undefined")
//           {
//             if(sharedFilesListTable[m].fileIds.length > 0)
//             {
//               for(var n = 0; n < sharedFilesListTable[m].fileIds.length; n++)
//               {
//                 filesIdsByNotification.push(sharedFilesListTable[m].fileIds[n]);
//               }
//             }
//           }
//         }*/
//       }
//     }
    
// }

function getFilePermissionForNotification(fileId, userId)
{

  var cuurentUserEmail = Meteor.user().username;
  var fetchFileInUserSharedFiles = userSharedFiles.find({
    $or: [
            {"toUserEmail": cuurentUserEmail},
            {"contactUserEmail": cuurentUserEmail}
        ],
          "fileId": fileId,
      });
  if(fetchFileInUserSharedFiles.count() > 0)
  {
    fetchFileInUserSharedFiles = userSharedFiles.findOne({
        $or: [
            {"toUserEmail": cuurentUserEmail},
            {"contactUserEmail": cuurentUserEmail}
        ],
        "fileId": fileId,
    });
    console.log("fetchFileInUserSharedFiles",fetchFileInUserSharedFiles);
    if(typeof fetchFileInUserSharedFiles.editPermission !== "undefined"){
      if(fetchFileInUserSharedFiles.editPermission){
        return 3;
      }
      else{
        if(typeof fetchFileInUserSharedFiles.viewPermission !== "undefined"){
          if(fetchFileInUserSharedFiles.viewPermission){
            return 1;
          }
          else{
            return 0;
          }
        }
        else{
          return 0;
        }
      }
    }
    else{
        if(typeof fetchFileInUserSharedFiles.viewPermission !== "undefined"){
            if(fetchFileInUserSharedFiles.viewPermission){
                return 1;
            }
            else{
                return 0;
            }
        }
        else{
            return 0;
        }
    } 
  }
}



function getFilePermission(fileId, userId)
{
    var fileDetails = userFiles.findOne({
        "_id": fileId
    });
    // console.log("fileDetails", fileDetails);
    var userdetails = Meteor.users.findOne({
        "_id": userId
    });
    // console.log("userdetails", userdetails);
    if(fileDetails.userId == userId)
    {
        return 3;
    }
    else
    {
        var fileCreatorId = fileDetails.userId;
        // console.log("fileCreatorId", fileCreatorId);
        var collaboratorDetails = userCollaborations.find({
            "userId": fileCreatorId,
            $or: [
                {"emailAddress": userdetails.username.toLowerCase()},
                {"contactEmail": userdetails.username.toLowerCase()}
            ]
        });
        // console.log("collaboratorDetails.count()", collaboratorDetails.count());
        if(collaboratorDetails.count() > 0)
        {
            collaboratorDetails = collaboratorDetails.fetch();
            // console.log("collaboratorDetails", collaboratorDetails);
            var allow = 0;
            var permission = 0;
            if(typeof fileDetails.fileFolder !== "undefined")
            {

                if(fileDetails.fileFolder !== "")
                {
                    for(var i = 0; i < collaboratorDetails.length; i++)
                    {
                        if(collaboratorDetails[i].fullAccess == false)
                        {
                            if(typeof collaboratorDetails[i].projectIds !== "undefined")
                            {
                                for(var j = 0; j < collaboratorDetails[i].projectIds.length; j++)
                                {
                                    if(collaboratorDetails[i].projectIds[j] == fileDetails.fileFolder)
                                    {
                                        if(collaboratorDetails[i].permission == "3" || collaboratorDetails[i].permission == "2")
                                        {
                                            allow = 1;
                                        }
                                        permission = parseInt(collaboratorDetails[i].permission);
                                    }
                                    else
                                    {
                                        var path = fileDetails.publicId;
                                        if(path.indexOf(collaboratorDetails[i].projectIds[j]) > -1)
                                        {
                                            if(collaboratorDetails[i].permission == "3" || collaboratorDetails[i].permission == "2")
                                            {
                                                allow = 1;
                                            }
                                            permission = parseInt(collaboratorDetails[i].permission);
                                        }
                                    }
                                } 
                            }
                            else
                            {
                                permission = 0;
                            }
                        }
                        else
                        {
                            for(var i = 0; i < collaboratorDetails.length; i++)
                            {
                                if(collaboratorDetails[i].fullAccess)
                                {
                                    allow = 1;
                                    permission = 3;
                                }
                            }
                            return permission;
                        }
                    }
                    return permission;
                }
                else
                {
                    for(var i = 0; i < collaboratorDetails.length; i++)
                    {
                        if(collaboratorDetails[i].fullAccess)
                        {
                            allow = 1;
                            permission = 3;
                        }
                    }
                    return permission;
                }
            }
            else
            {
                for(var i = 0; i < collaboratorDetails.length; i++)
                {
                    if(collaboratorDetails[i].fullAccess)
                    {
                        allow = 1;
                        permission = 3;
                    }
                }
                return permission;
            }
            

           /* if(typeof collaboratorDetails.fullAccess !== "undefined")
            {
                if(collaboratorDetails.fullAccess)
                {
                    return 3;
                }
                else
                {
                    if(typeof collaboratorDetails.permission !== "undefined")
                    {
                        var permission = collaboratorDetails.permission;
                        if(permission != "")
                        {
                            permission = parseInt(collaboratorDetails.permission);
                            return permission;
                        }
                        else
                        {
                            return 0;
                        }
                    }
                }
            } */
        }
        else
        {
            var collaboratorDetails = userCollaborations.find({
                "userId": userId
            });
            if(collaboratorDetails.count() > 0)
            {
                var allow = 0;
                var permission = 0;
                collaboratorDetails = collaboratorDetails.fetch();
                // console.log("collaboratorDetails test", collaboratorDetails);
                var fileCreatorId = fileDetails.userId;
                Meteor.subscribe("getUserDetails", fileCreatorId);
                var fileCreatorDetails = Meteor.users.findOne({"_id": fileCreatorId});
                for(var i = 0; i < collaboratorDetails.length; i++)
                {
                    if(typeof fileCreatorDetails !== "undefined")
                    {
                        if(collaboratorDetails[i].emailAddress == fileCreatorDetails.username)
                        {
                            if(collaboratorDetails[i].fullAccess)
                            {
                                allow = 1;
                                permission = 3;
                                return permission;
                            }
                            else
                            {
                                for(var j = 0; j < collaboratorDetails[i].projectIds.length; j++)
                                {
                                    var d = userFiles.find({
                                        "publicId": {
                                            $regex: new RegExp(collaboratorDetails[i].projectIds[j], "i")
                                        }
                                    });
                                    if(d.count() > 0)
                                    {
                                        if(collaboratorDetails[i].permission == "2" || collaboratorDetails[i].permission == "3")
                                        {
                                            allow = 1;
                                            permission = 3;
                                            return permission;
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
                return permission;
            }
        }
    }
}

function getFolderPermission(folderId, userId)
{
    var folderDetails = userFolders.find({
        "_id": folderId
    });
    if(folderDetails.count() > 0)
    {
        folderDetails = userFolders.findOne({
            "_id": folderId
        });
    }
    else
    {
        folderDetails = userReportFolders.find({
            "_id": folderId
        });
        if(folderDetails.count() > 0)
        {
            folderDetails = userReportFolders.findOne({
                "_id": folderId
            });
        }
    }
    var userdetails = Meteor.users.findOne({
        "_id": userId
    });
    if(folderDetails.userId == userId)
    {
        return 3;
    }
    else
    {
        var folderCreatorId = folderDetails.userId;
        var collaboratorDetails = userCollaborations.find({
            "userId": folderCreatorId,
            $or: [
                {"emailAddress": userdetails.username.toLowerCase()},
                {"contactEmail": userdetails.username.toLowerCase()}
            ]
        });
        console.log("folderDetails", folderDetails);
        if(collaboratorDetails.count() > 0)
        {
            collaboratorDetails = collaboratorDetails.fetch();
            var allow = 0;
            var permission = 0;
            if(typeof folderDetails.parentId !== "undefined")
            {
                if(folderDetails.parentId !== "")
                {
                    for(var i = 0; i < collaboratorDetails.length; i++)
                    {
                        console.log("collaboratorDetails", collaboratorDetails[i]);
                        console.log("folderDetails",folderDetails);
                        if(collaboratorDetails[i].fullAccess == false)
                        {
                            if(typeof collaboratorDetails[i].projectIds !== "undefined")
                            {
                                for(var j = 0; j < collaboratorDetails[i].projectIds.length; j++)
                                {
                                    var str = folderDetails.folderPath + "/" + folderDetails._id;
                                    if(str.indexOf(collaboratorDetails[i].projectIds[j]) >= 0)
                                    {
                                        if(collaboratorDetails[i].permission == "3" || collaboratorDetails[i].permission == "2")
                                        {
                                            allow = 1;
                                        }
                                        permission = parseInt(collaboratorDetails[i].permission);
                                    }
                                } 
                            }
                            else
                            {
                                permission = 0;
                            }
                        }
                        else
                        {
                            for(var i = 0; i < collaboratorDetails.length; i++)
                            {
                                if(collaboratorDetails[i].fullAccess)
                                {
                                    allow = 1;
                                    permission = 3;
                                }
                            }
                            return permission; 
                        }
                    }
                    return permission;
                }
                else
                {
                    for(var i = 0; i < collaboratorDetails.length; i++)
                    {
                        if(collaboratorDetails[i].fullAccess)
                        {
                            allow = 1;
                            permission = 3;
                        }
                    }
                    return permission; 
                }
            }
            else
            {
                for(var i = 0; i < collaboratorDetails.length; i++)
                {
                    if(collaboratorDetails[i].fullAccess)
                    {
                        allow = 1;
                        permission = 3;
                    }
                }
                return permission;
            }
        }
        else
        {
            var collaboratorDetails = userCollaborations.find({
                "userId": userId
            });
            if(collaboratorDetails.count() > 0)
            {
                var allow = 0;
                var permission = 0;
                collaboratorDetails = collaboratorDetails.fetch();
                console.log("collaboratorDetails test", collaboratorDetails);
                var folderCreatorId = folderDetails.userId;
                Meteor.subscribe("getUserDetails", folderCreatorId);
                var folderCreatorDetails = Meteor.users.findOne({"_id": folderCreatorId});
                for(var i = 0; i < collaboratorDetails.length; i++)
                {
                    if(collaboratorDetails[i].emailAddress == folderCreatorDetails.username)
                    {
                        if(collaboratorDetails[i].fullAccess)
                        {
                            allow = 1;
                            permission = 3;
                            return permission;
                        }
                        else
                        {
                            for(var j = 0; j < collaboratorDetails[i].projectIds.length; j++)
                            {
                                var d = userFolders.find({
                                    "folderPath": {
                                        $regex: new RegExp(collaboratorDetails[i].projectIds[j], "i")
                                    }
                                });
                                if(d.count() > 0)
                                {
                                    if(collaboratorDetails[i].permission == "2" || collaboratorDetails[i].permission == "3")
                                    {
                                        allow = 1;
                                        permission = 3;
                                        return permission;
                                    }
                                }
                            }
                        }
                        
                    }
                }
                return permission;
            }
        }
    }
}
function hasDuplicates(arr) {
    var counts = [];

    for (var i = 0; i <= arr.length; i++) {
        if (counts[arr[i]] === undefined) {
            counts[arr[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}
function validateMultipleEmail(emailArray)
{
    var hasDuplicatesEmails = hasDuplicates(emailArray);
    if(hasDuplicatesEmails)
    {
        var returnObj = {
            "result": false,
            "message": "Emails contains duplicate emails."
        };
    }
    else
    {
        var err = 0;
        for(var i = 0; i < emailArray.length; i++)
        {
            var res = validateEmail(emailArray[i]);
            if(!res)
            {
                err++;
            }
        }
        if(err > 0)
        {
            var returnObj = {
                "result": false,
                "message": "Emails contains invalid email addresses."
            };
        }
        else
        {
            var returnObj = {
                "result": true,
                "message": "Validation Passed."
            };
        }
    }
    return returnObj;
}
function appHistoryPush(url)
{
    if(Session.get("appHistory") == undefined)
    {
        var t = [url];
        Session.set("appHistory", t);
    }
    else
    {
        var t = Session.get("appHistory");
        if(typeof t == "string")
        {
            t = [Session.get("appHistory")];
        }
        if(t[(t.length -1)] !== url){
            t.push(url);
        }
        Session.set("appHistory", t);
    }
}

function appHistoryPull()
{
    var t = Session.get("appHistory");
    if(typeof t !== "undefined")
    {
        t.pop();
        var url = t[(t.length -1)];
    }
    else
    {
        var url = "/";
    }
    Session.set("appHistory", t);
    return url;
}

