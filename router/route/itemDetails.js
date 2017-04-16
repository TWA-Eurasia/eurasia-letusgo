var express = require('express');
var router = express.Router();

var _ = require('lodash');

var Item = require('../../model/item');
var Category = require('../../model/category');

router.get('/:id/:name', function(req, res){

  var id = req.params.id;
  var name = req.params.name;
  var aa = '551aa95e2ef086a169628b74';

  Category.findById(id)
  .populate('parent')
  .exec(function(err, category){

      Item.find({name: name})
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

        if(item.specification !== '') {
          
          var detail = {
            price: item.price,
            specification : item.specification
          };
          details.push(detail);
        }
      });

      return details;
    }

});

module.exports = router;
