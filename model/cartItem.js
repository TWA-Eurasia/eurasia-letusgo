var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  item: {type: Schema.ObjectId, ref: 'Item'},
  number: Number
});

CartItemSchema.methods.getSubtotal = function() {

  var subtotal = 0;
  subtotal =  this.item.price * this.number;

  return subtotal;
};

module.exports = mongoose.model('CartItem',CartItemSchema);
