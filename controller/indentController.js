'use strict';

var Indent = require('../model/indent');
var Item = require('../model/item');
var CartItem = require('../model/cartItem');

var getIndent = function (req, res) {

  //Indent.findById('551fd16975cd55ed0cfa5503')
  //  .populate('cartItems')
  //  .exec(function (err, indent) {
  //  console.log(indent);
  //    Item.populate(indent, 'cartItems.item', function (err) {
  //
  //      if (err) {
  //        throw err;
  //      }
  //
  //      var total = indent.getTotal(indent.cartItems);
  //      res.send({indent: indent, total: total});
  //    });
  //  });

  Indent.findById('551fd16975cd55ed0cfa5503', function (err, indent) {
    CartItem.populate(indent, 'cartItems', function (err, result) {
      res.send(result);
    });
  });
};

module.exports = {
  getIndent: getIndent
};
