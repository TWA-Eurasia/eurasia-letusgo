var express = require('express');
var router = express.Router();

var Category = require('../../model/category');

router.get('/:id', function (req, res) {

  var id = req.params.id;

  Category.findById(id)
  .populate('parent')
  .exec(function (err, category) {

    res.send(category.parent._id);
  });

});

module.exports = router;
