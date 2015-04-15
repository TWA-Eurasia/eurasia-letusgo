'use strict';

var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Cart = require('../../model/cart.js');
var Item = require('../../model/item.js');
var CartItem = require('../../model/cartItem.js');

var cartController = require('../controller/cart');

router.get('/', cartController.getCart);
router.post('/', cartController.postCart);
router.put('/:id', cartController.changeCartItem);
router.delete('/:cartItemId', cartController.removeCartItem);

router.get('/:amount', function (req, res) {
  var cartId = '551cc282a6b79c584b59bc0f';

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function (err, cart) {
      var count = _.reduce(cart.cartItems, function (count, cartItem) {
        return cartItem.number + count;
      }, 0);

      res.send({amount: count});
    });
});

router.get('/cartItems/:id', function (req, res) {
  var id = req.params.id;

  CartItem.findById(id, function (err, cartItem) {
    if (err) {
      throw err;
    }

    Item.findById(cartItem.item, function (err, item) {
      if (err) {
        throw err;
      }
      res.send({inventory: item.inventory});
    });
  });
});

module.exports = router;
