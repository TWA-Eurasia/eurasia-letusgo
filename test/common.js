'use strict';


var express = require('express');

var request = require('supertest');
global.request = request;

var chai = require('chai');
global.expect = chai.expect;

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var sinon = require('sinon');
global.sinon = sinon;

var app = require('../app.js');
global.app = app;


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/letusgoTest', function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

var Item = require('../model/item');
global.Item = Item;
var CartItem = require('../model/cartItem');
global.CartItem = CartItem;
var Cart = require('../model/cart');
global.Cart = Cart;
var Category = require('../model/category');
global.Category = Category;
var Indent = require('../model/indent');
global.Indent = Indent;


var items = require('../seed/test/items');
global.items = items;
var cartItems = require('../seed/test/cartItems');
global.cartItems = cartItems;
var indents = require('../seed/test/indents');
global.indents = indents;
var categories = require('../seed/test/categories');
global.categories = categories;
var carts = require('../seed/test/carts');
global.carts = carts;


Item.create(items);
CartItem.create(cartItems);
Cart.create(carts);
Category.create(categories);
Indent.create(indents);

