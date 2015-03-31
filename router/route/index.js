var express = require('express');
var router = express.Router();
var Item = require('../../model/item');

var _ = require('lodash');

router.get('/:pageNumber', function(req, res) {

  var pageNumber = req.params.pageNumber;
  var pageSize = 2;
  var start = (pageNumber - 1) * pageSize;

  Item.find().skip(start).limit(pageSize).exec(function (err, items) {
    res.render('index', {items: items});
  });
});

router.post('/', function(req, res) {
  Item.create({name: 'i', unit: '瓶', price: 3.5, imageUrl: 'image/cat2.png', state: 'recommend'}, function(err, item) {
    res.send(item);
  });
});

module.exports = router;
