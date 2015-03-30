var express = require('express');
var router = express.Router();
var Indent = require('../../model/indent.js');
var _ = require('lodash');

router.get('/', function (req, res) {
  Indent.find()
    .populate('itemList.item')
    .exec(function (err, orderList) {
      var data = orderList[0].itemList;

      _.forEach(data, function (indent) {
        indent.subtotal = indent.item.price * indent.number;
      });
      //res.send(data);
      res.render('orderList', {Indents: data});
    });
});
router.post('/', function (req, res) {
  Indent.create({
    itemList: [{item: "551901cbf6ea4cd89e88c24c", number: 15},
               {item: "551901cbf6ea4cd89e88c24c", number: 10}
              ],
    date: 2012 - 3 - 15
  }, function (err, indent) {
    res.send(indent);
  });
});

module.exports = router;
