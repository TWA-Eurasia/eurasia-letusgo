var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  cart: {type: Schema.ObjectId, ref: 'Cart'},
  indents: [{
    indent: {type: Schema.ObjectId, ref: 'Indent'}
  }]
});
module.exports = mongoose.model('User', UserSchema);
