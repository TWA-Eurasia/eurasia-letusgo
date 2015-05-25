'use strict';

var Item = require('../model/item');
var Category = require('../model/category');
var _ = require('lodash');

var FormatUtil = require('../util/formatUtil');
var NAME_LENGTH = 16;

function getSubCategories(categories, mainCategories) {

  _.forEach(categories, function (category) {

    if (category.parent) {

      _.forEach(mainCategories, function (mainCategory) {

        if (category.parent.name === mainCategory.name) {
          mainCategory.subCategories.push(category);
        }
      });
    }
  });

  return mainCategories;
}

var getItemsManagementPage = function (req, res) {

  Item.find()
    .then(function(items){

      items.forEach(function(item){

        item.shortName = FormatUtil.parseString(item.name, NAME_LENGTH);
      });

      res.render('itemsManagement', {
        status: 200,
        data: items
      });
    });
};

var getItemById = function(req, res){

  var id = req.params.id;

  Item.findById(id, function(err, item){
    res.render('itemModifyPage', {
      status: 200,
      data: item
    });
  });
};

var removeItemById = function(req, res){
  var id = req.params.id;

  Item.remove({_id: id}, function(){
    res.send({
      status: 200
    });
  });
};

var updateItemById = function(req, res){

  var id = req.params.id;

  Item.update({_id: id}, {
    $set: {

      name: req.body.name,
      unit: req.body.unit,
      price: req.body.price,
      inventory: req.body.inventory
    }
  }, function(){

    res.send({status: 200});
  });
};

var addNewItemPage = function(req, res){

  Category.find()
    .populate('parent')
    .exec(function (err, categories) {
      var mainCategories = _.filter(categories, function (category) {

        category.subCategories = [];
        return category.parent === null;
      });

      mainCategories = getSubCategories(categories, mainCategories);

      res.render('addNewItemPage', {
        status: 200,
        data: {
          mainCategories: mainCategories
        }
      });
    });
};

var createNewItem = function(req, res){

  Item.create({
    name: req.body.name,
    unit: req.body.unit,
    image: req.body.image,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    inventory: req.body.inventory,
    isRecommend: true
  });

  res.send({
    status: 200
  })
};

module.exports = {

  getItemsManagementPage: getItemsManagementPage,
  getItemById: getItemById,
  removeItemById: removeItemById,
  updateItemById: updateItemById,
  addNewItemPage: addNewItemPage,
  createNewItem: createNewItem
};
