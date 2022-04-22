import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
sharedFilesUsersDetails = new Mongo.Collection('sharedfilesusers');
var Schemas = {};
Schemas.sharedFilesUsersDetailsSchema = new SimpleSchema({
	sharedFileId: {
		type: String,
		optional: false
	},
	userId: {
		type: String,
		optional: true
	},
	userEmail: {
		type: String,
		optional: true
	},
	isEmail: {
		type: Boolean,
		optional: true
	},
	contactUserEmail: {
		type: String,
		optional: true
	},
	sharedFileDate: {
		type: Date,
		optional: false,
		defaultValue: new Date()
	}
});
sharedFilesUsersDetails.attachSchema(Schemas.sharedFilesUsersDetailsSchema);
