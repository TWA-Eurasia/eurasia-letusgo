var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartItem = require('./cartItem');

var CartSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  cartItems: [{type: Schema.ObjectId, ref: 'CartItem'}
  ]
});

CartSchema.methods.getTotal = function (cartItems) {

  var totalAmount = 0;
  cartItems.forEach(function (cartItem) {
    totalAmount += parseFloat(cartItem.getSubtotal());
  });
  return totalAmount.toFixed(2);
};

module.exports = mongoose.model('Cart', CartSchema);
