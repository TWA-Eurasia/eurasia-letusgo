'use strict';

var _ = require('lodash');

var FormatUtil = require('../util/formatUtil');
var Cart = require('../model/cart');
var Item = require('../model/item');
var CartItem = require('../model/cartItem');

var NAME_LENGTH = 16;

function findCartById(cartId, callback) {

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function (err, cart) {

      Item.populate(cart, 'cartItems.item', function (err) {

        if (err) {
          throw err;
        }

        callback(cart);
      });
    });
}

var getCart = function (req, res) {
  var userId = req.session.currentUserId;

  Cart.findOne({user: userId})
    .exec()
    .then(function (cart) {

      if (cart === null) {
        Cart.create({user: userId});
      }
      
      return cart.id;
    })
    .then(function (cartId) {

      findCartById(cartId, function (cart) {

        _.forEach(cart.cartItems, function (cartItem) {
          cartItem.item.shortName = FormatUtil.parseString(cartItem.item.name, NAME_LENGTH);
        });

        var total = cart.getTotal(cart.cartItems);
        res.render('cart', {
          currentUserName: req.session.currentUserName,
          cartItems: cart.cartItems,
          total: total.toFixed(2)
        });
      });
    });
};


var addToCart = function (req, res) {

  var userId = req.session.currentUserId;
  var number = parseInt(req.body.number);
  var id = req.params.id;

  Cart.findOne({user: userId})
    .exec()
    .then(function (cart) {

      if (cart === null) {
        Cart.create({user: userId});
      }

      return cart.id;
    })
    .then(function (cartId) {

      findCartById(cartId, function (cart) {

        var result = _.find(cart.cartItems, function (cartItem) {
          return cartItem.item._id.toString() === id;
        });

        if (result) {

          number = parseInt(result.number) + number;

          CartItem.findOneAndUpdate({item: id}, {$set: {number: number}}, function () {
            res.sendStatus(200);
          });
        } else {

          var cartItem = new CartItem({item: id, number: number});

          cartItem.save(function () {

            cart.cartItems.push(cartItem.id);

            cart.save(function () {
              res.sendStatus(200);
            });
          });
        }
      });
    });
};

var changeCartItem = function (req, res) {
  var cartItemId = req.params.id;
  var number = req.body.number;
  var price = req.body.price;
  var total = req.body.total;

  CartItem.findById(cartItemId, function (err, cartItem) {
    var current = cartItem.number * price;
    CartItem.update({_id: cartItemId}, {$set: {number: number}}, {upsert: true}, function () {
      var subtotal = price * number;
      total = total - current + subtotal;
      res.send({subtotal: subtotal.toFixed(2), total: total.toFixed(2)});

    });
  });
};

var removeCartItem = function (req, res) {
  var cartItemId = req.params.cartItemId;
  var userId = req.session.currentUserId;

  Cart.findOne({user: userId})
    .exec()
    .then(function (cart) {

      if (cart === null) {
        Cart.create({user: userId});
      }

      return cart.id;
    })
    .then(function (cartId) {

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
};

var getAmount = function (req, res) {
  var userId = req.session.currentUserId;

  Cart.findOne({user: userId})
    .exec()
    .then(function (cart) {

      if (cart === null) {
        Cart.create({user: userId});
      }

      return cart.id;
    })
    .then(function (cartId) {
      Cart.findById(cartId)
        .populate('cartItems')
        .exec(function (err, cart) {
          var count = _.reduce(cart.cartItems, function (count, cartItem) {
            return cartItem.number + count;
          }, 0);

          res.send({amount: count});
        });
    });
};

var getInventory = function (req, res) {
  var id = req.params.id;

  CartItem.findById(id, function (err, cartItem) {
    if (err) {
      throw err;
    }

    Item.findById(cartItem.item, function (err, item) {
      if (err) {
        throw err;
      }
      res.send({inventory: item.inventory});
    });
  });
};

module.exports = {
  getCart: getCart,
  addToCart: addToCart,
  changeCartItem: changeCartItem,
  removeCartItem: removeCartItem,
  getAmount: getAmount,
  getInventory: getInventory
};
