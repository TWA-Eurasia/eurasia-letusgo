'use strict';

var Item = require('../model/item');

var FormatUtil = require('../util/formatUtil');
var NAME_LENGTH = 16;

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

  res.render('addNewItemPage', {
    status: 200
  });
};

module.exports = {

  getItemsManagementPage: getItemsManagementPage,
  getItemById: getItemById,
  removeItemById: removeItemById,
  updateItemById: updateItemById,
  addNewItemPage: addNewItemPage
};
