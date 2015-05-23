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
    console.log(item);
    res.render('itemModifyPage', {
      status: 200,
      data: item
    })
  })
};

module.exports = {
  getItemsManagementPage: getItemsManagementPage,
  getItemById: getItemById
};
