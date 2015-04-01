var express = require('express');
var router = express.Router();
var Indent = require('../../model/indent.js');
var Item = require('../../model/item.js');
var _ = require('lodash');

router.get('/', function (req, res, next) {

  Indent.find()
    .populate('itemList.item')
    .exec(function (err, orderList) {
      var amount = 0;
      if (err) {return next(err);}
      var data = orderList[0].itemList;

      _.forEach(data, function (indent) {
        indent.subtotal = indent.item.price * indent.number;
        amount += indent.subtotal;
      });

      res.render('indent', {Indents: data,amount: amount});
    });
});

router.post('/', function (req, res) {
  //
  //Item.create({
  //  name: '可乐',
  //  unit: '瓶',
  //  price: 5,
  //  brand: '可口可乐',
  //  leftNumber: '100',
  //  imageUrl:'image/kele.jpg',
  //  description: 'kelekele',
  //  specification: '350ml'
  //
  //});

  Indent.create({
    itemList: [{item: "551abb584357be4b17ca39ea", number: 15},
                {item: "551abb584357be4b17ca39ea", number: 10}
               ]
  }, function (err, indent) {
      if (err) {return next(err);}
      res.send(indent);
  });
});

module.exports = router;
