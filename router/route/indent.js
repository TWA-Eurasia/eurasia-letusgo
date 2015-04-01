var express = require('express');
var router = express.Router();
var Indent = require('../../model/indent.js');
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

router.post('/', function (req, res, next) {

  Indent.create({
    itemList: [{item: "551901cbf6ea4cd89e88c24c", number: 15},
      {item: "551901cbf6ea4cd89e88c24c", number: 10}
    ],
    date: 2012 - 3 - 15
  }, function (err, indent) {
      if (err) {return next(err);}
      res.send(indent);
  });
});

module.exports = router;
