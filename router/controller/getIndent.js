'use strict';

var Indent = require('../../model/indent');
var CartItem = require('../../model/cartItem');

var getIndent = function (req, res) {

  Indent.findById('551fd16975cd55ed0cfa5503')
    .populate('cartItems')
    .exec(function (err, indent) {

      CartItem.find()
        .populate('item')
        .exec(function (err, cartItems) {

          var total = indent.getTotal(cartItems);
          res.send({indent: indent, total: total});
        });
    });
};

module.exports = getIndent;
