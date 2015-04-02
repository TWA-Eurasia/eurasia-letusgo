var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Cart = require('../../model/cart.js');
var Item = require('../../model/item.js');
var CartItem = require('../../model/cartItem.js');

router.get('/', function (req, res) {
  var cartId = req.id;
  cartId = "551cc282a6b79c584b59bc0f";

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function (err, cart) {

      CartItem.find()
        .populate('item')
        .exec(function (err, cartItems) {

          var total = cart.getTotal(cartItems);
          res.render('cart', {cartItems: cartItems, total: total});
        });
    })
});

router.post('/:id', function (req, res, next) {

  var cartItemId = req.params.id;
  var num = req.body.number;
  var price = req.body.price;
  var total = req.body.total;

  CartItem.findById(cartItemId, function (err, cartItem) {
    var current = cartItem.number * price;
    CartItem.update({_id: cartItemId}, {$set: {number: num}}, {upsert: true}, function () {
      var subtotal = price * num;
      total = total - current + subtotal;
      res.send({subtotal: subtotal.toString(), total: total.toString()});

    });
  });

  //Item.create(
  //  {name: '可乐', unit: '瓶', price: 3.5, image: 'image/kele.jpg', inventory: '100'},
  //  {name: '雪碧', unit: '瓶', price: 4.5, image: 'image/xuebi.jpg', inventory: '100'},
  //  function (err, item1, item2) {
  //    var itemId1 = item1._id;
  //    var itemId2 = item2._id;
  //
  //    console.log(itemId1);
  //    CartItem.create(
  //      {item: itemId1, number: 6},
  //      {item: itemId2, number: 2},
  //      {item: itemId1, number: 8},
  //      {item: itemId2, number: 6}
  //    );
  //  }
  //);

  //Cart.create({cartItems: ['551cc20e47a654d14a280e9b', '551cc20e47a654d14a280e9c', '551cc20e47a654d14a280e9d', '551cc20e47a654d14a280e9e']});

});

router.delete('/:cartItemId', function (req, res) {
  var cartItemId = req.params.cartItemId;
  //var cartId = req.body.cartId;
  var cartId = '551cc282a6b79c584b59bc0f';

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
