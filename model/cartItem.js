var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  item: {type: Schema.ObjectId, ref: 'Item'},
  number: Number
});

CartItemSchema.methods = {

  getSubtotal: function () {
    return this.number * this.item.price;
  }
};

module.exports = mongoose.model('CartItem', CartItemSchema);;
