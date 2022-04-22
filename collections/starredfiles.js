import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userStarredFiles = new Mongo.Collection('userstarredfiles');
var Schemas = {};
Schemas.userStarredFilesSchema = new SimpleSchema({
	fileId: {
		type: String,
		optional: false
	},
	userId: {
		type: String,
		optional: false
	}
});
userStarredFiles.attachSchema(Schemas.userStarredFilesSchema);
