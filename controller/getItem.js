'use strict';
var Item = require('../model/item');
var Category = require('../model/category');

var getItem = function(req, res) {
  var id = req.params.id;

  Item.findById(id)
    .populate('category')
    .exec(function (err, item) {

      Category.populate(item, 'category.parent', function(err){

        if (err) {
          throw err;
        }

        var itemDetails = {
          item: item,
          category: item.category
        };

        res.render('itemDetails', {
          itemDetails: itemDetails
        });
      });
    });
};

module.exports = getItem;
