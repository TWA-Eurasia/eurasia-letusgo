'use strict';

var _ = require('lodash');

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

var tasks = [{operate: Item, seed: {}},
  {operate: CartItem, seed: {}},
  {operate: Cart, seed: {}},
  {operate: Category, seed: {}},
  {operate: Indent, seed: {}},
  {operate: User, seed: {}}]

var createTasks = [
  {operate: Item, seed: items},
  {operate: CartItem, seed: cartItems},
  {operate: Cart, seed: carts},
  {operate: Category, seed: categories},
  {operate: Indent, seed: indents},
  {operate: User, seed: users}];

var reloadDatabase = function (done) {
  var taskLen = tasks.length;
  var createTaskLen = createTasks.length;

  tasks.forEach(function(task) {

    task.operate.remove(task.seed, function() {

      if(0 === --taskLen) {

        createTasks.forEach(function(task) {

          task.operate.create(task.seed, function() {

            if(0 === --createTaskLen) {
              done();
            }
          });
        });
      }
    });
  });
};

module.exports = reloadDatabase;
