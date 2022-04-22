import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userReportFolders = new Mongo.Collection('userreportfolders');
var Schemas = {};
Schemas.userReportFoldersSchema = new SimpleSchema({
	folderName: {
		type: String,
		optional: false
	},
	userId: {
		type: String,
		optional: false
	},
	parentId: {
		type: String,
		optional: true
	},
	folderPath: {
		type: String,
		optional: true
	},
	dateCreated: {
		type: Date,
		optional: false
	},
	dateModified: {
		type: Date,
		optional: false
	},
	referenceId: {
		type: String,
		optional: true
	},
	isDeleted: {
		type: Boolean,
		optional: false,
		defaultValue: false
	}
});
userReportFolders.attachSchema(Schemas.userReportFoldersSchema);
