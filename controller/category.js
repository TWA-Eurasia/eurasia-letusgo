'use strict';

var Category = require('../model/category');
var Item = require('../model/item');

var getCategoryByName = function(req, res, next) {

  var name = req.params.name;
  Category.find({name: name})
    .exec()
    .then(function(category) {
      if(category.length > 0) {
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

var updateCategoryById = function(req, res) {

  var id = req.params.id;
  Category.update({_id: id}, {
    $set: {

      name: req.body.name,
      parent: req.body.parent
    }
  }, function(){

    res.send({state: 200, data: {}, message: '修改成功'});
  });
};

var canDeleteCategory = function(req, res, next) {
  var id = req.params.id;
  Category.findById(id)
    .populate('parent')
    .exec()
    .then(function(category) {

      if(category.parent === null) {
        Category.find({parent: id}).exec(function(err, categories) {
          if(categories.length > 0) {
            res.send({state: 200, data: true, message: '此分类下有子分类'});
          } else {
            res.send({state: 200, data: false, message: '此分类下无商品'});
          }
        });
      } else {
        Item.find({category: id}).exec(function(err, items) {
          if(items.length > 0) {
            res.send({state: 200, data: true, message: '此分类下有商品'});
          } else {
            res.send({state: 200, data: false, message: '此分类无商品'});
          }
        });
      }
    })
    .onReject(function(err) {
      next(err);
    });
};

var deleteCategoryById = function(req, res) {

  var id = req.params.id;
  Item.remove({category: id}, function(){

    Category.remove({parent: id}, function() {

      Category.remove({_id: id}, function() {

        res.send({state: 200, data: {}, message: '删除成功'});
      });
    });
  });
};

module.exports = {
  getCategoryByName: getCategoryByName,
  createNewCategory: createNewCategory,
  updateCategoryById: updateCategoryById,
  canDeleteCategory: canDeleteCategory,
  deleteCategoryById: deleteCategoryById
};
