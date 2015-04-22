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
  Item.remove({});
  CartItem.remove({}, function (err, cartItem) {
    if (err) {
      console.log(err);
    }
  });
  Cart.remove({});
  Category.remove({});
  Indent.remove({});
  User.remove({});

  Item.create(items);
  CartItem.create(cartItems);
  Cart.create(carts);
  Category.create(categories);
  Indent.create(indents);
  User.create(users);
};

module.exports = reloadDatabase;
