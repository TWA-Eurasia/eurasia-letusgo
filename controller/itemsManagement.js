'use strict';

var Item = require('../model/item');

var getItemsManagementPage = function (req, res) {

  Item.find()
    .then(function(items){
      //
      res.render('itemsManagement', {
        items: items
      });
    })
};

module.exports = {
  getItemsManagementPage: getItemsManagementPage
};
