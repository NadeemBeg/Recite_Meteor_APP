import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userCollaborations = new Mongo.Collection('usercollaborations');
var Schemas = {};
Schemas.userCollaborationsSchema = new SimpleSchema({
	userId: {
		type: String,
		optional: false
	},
	emailAddress: {
		type: String,
		optional: true
	},
	contactId: {
		type: String,
		optional: true
	},
	contactEmail: {
		type: String,
		optional: true
	},
	permission: {
		type: String,
		optional: true
	},
	fullAccess: {
		type: Boolean,
		optional: true,
		defaultValue: false
	},
	projectIds: {
		type: Array,
		optional: false
	},
	'projectIds.$': {
		type: String,
		optional: false
	},
	dateCreated: {
		type: Date,
		optional: false
	}
});
userCollaborations.attachSchema(Schemas.userCollaborationsSchema);
