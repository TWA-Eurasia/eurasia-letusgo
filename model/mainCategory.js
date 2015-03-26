'use strict';
var _ = require('lodash');
var mongoose = require('mongoose');

var mainCategorySchema = new mongoose.Schema({
  name: String,
  childId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChildCategory'
  }]
});
var mainCategory = mongoose.model('MainCategory', mainCategorySchema);

module.exports = mainCategory;
