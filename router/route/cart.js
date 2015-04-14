var express = require('express');
var _ = require('lodash');
var router = express.Router();

var Cart = require('../../model/cart.js');
var Item = require('../../model/item.js');
var CartItem = require('../../model/cartItem.js');

router.get('/', function (req, res) {
  var cartId = "551cc282a6b79c584b59bc0f";

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function (err, cart) {
      Item.populate(cart, 'cartItems.item', function (err) {
        if (err) {
          throw err
        }

        _.map(cart.cartItems, function (cartItem) {
          cartItem.item.shortName = cartItem.item.name;

          if (cartItem.item.name.length > 8) {
            cartItem.item.shortName = cartItem.item.name.substring(0, 8) + '..';
          }
        });

        var total = cart.getTotal(cart.cartItems);
        res.render('cart', {cartItems: cart.cartItems, total: total});
      });
    });
});

router.post('/:id', function (req, res) {
  var cartId = "551cc282a6b79c584b59bc0f";
  var number = parseInt(req.body.number);
  var id = req.params.id;

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function (err, cart) {
      Item.populate(cart, 'cartItems.item', function (err) {
        if(err) {
          throw  err;
        }
        var result = _.find(cart.cartItems, function (cartItem) {
          return cartItem.item._id.toString() === id;
        });
        if (result) {
          number = result.number + number;
          CartItem.update({item: id}, {$set: {number: number}}, {upsert: true}, function (err) {
            if (err) console.log(err);
            res.sendStatus(200);
          });

        } else {
          CartItem.create({item: id, number: number}, function (err, cartItem) {
            cart.cartItems.push(cartItem._id);

            cart.save(function (err, cart) {
              res.send(cart);
            })
          });
        }

      })
    });
});
router.put('/:id', function (req, res, next) {

  var cartItemId = req.params.id;
  var num = req.body.number;
  var price = req.body.price;
  var total = req.body.total;

  CartItem.findById(cartItemId, function (err, cartItem) {
    var current = cartItem.number * price;
    CartItem.update({_id: cartItemId}, {$set: {number: num}}, {upsert: true}, function () {
      var subtotal = price * num;
      total = total - current + subtotal;
      res.send({subtotal: subtotal.toFixed(2), total: total.toFixed(2)});

    });
  });
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

    CartItem.remove({_id: cartItemId}, function () {

      cart.save(function (err, cart) {
        if (err) {
          throw err;
        }
        CartItem.find()
          .populate('item')
          .exec(function (err, cartItems) {

            res.send({cart: cart, total: cart.getTotal(cartItems)});
          });
      });
    });
  });
});

router.get('/:amount', function (req, res) {
  var cartId = "551cc282a6b79c584b59bc0f";

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function (err, cart) {
      var count = _.reduce(cart.cartItems, function (count, cartItem) {
        return cartItem.number + count;
      }, 0);

      res.send({amount: count});
    });
});

router.get('/cartItems/:id', function (req, res) {
  var id = req.params.id;

  CartItem.findById(id, function (err, cartItem) {
    if (err) {
      throw err
    }

    Item.findById(cartItem.item, function (err, item) {
      if (err) {
        throw err
      }
      res.send({inventory: item.inventory});
    });
  })
});

module.exports = router;
