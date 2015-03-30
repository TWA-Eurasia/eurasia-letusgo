var express = require('express');
var router = express.Router();
var Item = require('../../model/item');

router.get('/', function (req, res) {
    //Item.create({
    //  name: '哇哈哈',
    //  unit: '瓶',
    //  brand: '娃哈哈',
    //  leftNumber: 100,
    //  specification: '350ml',
    //  price: 8
    //}, function (err, item) {
    //  res.send('items');
    //});
});

module.exports = router;
