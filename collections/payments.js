import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
payments = new Mongo.Collection('userpayments');
var Schemas = {};
Schemas.paymentsSchema = new SimpleSchema({
	userId: {
		type: String,
		optional: false
	},
	paymentId: {
		type: String,
		optional: false
	},
	paymentResponse: {
		type: String,
		optional: false
	},
	paymentStatus: {
		type: String,
		optional: false
	},
	paymentDate: {
		type: Date,
		optional: false
	}
});
payments.attachSchema(Schemas.paymentsSchema);
