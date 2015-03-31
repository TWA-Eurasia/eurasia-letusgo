var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  image: String,
  name: String,
  unit: String,
  price: Number,
  inventory: Number,
  specification: String,
  description: String,
  state: {type: String, default: 'new'},
  category: {type: Schema.ObjectId, ref: 'Category'}
});

module.exports = mongoose.model('Item',ItemSchema);
