var express = require('express');
var router = express.Router();

var Item = require('../../model/item');
var Category = require('../../model/category');

router.get('/', function(req, res){

  Category.findById('551aa95e2ef086a169628b74')
  .populate('parent')
  .exec(function(err, category){

      Item.findById('551aac132ef086a169628b75')
      .populate('category')
      .exec(function (err, item) {

        var itemDetails = {
          item: item,
          category: category
        };
        console.log(itemDetails);
        res.render('itemDetails', {itemDetails: itemDetails});
      });
    });

  // res.render('itemDetails');
});

module.exports = router;
