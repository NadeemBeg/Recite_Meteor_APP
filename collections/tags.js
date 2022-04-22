import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userTaggedFiles = new Mongo.Collection('taggedfiles');
var Schemas = {};
Schemas.userTaggedFilesSchema = new SimpleSchema({
	resourceType: {
		type: String,
		optional: false
	},
	resourceId: {
		type: String,
		optional: false
	},
	userId: {
		type: String,
		optional: false
	},
	tagText: {
		type: String,
		optional: false
	},
	tagColor: {
		type: String,
		optional: false
	},
	dateCreated: {
		type: Date,
		optional: false
	}
});
userTaggedFiles.attachSchema(Schemas.userTaggedFilesSchema);
