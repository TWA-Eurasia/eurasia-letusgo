var express = require('express');
var router = express.Router();

var _ = require('lodash');

var Item = require('../../model/item');
var Category = require('../../model/category');

router.get('/', function(req, res){

  Category.findById('551aa95e2ef086a169628b74')
  .populate('parent')
  .exec(function(err, category){

      Item.find({name: '男士短袖'})
      .populate('category')
      .exec(function (err, items) {

        var itemDetails = {
          item: items[0],
          category: category,
          details : getDetails(items)
        };

        res.render('itemDetails', {itemDetails: itemDetails});
      });
    });

    function getDetails (items) {
      var details = [];

      _.forEach(items, function(item){

        var detail = {
          price: item.price,
          specification : item.specification
        };
        details.push(detail);
      });

      return details;
    }

});

module.exports = router;
