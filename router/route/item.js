var express = require('express');
var router = express.Router();
var Item = require('../../model/item');
var Category = require('../../model/category');

router.get('/', function (req, res) {

    Category.findById('551aa95e2ef086a169628b74')
    .populate('parent')
    .exec(function(err, category){

        Item.findById('551aac132ef086a169628b75')
        .populate('category')
        .exec(function (err, item) {

          var test = {
            item: item,
            category: category
          };

          res.send(test);
        });
      });
});

router.get('/:id', function(req, res){
  var id = req.params.id;

  Item.findById(id, function(err, item){

    res.send(item);
  });
});

router.post('/:id',function(req, res) {

  var id = req.params.id;

  var inventory = req.body.inventory;

  Item.update({_id: id}, {$set:
    {
      inventory: inventory
     }
  }, function(){
    res.send('inventory decrease successful');
  });
});

module.exports = router;
