import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userSharedFiles = new Mongo.Collection('usersharedfiles');

var Schemas = {};
Schemas.userSharedFilesSchema = new SimpleSchema({
	fromUserId: {
		type: String,
		optional: false
	},
	contactUserId: {
		type: String,
		optional: true
	},
	contactUserEmail: {
		type: String,
		optional: true
	},
	toUserEmail: {
		type: String,
		optional: true
	},
	fileId: {
		type: String,
		optional: true
	},
	viewPermission: {
		type: Boolean,
		optional: true,
		defaultValue: false
	},
	editPermission: {
		type: Boolean,
		optional: true,
		defaultValue: false
	},
	messageForUser: {
		type: String,
		optional: true
	},
	token: {
		type: String,
		optional: true
	},
	dateCreated: {
		type: Date,
		optional: true,
		defaultValue: new Date()
	},
	dateUpdated: {
		type: Date,
		optional: true,
		defaultValue: new Date()
	}
});
userSharedFiles.attachSchema(Schemas.userSharedFilesSchema);
