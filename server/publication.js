import { publishComposite } from 'meteor/reywood:publish-composite';
Meteor.publish("getUserFolders", function(userId) {
	return userFolders.find({
		"userId": userId
	});
});
Meteor.publish("getUserReportFolders", function(userId) {
	return userReportFolders.find({
		"userId": userId
	});
});
Meteor.publish("getFilesByUser", function(userId) {
	
	return userFiles.find({
		"userId": userId
	});
});
Meteor.publish("getUserDetails", function(userId) {
	
	return Meteor.users.find({
		"_id": userId
	});
});
Meteor.publish("getUserPlans", function(userId){
	return userPlans.find({
		"userId": userId
	});
});
Meteor.publish("getFilesByFolder", function(folderId){
	return userFiles.find({
		"publicId": {
			$regex: new RegExp(folderId, "i")
		}
	});
});
Meteor.publish("getFoldersByFolder", function(folderId){
	return userFolders.find({
		"folderPath": {
			$regex: RegExp(folderId, "i")
		}
	});
});
Meteor.publish("getFileDetails", function(fileId){
	var userFileDetails = userFiles.find({
		"_id": fileId
	});
	if(userFileDetails.count() > 0)
	{
		return userFileDetails;
	}
	else
	{
		var userReportsFiles = userReportFiles.find({
			"_id": fileId
		});
		if(userReportsFiles.count() > 0)
		{
			return userReportsFiles;
		}
	}
});
Meteor.publish("getFolderDetails", function(fileId){
	var data = userFolders.find({
		"_id": fileId
	});
	if(data.count() == 0)
	{
		data = userReportFolders.find({
			"_id": fileId
		});
	}
	return data;
});
Meteor.publish("getUserStarredFiles", function(userId){
	return userStarredFiles.find({
		"userId": userId
	});
});
Meteor.publish("getUserStarredFolders", function(userId){
	return userStarredFolders.find({
		"userId": userId
	});
});

Meteor.publish("getUserInvites", function(userId){
	return userInvitess.find({
		"userId": userId
	});
});
Meteor.publish("getFileTags", function(fileId){
	return userTaggedFiles.find({
		"resourceId": fileId
	});
});
Meteor.publish("getUserContacts", function(userId){
	return userContacts.find({
		"userId": userId
	});
});
/*Meteor.publish("getUserSharedFiles", function(userId){
  		return sharedFilesUsersDetails.find({
  			"userId": userId
  		});
});
*/
Meteor.publish("getUserNotifications", function(userId){
	return notificationDetails.find({
		"toUserId": userId
	})
});
/*Meteor.publish("getSharedFileTableById", function(id){
	return sharedFilesDetails.find({
		"_id": id
	});
});*/
Meteor.publish("getReportFilesByUser", function(userId){
	return userReportFiles.find({
		"userId": userId
	});
});

Meteor.publish("getReportUserFolders", function(userId){
	return userReportFolders.find({
		"userId": userId
	});
});
Meteor.publish("getReportFilesByUserFiltered", function(userId){
	var userDetails = Meteor.users.findOne({
		"_id": userId
	});
	var collboratorsDetails = userCollaborations.find({
        $or: [
            {"emailAddress": emailAddress},
            {"contactEmail": emailAddress}
        ]
    }).fetch();
    var newCollaborators = [];
    if(collboratorsDetails.length > 0)
    {
    	for(var i = 0; i < collboratorsDetails.length; i++)
    	{
    		newCollaborators.push(collboratorsDetails[i].userId);
    	}
    }
    newCollaborators.push(userId);
	return userReportFiles.find({
		"userId": {
			$in: newCollaborators,
		},
		"isDeleted": false
	});
});
Meteor.publish("getFilesByUserFiltered", function(userId) {
	var userDetails = Meteor.users.findOne({
		"_id": userId
	});
	var newCollaborators = [];
	if(typeof userDetails !== "undefined")
	{
		var collboratorsDetails = userCollaborations.find({
	        $or: [
	            {"emailAddress": userDetails.username},
	            {"contactEmail": userDetails.username}
	        ]
	    }).fetch();
	    if(collboratorsDetails.length > 0)
	    {
	    	for(var i = 0; i < collboratorsDetails.length; i++)
	    	{
	    		newCollaborators.push(collboratorsDetails[i].userId);
	    	}
	    }
	}    
    newCollaborators.push(userId);
	return userFiles.find({
		"userId": {
			$in: newCollaborators,
		},
		"isDeleted": false
	});
});

Meteor.publish("getSharedFilesToUser", function(){
	return sharedFilesDetails.find({

	});
});

