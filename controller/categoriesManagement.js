'use strict';

var Category = require('../model/category');

var FormatUtil = require('../util/formatUtil');
var NAME_LENGTH = 16;

var getCategoriesManagementInfo = function (req, res) {

  Category.find({})
    .exec()
    .then(function(categories){

      categories.forEach(function(categories){

        categories.shortName = FormatUtil.parseString(categories.name, NAME_LENGTH);
      });

      res.render('categoriesManagement', {
        mainCategories: categories
      });
    });
};

module.exports = {

  getCategoriesManagementInfo: getCategoriesManagementInfo
};
