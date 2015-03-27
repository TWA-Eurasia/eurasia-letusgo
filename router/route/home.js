var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = require('../../model/category.js');


router.get('/', function (req, res, next) {

  Category.find(function (err, categories) {
    console.log(categories);
    res.render('home',{categories: categories})
  });


});

module.exports = router;
