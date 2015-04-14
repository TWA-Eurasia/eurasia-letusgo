var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartItem = require('./cartItem');

var CartSchema = new Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  cartItems: [{type: Schema.ObjectId, ref: 'CartItem'}
  ]
});

CartSchema.methods.getTotal = function (cartItems) {

  return _.reduce(cartItems, function (totalAmount, cartItem) {
    return totalAmount + parseFloat(cartItem.getSubtotal());
  }, 0);
};

module.exports = mongoose.model('Cart', CartSchema);
