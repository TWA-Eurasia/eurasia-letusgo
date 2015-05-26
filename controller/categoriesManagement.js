'use strict';

var _ = require('lodash');
var Category = require('../model/category');
var FormatUtil = require('../util/formatUtil');
var NAME_LENGTH = 16;
var PAGE_SIZE = 10;

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

var getSubCategoriesByPageNumber = function(res, req, next) {

  var pageNumber = req.params.pageNumber;
  console.log(pageNumber);
  var start = (pageNumber - 1) * PAGE_SIZE;
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

      var newSubCategories = _.take(_.drop(subCategories, start), PAGE_SIZE);
      var pageCount = Math.ceil(subCategories.length / 10);

      res.render('categoriesManagement', {
        mainCategories: mainCategories,
        pageCount: pageCount,
        subCategories: newSubCategories,
        currentPage: pageNumber
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

      res.render('addNewCategoryPage', {mainCategories: mainCategories});

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

      var currentCategory = _.filter(categories, function(category) {
        return category._id === currentId;
      });

      res.render('categoriesManagement', {
        mainCategories: mainCategories,
        category: currentCategory
      });
    })
    .onReject(function(err) {
      next(err);
    });
};

module.exports = {

  getCategoriesManagementInfo: getCategoriesManagementInfo,
  getSubCategoriesByPageNumber: getSubCategoriesByPageNumber,
  addCategoryInfo: addCategoryInfo,
  getCategoryById: getCategoryById
};
