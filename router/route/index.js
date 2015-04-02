var express = require('express');
var router = express.Router();

var _ = require('lodash');

var Category = require('../../model/category');
var Item = require('../../model/item');

router.get('/', function(req, res) {

  var pageSize = 2;

  initCategories({isRecommend: true}, 0, pageSize, function(mainCategories, items, pageCount) {

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

router.post('/', function(req, res) {

  Item.create({
    name: '韩版蕾丝衫',
    unit: '件',
    price: 209,
    image: 'image/hahh.jpg',
    description: '这是件韩版蕾丝衫',
    inventory: 100,
    category: '5519881c0042a1db62223b0a',
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
