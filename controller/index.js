'use strict';

var _ = require('lodash');

var Category = require('../model/category');
var Item = require('../model/item');

var PAGE_SIZE = 8;
var NAME_LENGTH = 16;

function parseString(name, length) {

  var result = '';
  var nameLength = name.length;
  var charLength = name.replace(/[^\x00-\xff]/g, '**').length;

  if(charLength <= length) {

    return name;
  }

  for(var i = 0, j = 0; i < nameLength; i++) {

    var char = name.charAt(i);
    j += (/[\x00-\xff]/.test(char) ? 1 : 2);

    if(j <= length) {
      result += char;
    } else {
      return result + '...';
    }
  }
}

function initItems(query, start, pageSize, callback) {

  Item.find(query).exec(function(err, items) {

    items.forEach(function(item) {

      item.shortName = parseString(item.name, NAME_LENGTH);
    });

    var newItems = _.take(_.drop(items, start), pageSize);
    var pageCount = Math.ceil(items.length / pageSize);

    callback(newItems, pageCount);
  });
}

function getSubCategories(categories, mainCategories){

  _.forEach(categories, function(category) {

    if (category.parent) {

      _.forEach(mainCategories, function(mainCategory) {

        if (category.parent.name === mainCategory.name) {

          mainCategory.subCategories.push(category);
        }
      });
    }
  });

  return mainCategories;
}

function initCategories(query, start, pageSize, callback) {

  initItems(query, start, pageSize, function(items, pageCount) {

    Category.find()
      .populate('parent')
      .exec(function(err, categories) {

        var mainCategories = _.filter(categories, function(category) {

          category.subCategories = [];
          return category.parent === null;
        });

        mainCategories = getSubCategories(categories, mainCategories);

        callback(mainCategories, items, pageCount);
      });
  });
}

function rederIndex(res, mainCategories, currentCategory, items, pageCount, currentPage, isCategory){

  res.render('index', {
    mainCategories: mainCategories,
    currentCategory: currentCategory,
    items: items,
    pageCount: pageCount,
    currentPage: currentPage,
    isCategory: isCategory
  });
}

var getIndexInfo = function(req, res) {

  var currentCategory = {isDisplay: false, name: '', parent: {name: ''}};

  initCategories({isRecommend: true}, 0, PAGE_SIZE, function(mainCategories, items, pageCount) {

    rederIndex(res, mainCategories, currentCategory, items, pageCount, 1, false);
  });
};

var getRecommendItemsByPageNumber = function(req, res) {

  var pageNumber = req.params.pageNumber;
  var start = (pageNumber - 1) * PAGE_SIZE;

  var currentCategory = {isDisplay: false, name: '', parent: {name: ''}};

  initCategories({isRecommend: true}, start, PAGE_SIZE, function(mainCategories, items, pageCount) {

    rederIndex(res, mainCategories, currentCategory, items, pageCount, pageNumber, false);
  });
};

var getItemsByCategoryId = function(req, res) {

  var id = req.params.id;
  var currentCategory;

  Category.findById(id)
    .populate('parent')
    .exec(function (err, category) {

      currentCategory = category;
      currentCategory.isDisplay = true;
    });

  initCategories({category: id}, 0, PAGE_SIZE, function(mainCategories, items, pageCount) {

    rederIndex(res, mainCategories, currentCategory, items, pageCount, 1, true);
  });
};

var getItemsByCategoryIdAndPageNumber = function(req, res) {

  var id = req.params.id;

  var pageNumber = req.params.pageNumber;
  var start = (pageNumber - 1) * PAGE_SIZE;

  var currentCategory;
  Category.findById(id)
    .populate('parent')
    .exec(function (err, category) {

      currentCategory = category;
      currentCategory.isDisplay = true;
    });

  initCategories({category: id}, start, PAGE_SIZE, function(mainCategories, items, pageCount) {

    rederIndex(res, mainCategories, currentCategory, items, pageCount, pageNumber, true);
  });
};

module.exports = {

  getIndexInfo: getIndexInfo,
  getRecommendItemsByPageNumber: getRecommendItemsByPageNumber,
  getItemsByCategoryId: getItemsByCategoryId,
  getItemsByCategoryIdAndPageNumber: getItemsByCategoryIdAndPageNumber
};
