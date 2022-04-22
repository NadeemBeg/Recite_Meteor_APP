import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
sharedFilesList = new Mongo.Collection('sharedfileslist');
var Schemas = {};
Schemas.sharedFilesListSchema = new SimpleSchema({
	sharedFilesDetailsTableId: {
		type: String,
		optional: false
	},
	fileIds: {
		type: Array,
		optional: false
	},
	'fileIds.$': {
		type: String,
		optional: false
	},
	sharedFileDate: {
		type: Date,
		optional: false,
		defaultValue: new Date()
	}
});
sharedFilesList.attachSchema(Schemas.sharedFilesListSchema);
