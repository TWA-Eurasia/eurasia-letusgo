var express = require('express');
var router = express.Router();

var Indent = require('../../model/indent.js');
var Item = require('../../model/item.js');
var CartItem = require('../../model/cartItem.js');
var User = require('../../model/user.js');
var _ = require('lodash');

router.get('/', function (req, res) {

  Indent.findById('551fd16975cd55ed0cfa5503')
    .populate('cartItems')
    .exec(function(err, indent){

      CartItem.find()
        .populate('item')
        .exec(function (err, cartItems){

          var total = indent.getTotal(cartItems);

          res.send({indent: indent, total: total});
        });
    });
});

//router.get('/', function (req, res, next) {
//
//  User.findById('551fd2a9ecb148410c4c8048')
//    .populate('indents')
//    .exec(function (err, user) {
//      res.send('user', {user: user});
//    });
//});

router.post('/', function (req, res, next) {

  Indent.create({
    cartItems: ['551cc20e47a654d14a280e9b', '551cc20e47a654d14a280e9c','551cc20e47a654d14a280e9d','551cc20e47a654d14a280e9e'
    ],
    createDate: 2015-4-1
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
