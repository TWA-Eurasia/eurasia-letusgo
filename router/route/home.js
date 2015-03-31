var express = require('express');
var router = express.Router();

var _ = require('lodash');
var mongoose = require('mongoose');

var Category = require('../../model/category');

router.get('/', function (req, res) {

  Category.find()
    .populate('parent')
    .exec(function(err, categories){

      var mainCategories = [];

      _.forEach(categories, function(category){

        if(!category.parent){

          mainCategories.push(category);
        }
      });

      res.render('home', {mainCategories: mainCategories});
    });
});

module.exports = router;
