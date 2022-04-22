import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
ProfileSchema = new SimpleSchema({
 fullName: {
   type: String,
   optional: false,
 },
 phoneNumber: {
   type: String,
   optional: true,
   autoform: {
     type: 'tel'
   }
 },
 otp: {
   type: String,
   optional: true
 },
 otpTime: {
   type: Date,
   optional: true
 },
 isNumberVerified: {
   type: Boolean,
   optional:true,
   defaultValue: false
 },
 profilePic: {
   type: String,
   optional: true
 },
 companyEmail: {
   type: String,
   optional: true
 },
 jobTitle: {
   type: String,
   optional: true
 },
 phoneNumberOffice: {
   type: String,
   optional: true,
   autoform: {
     type: 'tel'
   }
 },
 phoneNumberOfficeExt: {
   type: String,
   optional: true,
   autoform: {
     type: 'tel'
   }
 },
 phoneNumberHome: {
   type: String,
   optional: true,
   autoform: {
     type: 'tel'
   }
 },
 phoneNumberFax: {
   type: String,
   optional: true,
   autoform: {
     type: 'tel'
   }
 },
 addressLine1: {
   type: String,
   optional: true
 },
 addressLine2: {
   type: String,
   optional: true
 },
 addressCity: {
   type: String,
   optional: true
 },
 addressState: {
   type: String,
   optional: true
 },
 addressZip: {
   type: String,
   optional: true
 },
 addressCountry: {
   type: String,
   optional: true
 },
 publicNotes: {
   type: String,
   optional: true
 },
 privateNotes: {
   type: String,
   optional: true
 },
 socialFacebook: {
   type: String,
   optional: true
 },
 socialGoogle: {
   type: String,
   optional: true
 },
 socialTwitter: {
   type: String,
   optional: true
 },
 socialLinkedIn: {
   type: String,
   optional: true
 },
 socialWebsite: {
   type: String,
   optional: true
 },
 pushNotificationRegister: {
   type: Boolean,
   optional: true,
   defaultValue:false
 },
 pushAlwaysOn:{
   type: Boolean,
   optional: true,
   defaultValue:false
 },
 pusheighttoeight:{
   type: Boolean,
   optional: true,
   defaultValue:false
 },
 pushOff:{
   type: Boolean,
   optional: true,
   defaultValue:false
 },
 isDeleted: {
   type: Boolean,
   optional: false,
   defaultValue: false
 }
});
Meteor.users.attachSchema(new SimpleSchema({
 username: {
   type: String,
   regEx: SimpleSchema.RegEx.Email,
   optional: true
 },
 emails: {
   type: Array,
   optional: true
 },
 "emails.$": {
   type: Object,
   optional: true
 },
 "emails.$.address": {
   type: String,
   regEx: SimpleSchema.RegEx.Email,
   optional: true,
   autoform: {
     type: 'email'
   }
 },
 "emails.$.verified": {
   type: Boolean,
   optional: true
 },
 createdAt: {
   type: Date,
   optional: true,
   defaultValue: new Date()
 },
 profile: {
   type: ProfileSchema,
 },
 services: {
   type: Object,
   optional: true,
   blackbox: true
 },
 roles: {
   type: Array,
   defaultValue: [],
   blackbox: true
 },
 "roles.$": {
   type: String,
   blackbox: true
 }
}));