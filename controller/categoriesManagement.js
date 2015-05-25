'use strict';

var _ = require('lodash');
var Category = require('../model/category');
var FormatUtil = require('../util/formatUtil');
var NAME_LENGTH = 16;

function initItems(start, pageSize, callback) {

  Item.find().exec(function (err, items) {

    items.forEach(function (item) {

      item.shortName = FormatUtil.parseString(item.name, NAME_LENGTH);
    });

    var newItems = _.take(_.drop(items, start), pageSize);
    var pageCount = Math.ceil(items.length / pageSize);

    callback(newItems, pageCount);
  });
}

var getCategoriesManagementInfo = function (req, res, next) {

  Category.find({})
    .populate('parent')
    .exec()
    .then(function(categories){

      categories.forEach(function(categories){

        categories.shortName = FormatUtil.parseString(categories.name, NAME_LENGTH);
      });

      var mainCategories = _.filter(categories, function (category) {

        return category.parent === null;
      });

      var subCategories = _.filter(categories, function(category) {
        return category.parent !== null;
      });

      var newSubCategories = _.take(_.drop(subCategories, 0), 10);
      var pageCount = Math.ceil(subCategories.length / 10);

      res.render('categoriesManagement', {
        mainCategories: mainCategories,
        pageCount: pageCount,
        subCategories: newSubCategories,
        currentPage: 1
      });
    })
    .onReject(function(err) {
      next(err);
    });
};

var addNewMainCategoryInfo = function(req, res) {

  res.render('addNewMainCategoryPage');
};

var addNewSubCategoryInfo = function(req, res) {

  res.render('addNewMainCategoryPage');
};

module.exports = {

  getCategoriesManagementInfo: getCategoriesManagementInfo,
  addNewMainCategoryInfo: addNewMainCategoryInfo,
  addNewSubCategoryInfo: addNewSubCategoryInfo
};
