var express = require('express');
var router = express.Router();

var _ = require('lodash');
var mongoose = require('mongoose');

var Category = require('../../model/category');
var Item = require('../../model/item');

router.get('/', function (req, res) {

  Category.find()
    .populate('parent')
    .exec(function(err, categories){

      var mainCategories = [];

      _.forEach(categories, function(category){

        if(!category.parent){

          mainCategories.push({_id: category._id, name: category.name, subCategories: []});
        }

      });

      _.forEach(categories, function (category) {
        if(category.parent){

          _.forEach(mainCategories, function (mainCategory) {
            if(category.parent.name === mainCategory.name) {
              mainCategory.subCategories.push(category)
            }
          });
        }
      });

    res.render('home', {mainCategories: mainCategories});
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

module.exports = router;
