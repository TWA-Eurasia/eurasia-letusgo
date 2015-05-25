'use strict';

var Category = require('../model/category');

var getCategoryByName = function(req, res, next) {

  var name = req.params.name;
  Category.find({name: name})
    .exec()
    .then(function(category) {
      if(category) {
        res.send({state: 200, data: true, message: '此类名已存在'});
      } else {
        res.send({state: 404, data: false, message: '此类名不存在'});
      }
    })
    .onReject(function(err) {
      next(err);
    });
};

var createNewCategory = function(req, res, next) {

  var newCategory = req.body;
  Category.create(newCategory)
    .then(function(category) {
      res.send({state:200, data: category, message: '添加新分类'});
    })
    .onReject(function(err) {
      next(err);
    });
};

module.exports = {
  getCategoryByName: getCategoryByName,
  createNewCategory: createNewCategory
};
