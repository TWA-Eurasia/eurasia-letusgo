'use strict';

var express = require('express');
var router = express.Router();
var Indent = require('../../model/indent.js');
var Item = require('../../model/item.js');
var FormatUtil = require('../../util/formatUtil.js');

var NAME_LENGTH = 16;

function getShortedCartItemName(cartItems) {

  var shortedCartItemName = '';

  cartItems.forEach(function (cartItem) {
    if (cartItem.number > cartItem.item.inventory) {
      shortedCartItemName += cartItem.item.name + '、';
    }
  });

  return shortedCartItemName.substring(0, shortedCartItemName.length - 1);
}

router.get('/', function (req, res) {

  Indent.findById('551fd16975cd55ed0cfa5503')
    .populate('cartItems')
    .exec(function (err, indent) {
      console.log(indent.cartItems);

      Item.populate(indent, 'cartItems.item', function (err) {
        if (err) {
          throw err;
        }
        indent.cartItems.forEach(function (cartItem) {
          cartItem.item.shortName = FormatUtil.parseString(cartItem.item.name, NAME_LENGTH);
        });

        var total = indent.getTotal(indent.cartItems);
        var shortedCartItemName = getShortedCartItemName(indent.cartItems);

        res.render('indent', {
          currentUserName: req.session.currentUserName,
          cartItems: indent.cartItems,
          total: total,
          indent: indent,
          shortedCartItemName: shortedCartItemName
        });
      });
    });
});

module.exports = router;
