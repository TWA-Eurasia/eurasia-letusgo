var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  subCategories: [{
    type: Schema.ObjectId,
    ref: 'Category'
  }],

  parentCategory: {
    type: Schema.ObjectId,
    ref: 'Category'
  }
});


module.exports = mongoose.model('Category', CategorySchema);
