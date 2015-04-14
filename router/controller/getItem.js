var Item = require('../../model/item');
var Category = require('../../model/category');

var getItem = function(req, res) {
  var id = req.params.id;

  Item.findById(id)
    .populate('category')
    .exec(function (err, item) {

      Category.findById(item.category._id)
        .populate('parent')
        .exec(function (err, category) {
          var itemDetails = {
            item: item,
            category: category
          };

          res.render('itemDetails', {
            itemDetails: itemDetails
          });

        });
    });
};

module.exports = getItem;
