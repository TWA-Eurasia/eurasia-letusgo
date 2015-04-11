var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IndentSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  cartItems: [{type: Schema.ObjectId, ref: 'CartItem'}],
  createDate: Date,
  isPaid: {type: Boolean, default: false}
});

IndentSchema.methods.getTotal = function(cartItems) {
  var total = 0;

  cartItems.forEach(function(cartItem) {
    total += parseFloat(cartItem.getSubtotal());
  });

  return total.toFixed(2);
};

module.exports = mongoose.model('Indent',IndentSchema);
