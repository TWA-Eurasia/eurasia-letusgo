var express = require('express');
var router = express.Router();

var Category = require('../../model/category.js');
var Subcategory = require('../../model/subcategory.js');


router.get('/', function (req, res, next) {

  //var ids = ['55190d34964677899617dcbf','55190d44964677899617dcc0','55190d68964677899617dcc1','55190d94964677899617dcc2'];
  //Category.createCategory('零食/进口食品/酒', ids);
  Category.find()
    .populate('subCategories', 'name', null)
    .exec(function(err, categories) {
      //console.log(categories);
      res.render('home',{categories: categories});
    });

});

module.exports = router;
