var express = require('express');
var router = express.Router();

var _ = require('lodash');

var Category = require('../../model/category');
var Item = require('../../model/item');

router.get('/', function(req, res) {

  initCategories(function(mainCategories, items) {

    res.render('index', {mainCategories: mainCategories, items: items});
  });
});

function initItems (callback) {

  Item.find().skip(0).limit(2).exec(function (err, items) {

    callback(items);
  });
}

function initCategories (callback) {

  initItems(function (items) {

    Category.find()
      .populate('parent')
      .exec(function (err, categories) {

        var mainCategories = [];

        _.forEach(categories, function (category) {

          if (!category.parent) {

            mainCategories.push({id: category._id, name: category.name, subCategories: []});
          }
        });

        _.forEach(categories, function (category) {
          if (category.parent) {

            _.forEach(mainCategories, function (mainCategory) {

              if (category.parent.name === mainCategory.name) {

                mainCategory.subCategories.push(category)
              }
            });
          }
        });
        callback(mainCategories, items);
      });
  });
}

router.get('/index/:pageNumber', function(req, res) {

  var pageNumber = req.params.pageNumber;
  var pageSize = 2;
  var start = (pageNumber - 1) * pageSize;
  var pageCount;
  Item.find().exec(function(err, items) {
    pageCount = Math.ceil(items.length / pageSize);
  });
  Item.find().skip(start).limit(pageSize).exec(function (err, items) {
    res.render('index', {mainCategories: result.mainCategories, items: items, pageCount: 12, currentPage: pageNumber});
  });
});



router.post('/', function(req, res) {
  Item.create({name: '绿茶', unit: '瓶', price: 3.5, image: 'image/cat2.png', isRecommend: true}, function(err, item) {
    res.send(item);
  });
});

module.exports = router;
