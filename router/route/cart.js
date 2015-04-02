var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Cart = require('../../model/cart.js');
var Item = require('../../model/item.js');
var CartItem = require('../../model/cartItem.js');

router.get('/', function (req, res, next) {
  var cartId = req.id;

  cartId = "551cbacf4c7e65fb42a65f0f";
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
  //Item.create(
  //  {name: '可乐', unit: '瓶', price: 3.5, imageUrl: 'image/kele.jpg', inventory: '100'},
  //  {name: '雪碧', unit: '瓶', price: 4.5, imageUrl: 'image/xuebi.jpg', inventory: '100'},
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
  //
  //Cart.create({cartItems: ['551cb86c360ca53140292d77', '551cb86c360ca53140292d78', '551cb86c360ca53140292d79', '551cb86c360ca53140292d7a']});

});

router.delete('/:cartItemId', function (req, res) {
  var cartItemId = req.params.cartItemId;
  //var cartId = req.body.cartId;
  var cartId = '551cbacf4c7e65fb42a65f0f';

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
