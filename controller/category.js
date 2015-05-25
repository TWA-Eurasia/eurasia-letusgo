'use strict';

var Category = require('../model/category');

var createNewCategory = function(req, res, next){

  var name = req.body.name;
  var parent = req.body.parent;
  Category.create({name: name, parent: parent})
    .then(function(category) {
      res.send({state:200, data: category, message: '添加新分类'});
    })
    .onReject(function(err) {
      next(err);
    });
};
module.exports = {

  createNewCategory: createNewCategory
};
