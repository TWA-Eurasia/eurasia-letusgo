var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type: String, unique: true},
  password: String,
  phoneNumber: Number,
  address: String,
  email: String,
  cart: {type: Schema.ObjectId, ref: 'Cart'},
  indents: [{
    indent: {type: Schema.ObjectId, ref: 'Indent'}
  }]
});
module.exports = mongoose.model('User',UserSchema);
