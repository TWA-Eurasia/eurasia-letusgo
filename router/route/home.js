var express = require('express');
var router = express.Router();
var Category = require('../../model/category.js');
var Subcategory = require('../../model/subcategory.js');


router.get('/', function (req, res, next) {


  //Category.findById('551531b73f0d54290638592b', function(err, categories){
  //
  //  console.log(categories);
  //  categories.subCategories[0] = '551536534afbae0a0758a009';
  //  categories.save();
  //  console.log(categories);
  //});
  
  Category.find(function (err, categories) {
    res.render('home',{categories: categories})
  });

});

module.exports = router;
