'use strict';

var Cart = require('../model/cart');
var Item = require('../model/item');
var CartItem = require('../model/cartItem');

var _ = require('lodash');

var NAME_LENGTH = 16;

function parseString(string, length) {

  var result = '';
  var stringLength = string.length;
  var charLength = string.replace(/[^\x00-\xff]/g,'**').length;

  if(charLength <= length){

    return string;
  }

  for(var i = 0, j = 0; i < stringLength; i++) {

    var char = string.charAt(i);
    if(/[\x00-\xff]/.test(char)) {

      j++;
    }else{

      j+=2;
    }

    if(j <= length) {

      result += char;
    } else {

      return result + '...';
    }
  }
}


function findCartById(cartId, done){

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function(err, cart) {

      Item.populate(cart, 'cartItems.item', function(err) {
        if(err) {

          throw err;
        }

        done(cart);
      });
    });
}

exports.getCart = function(req, res) {
  var cartId = '551cc282a6b79c584b59bc0f';

  findCartById(cartId, function(cart){

    _.map(cart.cartItems, function(cartItem) {

      cartItem.item.shortName = parseString(cartItem.item.name, NAME_LENGTH);
    });

    var total = cart.getTotal(cart.cartItems);
    res.render('cart', {cartItems: cart.cartItems, total: total});
  });
};

exports.postCart = function(req, res) {
  var cartId = '551cc282a6b79c584b59bc0f';
  var number = parseInt(req.body.number);
  var id = req.params.id;

  findCartById(cartId, function(cart){

    var result = _.find(cart.cartItems, function(cartItem) {
      return cartItem.item._id.toString() === id;
    });

    if(result) {
      number = result.number + number;
      CartItem.update({item: id}, {$set: {number: number}}, {upsert: true}, function(err) {
        if(err) {
          console.log(err);
        }
        res.sendStatus(200);
      });

    } else {
      CartItem.create({item: id, number: number}, function(err, cartItem) {
        cart.cartItems.push(cartItem._id);

        cart.save(function(err, cart) {
          res.send(cart);
        });
      });
    }
  });
};

exports.changeCartItem = function(req, res) {
  var cartItemId = req.params.id;
  var num = req.body.number;
  var price = req.body.price;
  var total = req.body.total;

  CartItem.findById(cartItemId, function(err, cartItem) {
    var current = cartItem.number * price;
    CartItem.update({_id: cartItemId}, {$set: {number: num}}, {upsert: true}, function() {
      var subtotal = price * num;
      total = total - current + subtotal;
      res.send({subtotal: subtotal.toFixed(2), total: total.toFixed(2)});

    });
  });
};

exports.removeCartItem = function(req, res) {
  var cartItemId = req.params.cartItemId;
  var cartId = '551cc282a6b79c584b59bc0f';

  Cart.findById(cartId, function(err, cart) {
    if(err) {
      throw err;
    }
    cart.cartItems = _.remove(cart.cartItems, function(cartItem) {
      return cartItem.toString() !== cartItemId;
    });

    CartItem.remove({_id: cartItemId}, function() {

      cart.save(function(err, cart) {
        if(err) {
          throw err;
        }
        CartItem.find()
          .populate('item')
          .exec(function(err, cartItems) {

            res.send({cart: cart, total: cart.getTotal(cartItems)});
          });
      });
    });
  });
};

exports.getAmount = function(req, res) {
  var cartId = '551cc282a6b79c584b59bc0f';

  Cart.findById(cartId)
    .populate('cartItems')
    .exec(function(err, cart) {
      var count = _.reduce(cart.cartItems, function(count, cartItem) {
        return cartItem.number + count;
      }, 0);

      res.send({amount: count});
    });
};

exports.getInventory = function(req, res) {
  var id = req.params.id;

  CartItem.findById(id, function(err, cartItem) {
    if(err) {
      throw err;
    }

    Item.findById(cartItem.item, function(err, item) {
      if(err) {
        throw err;
      }
      res.send({inventory: item.inventory});
    });
  });
};
