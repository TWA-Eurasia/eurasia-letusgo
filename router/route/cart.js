var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Cart = require('../../model/cart.js');
var Item = require('../../model/item.js');

router.get('/', function (req, res, next) {
  var itemId = req.id;
  //itemId = "dgadf";
  Cart.findById(itemId)
    .populate('cartItems.item')
    .exec(function (err, cart) {
      if (err) return next(err);

      _.forEach(cart.cartItems, function (cartItem) {
        cartItem.subtotal = cartItem.item.price * cartItem.number;
      });

      res.render('cart', {cartItems: cart.cartItems});
    })
});

router.post('/', function (req, res, next) {
  Item.create({name: '可乐', unit: '瓶', price: 3.5, imageUrl: 'image/kele.img'}, function (err, item) {

    var itemId = item._id;

    var cart = new Cart();
    cart.cartItems.push({item: itemId, number: 6});
    cart.cartItems.push({item: itemId, number: 7});
    cart.save(function (err, cart) {
      res.send(cart);
    })
  });
});
module.exports = router;
