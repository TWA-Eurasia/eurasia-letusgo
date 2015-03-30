var express = require('express');
var router = express.Router();
var Item = require('../../model/item');
var Category = require('../../model/category');

router.get('/', function (req, res) {

  Item.findById('5519b68e6f9d2f7701a99bc2', function(err, item){
    res.send(item);
  });
});

function createCategory(){
  //  Subcategory.create({
  //   name:'男装'
  // }, function(err, subCategory){
  //   Category.create({
  //     name : '服装',
  //     subCategories: [subCategory._id]
  //   }, function(err, category){
  //
  //     res.send('hello');
  //   });
  // });

  }

function creatItem(res){

  Item.create({
    name : '男士短袖',
    unit : '件',
    price : 40,
    leftNumber : 10,
    imageUrl : 'image/11.jpg',
    description : '这是个男士上衣',
    specification : '30',
    category: '服装',
  }, function(err, data){
    console.log(data);
    res.send(data);
  });
}

module.exports = router;
