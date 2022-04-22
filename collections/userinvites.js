import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userInvitess = new Mongo.Collection('userinvites');
var Schemas = {};
Schemas.userInvitessSchema = new SimpleSchema({
	userId: {
		type: String,
		optional: false
	},
	invitedUserId: {
		type: String,
		optional: false
	},
	recId: {
		type: String,
		optional: false
	},
	dateInvited: {
		type: Date,
		optional: false
	}
});
userInvitess.attachSchema(Schemas.userInvitessSchema);
userInvitess.allow({
  insert(userId, doc) {
    // The user must be logged in and the document must be owned by the user.
    return true;
  },

  update(userId, doc, fields, modifier) {
    // Can only change your own documents.
    return true;
  },

  remove(userId, doc) {
    // Can only remove your own documents.
    return true;
  },

  fetch: ['owner']
});