import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userFolders = new Mongo.Collection('userfolders');
var Schemas = {};
Schemas.userFoldersSchema = new SimpleSchema({
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
	},
	showInReports: {
		type: Boolean,
		optional: true,
		defaultValue: false
	}
});
userFolders.attachSchema(Schemas.userFoldersSchema);
