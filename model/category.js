'use strict';
var _ = require('lodash');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  parent:{
    type: Schema.ObjectId,
    ref: 'Category'
  }
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;


