var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  unit: String,
  brand: String,
  price: Number,
  leftNumber: Number,
  saleNumber: {type: Number, default: 0},
  imageUrl: String,
  description: String,
  state: {type: String, default: 'new'},
  category: {type: Schema.ObjectId, ref: 'Category'},
  specification: String
});

module.exports = mongoose.model('Item',ItemSchema);
