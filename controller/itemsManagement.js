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
        items: items
      });
    });
};

module.exports = {
  getItemsManagementPage: getItemsManagementPage
};
