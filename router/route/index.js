var express = require('express');
var router = express.Router();

var _ = require('lodash');

var Category = require('../../model/category');
var Item = require('../../model/item');

router.get('/', function(req, res) {


  initCategories({isRecommend: true}, 0, 2, function(mainCategories, items, pageCount) {

    res.render('index', {mainCategories: mainCategories, items: items, pageCount: pageCount, currentPage: 1, isCategory: false});
  });
});

router.get('/index/:pageNumber', function(req, res) {

  var pageNumber = req.params.pageNumber;
  var pageSize = 2;
  var start = (pageNumber - 1) * pageSize;

  initCategories({isRecommend: true}, start, pageSize, function(mainCategories, items, pageCount) {

    res.render('index', {mainCategories: mainCategories, items: items, pageCount: pageCount, currentPage: pageNumber, isCategory: false});
  });

});

router.get('/subCategoryView/:id', function(req, res) {

  var id = req.params.id;

  initCategories({category: id}, 0, 2, function(mainCategories, items, pageCount) {

    res.render('index', {mainCategories: mainCategories, items: items, pageCount: pageCount, currentPage: 1, isCategory: true});
  });

});

router.get('/subCategoryView/:id/:pageNumber', function (req, res) {

  var id = req.params.id;
  var pageNumber = req.params.pageNumber;

  var pageSize = 2;
  var start = (pageNumber - 1) * pageSize;

  initCategories({category: id}, start, pageSize, function(mainCategories, items, pageCount) {

    res.render('index', {mainCategories: mainCategories, items: items, pageCount: pageCount, currentPage: pageNumber, isCategory: true});
  });

});


router.post('/', function(req, res) {

  Item.create({
    name: '针织衫',
    unit: '件',
    image: 'image/hahh.jpg',
    description: '这是件针织衫',
    category: '5519881c0042a1db62223b0b',
    specification: [
      {name: 'S', price: 199, inventory: 90},
      {name: 'M', price: 199, inventory: 90},
      {name: 'L', price: 199, inventory: 90}
    ],
    isRecommend: true}, function(err, item) {

      res.send(item);
  });
});

function initItems (query, start, pageSize, callback) {

  Item.find(query).exec(function (err, items) {

    var newItems = _.take(_.drop(items, start), pageSize);
    var pageCount = Math.ceil(items.length / pageSize);

    callback(newItems, pageCount);
  });
}

function initCategories (query, start, pageSize, callback) {

  initItems(query, start, pageSize, function (items, pageCount) {

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

                mainCategory.subCategories.push(category);
              }
            });
          }
        });
        callback(mainCategories, items, pageCount);
      });
  });
}


module.exports = router;
