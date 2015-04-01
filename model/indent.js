var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IndentSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  cartItems: [{type: Schema.ObjectId, ref: 'CartItem'}],
  date: Date,
  isPaid: {type: Boolean, default: false}
});

module.exports = mongoose.model('Indent',IndentSchema);
