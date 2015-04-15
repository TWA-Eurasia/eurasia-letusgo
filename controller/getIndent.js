'use strict';

var Indent = require('../model/indent');
var Item = require('../model/item');

var getIndent = function (req, res) {

  Indent.findById('551fd16975cd55ed0cfa5503')
    .populate('cartItems')
    .exec(function (err, indent) {

      Item.populate(indent, 'cartItems.item', function(err){

        if (err) {
          throw err;
        }

        var total = indent.getTotal(indent.cartItems);
        res.send({indent: indent, total: total});
      });
    });
};

module.exports = getIndent;
