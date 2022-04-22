import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
userPlans = new Mongo.Collection('userplans');
var Schemas = {};
Schemas.userPlansSchema = new SimpleSchema({
	userId: {
		type: String,
		optional: false
	},
	paymentId: {
		type: String,
		optional: false
	},
	planType: {
		type: String,
		optional: false
	},
	storageSpace: {
		type: String,
		optional: false
	},
	planStartDate: {
		type: Date,
		optional: false
	},
	planEndDate: {
		type: Date,
		optional: false
	},
	isExpired: {
		type: Boolean,
		optional: false
	},
	recordDate: {
		type: Date,
		optional: false
	}
});
userPlans.attachSchema(Schemas.userPlansSchema);
