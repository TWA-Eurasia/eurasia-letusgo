'use strict';

var _ = require('lodash');
var Category = require('../model/category');
var FormatUtil = require('../util/formatUtil');
var NAME_LENGTH = 16;

var getCategoriesManagementInfo = function (req, res) {

  Category.find({})
    .populate('parent')
    .exec()
    .then(function(categories){

      categories.forEach(function(categories){

        categories.shortName = FormatUtil.parseString(categories.name, NAME_LENGTH);
      });

      var mainCategories = _.filter(categories, function (category) {

        return category.parent === null;
      });

      res.render('categoriesManagement', {
        mainCategories: mainCategories
      });
    });
};

module.exports = {

  getCategoriesManagementInfo: getCategoriesManagementInfo
};
