var express = require('express');
var router = express.Router();

var Category = require('../../model/category.js');
var Subcategory = require('../../model/subcategory.js');

router.get('/', function (req, res) {

  Category.find()
    .populate('subCategories', 'name', null)
    .exec(function(err, categories) {
      res.render('home',{categories: categories});
    });

});

module.exports = router;
