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
