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
});

module.exports = router;
