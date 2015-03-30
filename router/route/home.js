var express = require('express');
var router = express.Router();
var Category = require('../../model/category.js');
var Subcategory = require('../../model/subCategory.js');


router.get('/', function (req, res, next) {

  //var ids = ['5517a250964677899617dcba','5517a25a964677899617dcbb'];
  //Category.createCategory('家居建材', ids);
  Category.find()
    .populate('subCategories', 'name', null)
    .exec(function(err, categories) {
      //console.log(categories);
      res.render('home',{categories: categories});
    });

});

module.exports = router;
