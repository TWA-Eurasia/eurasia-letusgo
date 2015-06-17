'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  password: String,
  address: String,
  email: String,
  phoneNumber: String,
  active: {type: Boolean, default: false},
  createDate: Date,
  cart: {type: Schema.ObjectId, ref: 'Cart'},
  indents: [{type: Schema.ObjectId, ref: 'Indent'}]
});
module.exports = mongoose.model('User', UserSchema);
