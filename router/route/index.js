'use strict';

var express = require('express');
var router = express.Router();

var _ = require('lodash');

var Category = require('../../model/category');
var Item = require('../../model/item');

var PAGE_SIZE = 8;
var NAME_LENGTH = 16;

function parseName(str, L) {

  var result = '';
  var strlen = str.length;
  var chrlen = str.replace(/[^\x00-\xff]/g,'**').length;

  if(chrlen<=L){return str;}

  for(var i=0,j=0;i<strlen;i++) {

    var chr = str.charAt(i);
    if(/[\x00-\xff]/.test(chr)) {

      j++;
    }else{

      j+=2;
    }

    if(j<=L) {

      result += chr;
    } else {

      return result + '...';
    }
  }
}

function initItems(query, start, pageSize, callback) {

  Item.find(query).exec(function(err, items) {

    items.forEach(function(item) {

      item.shortName = parseName(item.name, NAME_LENGTH);
    });

    var newItems = _.take(_.drop(items, start), pageSize);
    var pageCount = Math.ceil(items.length / pageSize);

    callback(newItems, pageCount);
  });
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

        _.forEach(categories, function(category) {

          if (category.parent) {

            _.forEach(mainCategories, function(mainCategory) {

              if (category.parent.name === mainCategory.name) {

                mainCategory.subCategories.push(category);
              }
            });
          }
        });

        callback(mainCategories, items, pageCount);
      });
  });
}

router.get('/', function(req, res) {

  var currentCategory = {isDisplay: false, name: '', parent: {name: ''}};

  initCategories({isRecommend: true}, 0, PAGE_SIZE, function(mainCategories, items, pageCount) {

    res.render('index', {
      mainCategories: mainCategories,
      currentCategory: currentCategory,
      items: items,
      pageCount: pageCount,
      currentPage: 1,
      isCategory: false
    });
  });
});

router.get('/index/:pageNumber', function(req, res) {

  var pageNumber = req.params.pageNumber;
  var start = (pageNumber - 1) * PAGE_SIZE;

  var currentCategory = {isDisplay: false, name: '', parent: {name: ''}};

  initCategories({isRecommend: true}, start, PAGE_SIZE, function(mainCategories, items, pageCount) {

    res.render('index', {
      mainCategories: mainCategories,
      currentCategory: currentCategory,
      items: items,
      pageCount: pageCount,
      currentPage: pageNumber,
      isCategory: false
    });
  });

});

router.get('/categories/:id', function(req, res) {

  var id = req.params.id;
  var currentCategory;

  Category.findById(id)
    .populate('parent')
    .exec(function (err, category) {

      currentCategory = category;
      currentCategory.isDisplay = true;
    });

  initCategories({category: id}, 0, PAGE_SIZE, function(mainCategories, items, pageCount) {

    res.render('index', {
      mainCategories: mainCategories,
      currentCategory: currentCategory,
      items: items,
      pageCount: pageCount,
      currentPage: 1,
      isCategory: true
    });
  });

});

router.get('/categories/:id/:pageNumber', function(req, res) {

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

    res.render('index', {
      mainCategories: mainCategories,
      currentCategory: currentCategory,
      items: items,
      pageCount: pageCount,
      currentPage: pageNumber,
      isCategory: true
    });
  });
});


module.exports = router;
