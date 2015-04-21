'use strict';

var express = require('express');
var router = express.Router();

var cartController = require('../../controller/cart');

router.get('/', cartController.getCart);
router.post('/:id', cartController.addToCart);
router.put('/:id', cartController.changeCartItem);
router.delete('/:cartItemId', cartController.removeCartItem);
router.get('/amount', cartController.getAmount);
router.get('/cartItems/:id', cartController.getInventory);
router.get('/next', function(req, res, next) {
  var err =  new Error('something broke!');
  next(err);
});
module.exports = router;
