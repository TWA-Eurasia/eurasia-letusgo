var express = require('express');
var router = express.Router();
var Category = require('../../model/category');
var Item = require('../../model/item');


router.get('/:id', function (req, res, next) {
  var id = req.params.id;

  Item.find({category: id}, function(err, items){

    if (err) return next(err);
    console.log(items);
    res.send(items);
  });
});

module.exports = router;
