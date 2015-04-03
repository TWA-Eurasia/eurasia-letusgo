var express = require('express');
var router = express.Router();

var _ = require('lodash');

var Category = require('../../model/category');
var Item = require('../../model/item');

router.get('/', function(req, res) {


  initCategories({isRecommend: true}, 0, 2, function(mainCategories, items, pageCount) {

    res.render('index', {mainCategories: mainCategories, items: items, pageCount: pageCount, currentPage: 1});
  });
});

router.get('/index/:pageNumber', function(req, res) {

  var pageNumber = req.params.pageNumber;
  var pageSize = 2;
  var start = (pageNumber - 1) * pageSize;

  initCategories({isRecommend: true}, start, pageSize, function(mainCategories, items, pageCount) {

    res.render('index', {mainCategories: mainCategories, items: items, pageCount: pageCount, currentPage: pageNumber});
  });

});

router.get('/categoryView/:id', function(req, res) {

  var id = req.params.id;

  initCategories({category: id}, 0, 2, function(mainCategories, items, pageCount) {

    res.render('index', {mainCategories: mainCategories, items: items, pageCount: pageCount, currentPage: 1});
  });

});


router.post('/', function(req, res) {

  Item.create({
    name: '雪纺衫',
    unit: '件',
    price: 199,
    image: 'image/georgette.jpg',
    description: '这是件雪纺衫',
    inventory: 100,
    category: '5519881c0042a1db62223b09',
    specification: 'S',
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
