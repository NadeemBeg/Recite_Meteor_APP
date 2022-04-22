import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
sharedFilesDetails = new Mongo.Collection('sharedfiles');
var Schemas = {};
Schemas.sharedFilesDetailsSchema = new SimpleSchema({
	userId: {
		type: String,
		optional: false
	},
	viewPermission: {
		type: Boolean,
		optional: false,
		defaultValue: false
	},
	editPermission: {
		type: Boolean,
		optional: false,
		defaultValue: false
	},
	shareMessage: {
		type: String,
		optional: true
	},
	sharedDate: {
		type: Date,
		optional: false,
		defaultValue: new Date()
	},
});
sharedFilesDetails.attachSchema(Schemas.sharedFilesDetailsSchema);
