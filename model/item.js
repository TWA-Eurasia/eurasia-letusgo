var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  unit: String,
  image: String,
  description: String,
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  specification: String,
  price: Number,
  inventory: Number,
  isRecommend: Boolean
});

module.exports = mongoose.model('Item', ItemSchema);
