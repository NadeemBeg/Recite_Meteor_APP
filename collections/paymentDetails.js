import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
paymentDetails = new Mongo.Collection('paymentDetails');
var Schemas = {};
Schemas.paymentDetailsSchema = new SimpleSchema({
	CardNumber: {
		type: String,
		optional: false,
		label: "Card Number"
	},

	NameOnCard: {
		type: String,
		optional: false,
		label: "Name on Card"
	},

	expirationMonth: {
		type: Number,
		optional: false,
		label: "Expiration Month"
	},

	expirationYear: {
		type: Number,
		optional: false,
		label: "Expiration Year"
	},
	// cardType:{
	// 	type: String,
	// 	optional: false,
	// 	label: "Card Type"
	// },
	userId:{
		type: String,
		optional: false,
		label: "User ID"
	},
	addressLineOne: {
		type: String,
		optional: false,
		label: "Address Line One"
	},
	addressLineTwo: {
		type: String,
		optional: false,
		label: "Address Line Two"
	},
	billingcity: {
		type: String,
		optional: false,
		label: "Billing city"
	},
	stateSelectDropDwon: {
		type: String,
		optional: false,
		label: "State Select Drop Dwon"
	},
	zipCodeSelectDropDwon: {
		type: String,
		optional: false,
		label: "Zip Code Select Drop Dwon"
	},
	createdAt: {
		type: Date,
		optional: false,
		defaultValue: new Date()
	}
});
paymentDetails.attachSchema(Schemas.paymentDetailsSchema);
