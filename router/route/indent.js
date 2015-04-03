var express = require('express');
var router = express.Router();
var Indent = require('../../model/indent.js');
var Item = require('../../model/item.js');
var CartItem = require('../../model/cartItem.js');
var _ = require('lodash');

router.get('/', function (req, res, next) {

  Indent.findById('551cbc22ff9c98ae4e3d38fc')
    .populate('cartItems')
    .exec(function (err, indent) {

      CartItem.find()
        .populate('item')
        .exec(function (err, cartItems) {

          var total = indent.getTotal(cartItems);
          //res.render('indent', {cartItems: cartItems, total: total});
          res.render('indent', {cartItems: cartItems, total: total, indent: indent});
        });
    });
});

router.post('/', function (req, res, next) {

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

router.post('/:id', function(req, res){
  var id = req.params.id;

  Indent.update(id, {$set: {isPaid: true}}, function(err, indent){

    res.send('isPaid is true');
  });
});

module.exports = router;
