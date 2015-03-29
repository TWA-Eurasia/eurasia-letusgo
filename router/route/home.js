var express = require('express');
var router = express.Router();
var Category = require('../../model/category.js');
var Subcategory = require('../../model/subCategory.js');


router.get('/', function (req, res, next) {


  //Category.findById('551531b73f0d54290638592b', function(err, categories){
  //
  //  console.log(categories);
  //  categories.subCategories[0] = '551536534afbae0a0758a009';
  //  categories.save();
  //  console.log(categories);
  //});

  Category.findById('5517724c40bcab200a6c53a5', function(err, data) {
    console.log(data.subCategories[0].name);
  });
  Category.find(function (err, categories) {
    console.log(categories);
    res.render('home',{categories: categories})
  });
  //
  //Category.find()
  //  .populate('subCategories', 'name superCategory', null)
  //  .exec(function(err, cartItems) {
  //    res.render('cart',{cartItems:cartItems});
  //  });

});

module.exports = router;
