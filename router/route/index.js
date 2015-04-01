var express = require('express');
var router = express.Router();
var Item = require('../../model/item');

var _ = require('lodash');
var mongoose = require('mongoose');

var Category = require('../../model/category');
var result =  {
  items: [],
  mainCategories: []
};

router.get('/', function(req, res) {


  Item.find().skip(0).limit(2).exec(function (err, items) {

    result.items = items;

    Category.find()
      .populate('parent')
      .exec(function(err, categories){

        var mainCategories = [];

        _.forEach(categories, function(category){

          if(!category.parent){

            mainCategories.push({name: category.name, subCategories: []});
          }

        });

        _.forEach(categories, function (category) {
          if(category.parent){

            _.forEach(mainCategories, function (mainCategory) {
              if(category.parent.name === mainCategory.name) {
                mainCategory.subCategories.push(category.name)
              }
            });
          }
        });
        result.mainCategories = mainCategories;
        console.log("controller result:" + result);
        res.render('index', {mainCategories: mainCategories, items: result.items});
      });
  });


  //var mainCategories = [];
  //
  //Category.find()
  //  .populate('parent')
  //  .exec(function (err, categories) {
  //
  //
  //    _.forEach(categories, function (category) {
  //
  //
  //      if (!category.parent) {
  //        var mainCategory = {name: category.name, subCategories: []};
  //
  //        Category.find({parent: category._id}, function (err, data) {
  //            if(err) return handleError(err);
  //
  //            if(data.length > 0){
  //              //console.log(data);
  //              mainCategory.subCategories = data;
  //            }
  //          });
  //        console.log(mainCategory);
  //        mainCategories.push(mainCategory);
  //      }
  //
  //    });
  //  });
  ////console.log(mainCategories);
  //
  //res.render('home', {mainCategories: mainCategories});
});

router.get('/index/:pageNumber', function(req, res) {

  var pageNumber = req.params.pageNumber;
  var pageSize = 2;
  var start = (pageNumber - 1) * pageSize;
  var pageCount;
  Item.find().exec(function(err, items) {
    pageCount = Math.ceil(items.length / pageSize);
  });
  Item.find().skip(start).limit(pageSize).exec(function (err, items) {
    res.render('index', {mainCategories: result.mainCategories, items: items, pageCount: pageCount, currentPage: pageNumber});
  });
});



router.post('/', function(req, res) {
  Item.create({name: '绿茶', unit: '瓶', price: 3.5, image: 'image/cat2.png', isRecommend: true}, function(err, item) {
    res.send(item);
  });
});

module.exports = router;
