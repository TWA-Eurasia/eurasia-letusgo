var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  subCategories: [{
    type: Schema.ObjectId,
    ref: 'SubCategory'
  }]
});

var Category = mongoose.model('Category', CategorySchema);

Category.createCategory = function (name, ids) {
  Category.create({name: name, subCategories: ids});
};

module.exports = Category;


