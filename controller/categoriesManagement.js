'use strict';

var _ = require('lodash');
var Category = require('../model/category');
var FormatUtil = require('../util/formatUtil');
var NAME_LENGTH = 16;

var getCategoriesManagementInfo = function (req, res, next) {

  Category.find({})
    .populate('parent')
    .exec()
    .then(function(categories){

      categories.forEach(function(category){

        category.shortName = FormatUtil.parseString(category.name, NAME_LENGTH);
      });

      var mainCategories = _.filter(categories, function (category) {

        return category.parent === null;
      });

      var subCategories = _.filter(categories, function(category) {
        return category.parent !== null;
      });


      res.render('categoriesManagement', {
        currentAdminName: req.session.currentAdminName,
        mainCategories: mainCategories,
        subCategories: subCategories
      });
    })
    .onReject(function(err) {
      next(err);
    });
};

var addCategoryInfo = function(req, res, next) {

  Category.find({})
    .populate('parent')
    .exec()
    .then(function(categories){

      categories.forEach(function(category){

        category.shortName = FormatUtil.parseString(category.name, NAME_LENGTH);
      });

      var mainCategories = _.filter(categories, function (category) {

        return category.parent === null;
      });

      res.render('addNewCategoryPage', {currentAdminName: req.session.currentAdminName, mainCategories: mainCategories});

    })
    .onReject(function(err) {
      next(err);
    });
};

var getCategoryById = function(req, res, next) {
  var currentId = req.params.id;
  Category.find({})
    .populate('parent')
    .exec()
    .then(function(categories){

      categories.forEach(function(category){

        category.shortName = FormatUtil.parseString(category.name, NAME_LENGTH);
      });

      var mainCategories = _.filter(categories, function (category) {

        return category.parent === null;
      });

      var currentCategory = _.find(categories, function(category) {
        return category._id.toString() === currentId;
      });

      if(currentCategory.parent === null) {
        currentCategory.parent = {
          _id: '55196b3e0042a1db62203a0a',
          name: '此为一级分类'
        };
      }
      res.render('categoryModifyPage', {
        currentAdminName: req.session.currentAdminName,
        category: currentCategory,
        mainCategories: mainCategories
      });
    })
    .onReject(function(err) {
      next(err);
    });
};

module.exports = {

  getCategoriesManagementInfo: getCategoriesManagementInfo,
  addCategoryInfo: addCategoryInfo,
  getCategoryById: getCategoryById
};
