'use strict';
var Item = require('../model/item');
var Category = require('../model/category');

var getItemDetails = function (req, res, next) {

  var id = req.params.id;

  Item.findById(id)
    .populate('category')
    .exec()
    .then(function(item) {

      return Category.populate(item, 'category.parent');
    })
    .then(function(item) {

      var itemDetails = {
        item: item,
        category: item.category
      };

      res.render('itemDetails', {
        currentUserName: req.session.currentUserName,
        itemDetails: itemDetails
      });
    })
    .onReject(function(err) {

      next(err);
    });
};

module.exports = {
  getItemDetails: getItemDetails
};
