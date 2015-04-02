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
              details: Item.getDetails(items),
              category: category,
            };

            res.render('itemDetails', {
              itemDetails: itemDetails
            });
          });
      });
  });
});

module.exports = router;
