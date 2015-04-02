var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  item: {type: Schema.ObjectId, ref: 'Item'},
  number: Number
});

var cartItem = mongoose.model('CartItem',CartItemSchema);

cartItem.getSubtotal = function(cartItem) {

  var subtotal = 0;
  subtotal =  cartItem.item.price * cartItem.number;

  return subtotal;
};

module.exports = cartItem;
