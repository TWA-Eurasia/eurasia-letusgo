var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  item: {type: Schema.ObjectId, ref: 'Item'},
  number: Number
});

CartItemSchema.methods.getSubtotal = function () {

  var subtotal = this.item.price * this.number;

  return subtotal.toFixed(2);
};

module.exports = mongoose.model('CartItem', CartItemSchema);
