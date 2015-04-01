var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  item: {type: Schema.ObjectId, ref: 'Item'},
  number: Number
});

module.exports = mongoose.model('CartItem',CartItemSchema);
