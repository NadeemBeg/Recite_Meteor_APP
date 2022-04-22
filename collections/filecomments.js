import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
fileComments = new Mongo.Collection('filecomments');
var Schemas = {};
Schemas.fileCommentsSchema = new SimpleSchema({
	fileId: {
		type: String,
		optional: false
	},
	userId: {
		type: String,
		optional: false
	},
	comments: {
		type: String,
		optional: false
	},
	dateCreated: {
		type: Date,
		optional: false
	},
});
fileComments.attachSchema(Schemas.fileCommentsSchema);
