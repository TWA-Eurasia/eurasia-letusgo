var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Cart = require('../../model/cart.js');
var Item = require('../../model/item.js');

router.get('/', function (req, res, next) {
  var cartId = req.id;
  cartId = "551abc6a1f47599826402314";
  Cart.findById(cartId)
    .populate('cartItems.item')
    .exec(function (err, cart) {
      if (err) {
        return next(err);
      }
      //console.log(cart);
      _.forEach(cart.cartItems, function (cartItem) {
        cartItem.subtotal = cartItem.item.price * cartItem.number;
        cart.totalAmount += cartItem.subtotal;
      });
      res.render('cart', {cartItems: cart.cartItems, cart: cart});
    })
});

router.post('/', function (req, res, next) {
  Item.create(
    {name: '可乐', unit: '瓶', price: 3.5, imageUrl: 'image/kele.jpg'},
    {name: '雪碧', unit: '瓶', price: 3.5, imageUrl: 'image/xuebi.jpg'},
    function (err, item1, item2) {

      var itemId1 = item1._id;
      var itemId2 = item2._id;


      var cart = new Cart();
      cart.cartItems.push({item: itemId1, number: 6});
      cart.cartItems.push({item: itemId2, number: 7});
      cart.save(function (err, cart) {
        res.send(cart);
      })
    });
});

router.delete('/:cartItemId', function (req, res) {
  var cartItemId = req.params.cartItemId;
  //var cartId = req.body.cartId;
  var cartId = '551abc6a1f47599826402314';

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
