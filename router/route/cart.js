var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Cart = require('../../model/cart.js');
var Item = require('../../model/item.js');

router.get('/', function (req, res, next) {
  var itemId = req.id;
  itemId = "551a42aa1cdb0f1f7beb7d90";
  Cart.findById(itemId)
    .populate('cartItems.item')
    .exec(function (err, cart) {
      if (err) {
        return next(err);
      }

      _.forEach(cart.cartItems, function (cartItem) {
        cartItem.subtotal = cartItem.item.price * cartItem.number;

      });
      res.render('cart', {cartItems: cart.cartItems});
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
      cart.cartItems.push({item: itemId1, number: 8});
      cart.save(function (err, cart) {
        res.send(cart);
      })
    });
});

router.delete('/:cartItemId', function (req, res) {
  var cartItemId = req.params.cartItemId;
  //var cartId = req.body.cartId;
  var cartId = '551a42aa1cdb0f1f7beb7d90';

  Cart.findById(cartId)
    .populate('cartItems.item')
    .exec(function (err, cart) {
      if (err) {
        throw err;
      }
      _.remove(cart.cartItems, function (cartItem) {
        return cartItem._id.toString() === cartItemId;
      });

      cart.save(function (err) {
        if(err){
          throw err;
        }

        res.send(cart);

      });
    });
});
module.exports = router;
