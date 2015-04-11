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

//var Item = mongoose.model('Item', ItemSchema);
//
//ItemSchema.methods.getItemByCartItemId = function (cartItems){
//
//  var itemIds = [];
//  cartItems.forEach(function(cartItem){
//
//    itemIds.push(cartItem.item._id);
//  });
//  Item.where('_id').in(itemIds).exec(function(err, items){
//    callback(items);
//  });
//};

//module.exports = Item ;
module.exports = mongoose.model('Item', ItemSchema);
