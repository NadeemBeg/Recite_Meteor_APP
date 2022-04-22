import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
notificationDetails = new Mongo.Collection('notifications');
var Schemas = {};
Schemas.notificationDetailsSchema = new SimpleSchema({
	toUserId: {
		type: String,
		optional: false
	},
	fromUserId: {
		type: String,
		optional: false
	},
	shareedFileTableId: {
		type: String,
		optional: false
	},
	notificationDate: {
		type: Date,
		optional: false
	},
	readStatus: {
		type: Boolean,
		optional: true,
		defaultValue: false
	}
});
notificationDetails.attachSchema(Schemas.notificationDetailsSchema);
