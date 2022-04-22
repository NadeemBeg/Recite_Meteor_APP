import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userStarredFolders = new Mongo.Collection('userstarredfolders');
var Schemas = {};
Schemas.userStarredFoldersSchema = new SimpleSchema({
	fileId: {
		type: String,
		optional: false
	},
	userId: {
		type: String,
		optional: false
	}
});
userStarredFolders.attachSchema(Schemas.userStarredFoldersSchema);
