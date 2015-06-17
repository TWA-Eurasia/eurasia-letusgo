'use strict';

var _ = require('lodash');

var Category = require('../model/category');
var Item = require('../model/item');

var FormatUtil = require('../util/formatUtil');

var PAGE_SIZE = 8;
var NAME_LENGTH = 16;

function initItems(query, start, pageSize, callback) {

  Item.find(query).exec(function (err, items) {

    items.forEach(function (item) {

      item.shortName = FormatUtil.parseString(item.name, NAME_LENGTH);
    });

    var newItems = _.take(_.drop(items, start), pageSize);
    var pageCount = Math.ceil(items.length / pageSize);

    callback(newItems, pageCount);
  });
}

function getSubCategories(categories, mainCategories) {

  _.forEach(categories, function (category) {

    if (category.parent) {

      _.forEach(mainCategories, function (mainCategory) {

        if (category.parent.name === mainCategory.name) {
          mainCategory.subCategories.push(category);
        }
      });
    }
  });

  return mainCategories;
}

function rederIndexPage(req, res, mainCategories, currentCategory, items, pageCount, currentPage, isCategory) {

  var currentUserName = req.session.currentUserName ? req.session.currentUserName : '' ;
  res.render('index', {
    currentUserName: currentUserName,
    mainCategories: mainCategories,
    currentCategory: currentCategory,
    items: items,
    pageCount: pageCount,
    currentPage: currentPage,
    isCategory: isCategory
  });
}

function initCategories(req, res, query, start, pageSize, currentCategory, pageNumber, isCategory) {

  initItems(query, start, pageSize, function (items, pageCount) {

    Category.find()
      .populate('parent')
      .exec(function (err, categories) {
        var mainCategories = _.filter(categories, function (category) {

          category.subCategories = [];
          return category.parent === null;
        });
        mainCategories = getSubCategories(categories, mainCategories);

        rederIndexPage(req, res, mainCategories, currentCategory, items, pageCount, pageNumber, isCategory);
      });
  });
}

var getIndexInfo = function (req, res) {
  var currentCategory = {isDisplay: false, name: '', parent: {name: ''}};
  initCategories(req, res, {isRecommend: true}, 0, PAGE_SIZE, currentCategory, 1, false);
};

var getRecommendItemsByPageNumber = function (req, res) {

  var pageNumber = req.params.pageNumber;
  var start = (pageNumber - 1) * PAGE_SIZE;
  var currentCategory = {isDisplay: false, name: '', parent: {name: ''}};

  initCategories(req, res, {isRecommend: true}, start, PAGE_SIZE, currentCategory, pageNumber, false);
};

var getItemsByCategoryId = function (req, res) {

  var id = req.params.id;
  var currentCategory;

  Category.findById(id)
    .populate('parent')
    .exec(function (err, category) {

      currentCategory = category;
      currentCategory.isDisplay = true;

      initCategories(req, res, {category: id}, 0, PAGE_SIZE, currentCategory, 1, true);
    });
};

var getItemsByCategoryIdAndPageNumber = function (req, res) {

  var id = req.params.id;

  var pageNumber = req.params.pageNumber;
  var start = (pageNumber - 1) * PAGE_SIZE;

  var currentCategory;
  Category.findById(id)
    .populate('parent')
    .exec(function (err, category) {

      currentCategory = category;
      currentCategory.isDisplay = true;

      initCategories(req, res, {category: id}, start, PAGE_SIZE, currentCategory, pageNumber, true);
    });
};

module.exports = {

  getIndexInfo: getIndexInfo,
  getRecommendItemsByPageNumber: getRecommendItemsByPageNumber,
  getItemsByCategoryId: getItemsByCategoryId,
  getItemsByCategoryIdAndPageNumber: getItemsByCategoryIdAndPageNumber
};
