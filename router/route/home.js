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

  //var ids = ['551536534afbae0a0758a009', '5518b98ca9ecf82ef1c053c1'];
  //Category.createCatetory('商务女装', ids);

//  Category.updateCategory('5518b5d7d29fd70c6505a635','商务休闲男装/女装', ids);

  Category.find()
    .populate('subCategories', 'name', null)
    .exec(function (err, categories) {
      res.render('home', {categories: categories})

    })
});


