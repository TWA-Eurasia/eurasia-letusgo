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

          cartItems.forEach(function(cartItem) {
            if(cartItem.item.name.length > 8) {
              cartItem.item.shortName = cartItem.item.name.substring(0, 8) + '..';
            } else {
              cartItem.item.shortName = cartItem.item.name;
            }
          });

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
      res.send({subtotal: subtotal, total: total});

    });
  });

  //Item.create(
  //  {name: '可乐', unit: '瓶', price: 3.00, image: 'image/kele.jpg', inventory: '100'},
  //  {name: '雪碧', unit: '瓶', price: 3.00, image: 'image/xuebi.jpg', inventory: '100'},
  //  {name: 'Nestle雀巢(三合一)速溶咖啡180ml 罐装', unit: '罐', price: 4.50, image: 'image/coffee.png', inventory: '200'},
  //  {name: 'RIO(锐澳)鸡尾酒 青柠+朗姆 275ml', unit: '瓶', price: 14.50, image: 'image/rio.jpg', inventory:'300'},
  //  function (err, item1, item2, item3, item4) {
  //    var itemId1 = item1._id;
  //    var itemId2 = item2._id;
  //    var itemId3 = item3._id;
  //    var itemId4 = item4._id;
  //
  //    console.log(itemId1);
  //    CartItem.create(
  //      {item: itemId1, number: 6},
  //      {item: itemId2, number: 2},
  //      {item: itemId4, number: 8},
  //      {item: itemId3, number: 6},
  //      {item: itemId1, number: 14},
  //      {item: itemId2, number: 20},
  //      {item: itemId4, number: 1},
  //      {item: itemId3, number: 6}
  //    );
  //  }
  //);

  //Cart.create({cartItems: ['551fb01d668684584c5f3e50', '551fb01d668684584c5f3e51', '551fb01d668684584c5f3e52',
  //                         '551fb01d668684584c5f3e53', '551fb01d668684584c5f3e54', '551fb01d668684584c5f3e55',
  //                         '551fb01d668684584c5f3e56', '551fb01d668684584c5f3e57']});
});

router.delete('/:cartItemId', function (req, res) {
  var cartItemId = req.params.cartItemId;
  var cartId = '551cc282a6b79c584b59bc0f';

  Cart.findById(cartId, function (err, cart) {
    if (err) {
      throw err;
    }
    cart.cartItems = _.remove(cart.cartItems, function (cartItem) {
      return cartItem.toString() !== cartItemId;
    });

    CartItem.remove({_id: cartItemId}, function(){

      cart.save(function (err, cart) {
        if (err) {
          throw err;
        }
        res.send(cart);

      });
    });
  });
});

module.exports = router;
