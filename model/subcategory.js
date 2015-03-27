var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubCategorySchema = new Schema({
  name: String,
  superCategory: {
    type: Schema.ObjectId,
    ref: 'Category'
  }
});


module.exports = mongoose.model('SubCategory',SubCategorySchema);
