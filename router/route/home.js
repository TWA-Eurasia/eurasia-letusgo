var express = require('express');
var router = express.Router();

var _ = require('lodash');

var Category = require('../../model/category.js');

router.get('/', function (req, res) {

  Category.find()
    .populate('parent')
    .exec(function(err, categories){

      _.forEach(categories, function(category, n){

        if(category.parent){
          console.log(category.name + 'is a child');
        }else{
          console.log(category.name + 'is a parent');
        }
    });
  });
});

module.exports = router;
