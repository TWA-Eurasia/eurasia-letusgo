var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var _ = require('lodash');
var ItemSchema = new Schema({
  name: String,
  unit: String,
  price: Number,
  image: String,
  description: String,
  inventory: Number,
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  specification: String,
  isRecommend: Boolean
});

ItemSchema.statics.getDetails = function(items) {
  var details = [];

  items.forEach(function(item) {

    if (item.specification !== '') {
      var detail = {
        price: item.price,
        specification: item.specification,
        inventory: item.inventory
      };

      details.push(detail);
    }
  });

  if (details.length > 0) {
    _.first(details).isChecked = "checked";
  }
  
  return details;
};

module.exports = mongoose.model('Item', ItemSchema);
