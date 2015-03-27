var express = require('express');
var router = express.Router();

var Cart = require('../../model/cart.js');
var Item = require('../../model/item.js');

router.get('/', function (req, res, next) {
  Cart.find({}, function (err, cart) {
    if (err) return next(err);
    res.render('cart', {cartItems: cart.cartItems});
  });
});

router.post('/', function(req,res,next) {
  Item.create({name: '可乐', unit: 'ping', price: 3.5, imageUrl: '/image/kele.img'}, function (err, item) {

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