Meteor.publish("getSharedFilesUsersToUser", function(){
	return sharedFilesUsersDetails.find({
		
	});
});

Meteor.publish("getSharedFilesListToUser", function(){
	return sharedFilesList.find({
		
	});
});

/*Meteor.publish("getUserSharedFiles", function(userId){
	var userDetails = Meteor.users.find({
		"_id": userId
	});
	if(userDetails.count() > 0)
	{
		userDetails = Meteor.users.findOne({
			"_id": userId
		});
		return userSharedFiles.find({
			$or: [
              {
                "contactUserEmail": userDetails.username
              },
              {
                "toUserEmail": userDetails.username
              }
            ]
		}); 
	}
	
});*/
publishComposite("getUserSharedFiles", function(userId){
	return {
		find() {
			var userDetails = Meteor.users.find({
				"_id": userId
			});
			if(userDetails.count() > 0)
			{
				userDetails = Meteor.users.findOne({
					"_id": userId
				});
				return userSharedFiles.find({
					$or: [
		              {
		                "contactUserEmail": userDetails.username
		              },
		              {
		                "toUserEmail": userDetails.username
		              }
		            ]
				}); 
			}
		},
		children:[
			{
				find(rec) {
					return Meteor.users.find({
						"_id": rec.fromUserId
					});
				}
			},
			{
				find(rec) {
					return userFiles.find({
						"_id": rec.fileId
					});
				}
			}
		]
	}
});
publishComposite('getSharedFileTableById', function(Id){
	return {
		find() {
			return sharedFilesDetails.find({
				"_id": Id
			});
		},
		children: [
			{
				find(rec) {
					return sharedFilesList.find({
						"sharedFilesDetailsTableId": rec._id
					});
				},
				children: [{
					find(rec1) {
						return userFiles.find({
							"_id": {
								$in: rec1.fileIds
							}
						})
					}
				}]
			},
			{
				find(rec) {
					return sharedFilesUsersDetails.find({
						"sharedFileId": rec._id
					});
				}
			}
		]
	}
});

publishComposite('getSharedFileTableByIds', function(Id){
	return {
		find() {
			return sharedFilesDetails.find({
				"_id": {
					$in: Id
				}
			});
		},
		children: [
			{
				find(rec) {
					return sharedFilesList.find({
						"sharedFilesDetailsTableId": rec._id
					});
				},
				children: [{
					find(rec1) {
						return userFiles.find({
							"_id": {
								$in: rec1.fileIds
							}
						})
					}
				}]
			},
			{
				find(rec) {
					return sharedFilesUsersDetails.find({
						"sharedFileId": rec._id
					});
				}
			}
		]
	}
});



publishComposite('sharedFiles', function(userId){
	return {
		find() {
			var userDetails = Meteor.users.findOne({
				_id: userId
			});
			var contacts = userContacts.find({
				$or: [
					{"workEmail": userDetails.username},
					{"personalEmail": userDetails.username}
				]
			}).fetch();
			var ids = [];
			for(var i = 0; i < contacts.length; i++)
			{
				ids.push(contacts[i]._id);
			}
            return sharedFilesUsersDetails.find({ 
            	$or: [
					{
						userId: {
							$in: ids
						}
					},
					{
						"userEmail": userDetails.username
					}
				]
            });
        },
        children: [
        	{
	            find(post) {
	                return sharedFilesDetails.find(
	                    {
	                    	"_id": post.sharedFileId
	                    });
	            },
	            children: [{
	            	find(secondTierDocument, topLevelDocument) {
                        return Meteor.users.find({
                        	"_id": secondTierDocument.userId
                        });
                    }
	            }]
	        }
        ]
	}
});

Meteor.publish("getAllCollaborations", function(userId){
	return userCollaborations.find({});
});
Meteor.publish("getCollaboratorsFiles", function(arr){
	return userFiles.find({
          "userId": {
            $in: arr
          }
      });
});
Meteor.publish("getCollaboratorsFolders", function(arr){
	
	return userFolders.find({
          "userId": {
            $in: arr
          }
      });
});

Meteor.publish("getCollaboratorsReportFiles", function(arr){
	return userReportFiles.find({
          "userId": {
            $in: arr
          }
      });
});
Meteor.publish("getCollaboratorsReportFolders", function(arr){
	
	return userReportFolders.find({
          "userId": {
            $in: arr
          }
      });
});


//29_aug

Meteor.publish("allUsers",function(){
	return Meteor.users.find({});
});

//10_sep
Meteor.publish("paymentDetailsUser",function(userId){
	return paymentDetails.find({_id: userId});
});
Meteor.publish("allCommentsOnFile",function(fileId){
	return fileComments.find({fileId: fileId});
});
Meteor.pub