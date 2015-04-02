var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  item: {type: Schema.ObjectId, ref: 'Item'},
  number: Number
});

var cartItem = mongoose.model('CartItem',CartItemSchema);

cartItem.getSubtotal = function() {

  var subtotal = 0;
  subtotal =  this.item.price * this.number;

  return subtotal;
};

module.exports = cartItem;
