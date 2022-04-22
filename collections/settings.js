import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);


adminSettings = new Mongo.Collection('settings');
	var Schemas = {};
	Schemas.adminSettingsSchema = new SimpleSchema({
		twilioSID: {
			type: String,
			optional: true,
		},
		twilioAuthToken: {
			type: String,
			optional: true,
		},
		cloudinaryCloudName: {
			type: String,
			optional: true,
		},
		cloudinaryApiKey: {
			type: String,
			optional: true,
		},
		cloudinaryApiSecret: {
			type: String,
			optional: true,
		},
		facebookAppId: {
			type: String,
			optional: true,
		},
		facebookSecret: {
			type: String,
			optional: true,
		},
		googleAppId: {
			type: String,
			optional: true,
		},
		googleSecret: {
			type: String,
			optional: true,
		}
	});
	adminSettings.attachSchema(Schemas.adminSettingsSchema);