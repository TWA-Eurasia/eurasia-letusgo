'use strict';

var Cart = require('../../model/cart');
var Item = require('../../model/item');
var CartItem = require('../../model/cartItem');

var _ = require('lodash');

exports.getCart = function(req, res) {
  var cartId = '551cc282a6b79c584b59bc0f';

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function (err, cart) {
      Item.populate(cart, 'cartItems.item', function (err) {
        if (err) {
          throw err;
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
};

exports.postCart = function(req, res) {
  var cartId = '551cc282a6b79c584b59bc0f';
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
            if (err) {console.log(err);}
            res.sendStatus(200);
          });

        } else {
          CartItem.create({item: id, number: number}, function (err, cartItem) {
            cart.cartItems.push(cartItem._id);

            cart.save(function (err, cart) {
              res.send(cart);
            });
          });
        }
      });
    });
};

