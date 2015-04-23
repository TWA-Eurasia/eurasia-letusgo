'use strict';

var Item = require('../../model/item');
var CartItem = require('../../model/cartItem');
var Cart = require('../../model/cart');
var Category = require('../../model/category');
var Indent = require('../../model/indent');
var User = require('../../model/user');

var items = require('../../seed/test/items');
var cartItems = require('../../seed/test/cartItems');
var indents = require('../../seed/test/indents');
var categories = require('../../seed/test/categories');
var carts = require('../../seed/test/carts');
var users = require('../../seed/test/users');

var reloadDatabase = function () {
  Item.remove({}, function (err, item) {
    if (err) {
      console.log(err);
    }
  });
  CartItem.remove({}, function (err, cartItem) {
    if (err) {
      console.log(err);
    }
  });
  Cart.remove({}, function (err, cart) {
    if (err) {
      console.log(err);
    }
  });
  Category.remove({}, function (err, category) {
    if (err) {
      console.log(err);
    }
  });
  Indent.remove({}, function (err, ident) {
    if (err) {
      console.log(err);
    }
  });
  User.remove({}, function (err, user) {
    if (err) {
      console.log(err);
    }
  });

  Item.create(items, function (err, itemArray) {
    if (err) {
      console.log(err);
    }
  });
  CartItem.create(cartItems, function (err, cartItemArray) {
    if (err) {
      console.log(err);
    }
  });
  Cart.create(carts, function (err, cartArray) {
    if (err) {
      console.log(err);
    }
  });
  Category.create(categories, function (err, categoryArray) {
    if (err) {
      console.log(err);
    }
  });
  Indent.create(indents, function (err, indentArray) {
    if (err) {
      console.log(err);
    }
  });
  User.create(users, function (err, userArray) {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = reloadDatabase;
