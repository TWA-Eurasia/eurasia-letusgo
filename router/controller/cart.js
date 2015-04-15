'use strict';

var Cart = require('../../model/cart');
var Item = require('../../model/item');

var _ = require('lodash');

var getCart = function(req, res) {
  var cartId = '551cc282a6b79c584b59bc0f';

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function (err, cart) {
      Item.populate(cart, 'cartItems.item', function (err) {
        if (err) {
          throw err;
        }

        _.map(cart.cartItems, function (cartItem) {
          cartItem.item.shortName = cartItem.item.name;

          if (cartItem.item.name.length > 8) {
            cartItem.item.shortName = cartItem.item.name.substring(0, 8) + '..';
          }
        });

        var total = cart.getTotal(cart.cartItems);
        res.render('cart', {cartItems: cart.cartItems, total: total});
      });
    });
};



module.exports = getCart;
