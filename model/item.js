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
  price: {type: Number, get: setPrice},
  inventory: Number,
  isRecommend: Boolean
});

function setPrice(num){
  return num.toFixed(2);
}

module.exports = mongoose.model('Item', ItemSchema);
