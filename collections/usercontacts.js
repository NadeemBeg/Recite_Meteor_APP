import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userContacts = new Mongo.Collection('usercontacts');
var Schemas = {};
Schemas.userContactsSchema = new SimpleSchema({
	userId: {
		type: String,
		optional: false
	},
	fullName: {
		type: String,
		optional: false
	},
	profilePic: {
		type: String,
		optional: true
	},
	contactTitle: {
		type: String,
		optional: true
	},
	company: {
		type: String,
		optional: true
	},
	workNumber: {
		type: String,
		optional: true
	},
	personalNumber: {
		type: String,
		optional: false
	},
	workEmail: {
		type: String,
		optional: true
	},
	personalEmail: {
		type: String,
		optional: true
	},
	homeAddress: {
		type: String,
		optional: true
	},
	workAddress: {
		type: String,
		optional: true
	},
	website: {
		type: String,
		optional: true
	},
	facebook: {
		type: String,
		optional: true
	},
	linkedin: {
		type: String,
		optional: true
	},
	contactTags: {
		type: Array,
		optional: true
	},
	"contactTags.$": {
		type: String,
		optional: true
	},
});
userContacts.attachSchema(Schemas.userContactsSchema);
