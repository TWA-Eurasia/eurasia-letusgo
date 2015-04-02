var express = require('express');
var router = express.Router();
var Item = require('../../model/item');
var Category = require('../../model/category');

router.get('/mainCategory/:id', function (req, res) {

  var id = req.params.id;
  Category.find({parent: id}, function (err, categories) {
    console.log(categories);
    res.send(categories);
  });
});

module.exports = router;
