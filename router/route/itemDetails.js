var express = require('express');
var router = express.Router();

var Item = require('../../model/item');
var Category = require('../../model/category');

router.get('/:id', function(req, res) {
  var id = req.params.id;

  Item.findById(id, function(err, item) {

    Item.find({
        name: item.name
      })
      .populate('category')
      .exec(function(err, items) {

        Category.findById(items[0].category._id)
          .populate('parent')
          .exec(function(err, category) {

            var itemDetails = {
              item: items[0],
              details: getDetails(items),
              category: category,
            };

            res.render('itemDetails', {
              itemDetails: itemDetails
            });
          });
      });

    function getDetails(items) {
      var details = [];

      items.forEach(function(item) {

        if (item.specification !== '') {
          var detail = {
            price: item.price,
            specification: item.specification
          };
          details.push(detail);
        }
      });

      return details;
    }
  });
});

module.exports = router;
