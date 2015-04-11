var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Item = require('./item');

var CartItemSchema = new Schema({
  item: {type: Schema.ObjectId, ref: 'Item'},
  number: Number
});

CartItemSchema.methods.getSubtotal = function() {

  var subtotal =  this.item.price * this.number;

  return  subtotal.toFixed(2);
};

CartItemSchema.methods.getItemId = function(cartItem){

  var item = new Item();
  console.log(item.getId(cartItem.item));

  return item.getId(cartItem.item);
};

module.exports = mongoose.model('CartItem',CartItemSchema);
