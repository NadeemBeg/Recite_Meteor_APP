import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userReportFiles = new Mongo.Collection('userreportfiles');
var Schemas = {};
Schemas.userReportFilesSchema = new SimpleSchema({
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
	fileTableId: {
		type: String,
		optional: false
	}
});
userReportFiles.attachSchema(Schemas.userReportFilesSchema);
