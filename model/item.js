var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  unit: String,
  price: Number,
  image: String,
  description: String,
  inventory: Number,
  category: {type: Schema.ObjectId, ref: 'Category'},
  specification: String,
  isRecommend: String
});

module.exports = mongoose.model('Item',ItemSchema);
