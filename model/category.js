var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  subCategories: [{
    type: Schema.ObjectId,
    ref: 'SubCategory'
  }]
});


module.exports = mongoose.model('Category',CategorySchema);
