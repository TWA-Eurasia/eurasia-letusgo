var express = require('express');
var router = express.Router();
var Indent = require('../../model/indent.js');
var Item = require('../../model/item.js');
var CartItem = require('../../model/cartItem.js');
var _ = require('lodash');

router.get('/', function (req, res, next) {
  Indent.find()
    .populate('cartItems')
    .exec(function (err, indent) {

      CartItem.find()
        .populate('item')
        .exec(function (err, cartItems) {

          //var total = 0;
          //var subtotals = [];
          //
          //_.forEach(cartItems, function(cartItem) {
          //  var subtotal = cartItem.item.price * cartItem.number;
          //  total += subtotal;
          //
          //  subtotals.push(subtotal);
          //});
          var cartItem = new CartItem();
          //console.log(cartItem.getSubtotal(cartItems[0]));

          console.log(Indent.getTotal(cartItems)+'----------------------------------------');
          res.render('indent', {cartItems: cartItems, CartItem: CartItem, Indent: Indent});

          //res.render('indent', {cartItems: cartItems, total: total, subtotals: subtotals});
        });
    });
});

router.post('/', function (req, res, next) {

  //Item.create({
  //  name: '可乐',
  //  unit: '瓶',
  //  price: 5,
  //  inventory: '100',
  //  image:'image/kele.jpg',
  //  description: 'kelekele',
  //  specification: '500ml',
  //  isRecommend: true
  //});
  //CartItem.create({
  //  item: "551b893c460915fb21fe0bf1",
  //  number: 15
  //});

  Indent.create({
    cartItems: ["551b8afa1c8deae8254a91b7",
      "551b8b8c1b1b373e2745798b"
    ],
    createDate: 2015 - 4 - 1
  }, function (err, indent) {
    if (err) {
      return next(err);
    }
    res.send(indent);
  });
});

module.exports = router;
