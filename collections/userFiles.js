import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userFiles = new Mongo.Collection('userfiles');
var Schemas = {};
Schemas.userFilesSchema = new SimpleSchema({
	fileName: {
		type: String,
		optional: false
	},
	userId: {
		type: String,
		optional: false
	},
	publicId: {
		type: String,
		optional: false
	},
	fileUrl: {
		type: String,
		optional: false
	},
	fileSize: {
		type: Number,
		optional: false
	},
	fileType: {
		type: String,
		optional: false
	},
	resourceType: {
		type: String,
		optional: false
	},
	dateCreated: {
		type: Date,
		optional: false
	},
	dateModified: {
		type: Date,
		optional: false
	},
	fileFormat: {
		type: String,
		optional: false
	},
	fileFolder: {
		type: String,
		optional: true
	},
	isDeleted: {
		type: Boolean,
		optional: false,
		defaultValue: false
	},
	showInReports: {
		type: Boolean,
		optional: true,
		defaultValue: false
	}
});
userFiles.attachSchema(Schemas.userFilesSchema);
