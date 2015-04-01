var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Cart = require('../../model/cart.js');
var Item = require('../../model/item.js');
var CartItem = require('../../model/cartItem.js');

router.get('/', function (req, res, next) {
  var cartId = req.id;
  cartId = "551b9f2c3553749b16d41002";
  //Cart.findById(cartId, function (err, carrr) {
  //  console.log(carrr);
  //})
  //  .populate('cartItems')
  //  .exec(function (err, cart) {
  //    if (err) {
  //      return next(err);
  //    }
  //    res.send(cart);

      //Item.populate(cart.cartItems, 'item', function (err, deepCart) {
      //  res.send(deepCart);
      //  console.log(cart);
      //});
      //_.forEach(cart.cartItems, function (cartItem) {
      //  cartItem.subtotal = cartItem.item.price * cartItem.number;
      //  cart.totalAmount += cartItem.subtotal;
      //});
      //res.render('cart', {cartItems: cart.cartItems, cart: cart});
  //  });

  Cart.findById(cartId, function (err, cart) {
    res.send(cart);
  })
});

router.post('/', function (req, res) {

  var cart = new Cart();
  cart.cartItems.push('551b9f00522d7e2116952002');
  cart.cartItems.push('551b9f190cd2657d16b2858b');

  cart.save(function (err, cart) {
    res.send(cart);
  })
});

router.post('/items', function (req, res) {
  Item.create(
    {name: '可乐', unit: '瓶', price: 3.5, image: 'image/kele.jpg'},
    {name: '雪碧', unit: '瓶', price: 3.5, image: 'image/xuebi.jpg'},
    function (err, item1, item2) {
      res.send({item1: item1, item2: item2})
    });
});

router.post('/cartItems', function (req, res) {
  CartItem.create({item: '551b9f00522d7e2116952001', number: 6}, {item: '551b9f00522d7e2116952002', number: 6}, function (err, cartItem1, cartItem2) {
    res.send({item1: cartItem1, item2: cartItem2})
  });
});


router.delete('/:cartItemId', function (req, res) {
  var cartItemId = req.params.cartItemId;
  //var cartId = req.body.cartId;
  var cartId = '551b9412d25033c47bd1ddb1';

  Cart.findById(cartId, function (err, cart) {
    if (err) {
      throw err;
    }
    cart.cartItems = _.remove(cart.cartItems, function (cartItem) {
      return cartItem._id.toString() !== cartItemId;
    });

    cart.save(function (err, cart) {
      if (err) {
        throw err;
      }
      res.send(cart);

    });
  });
});
module.exports = router;
