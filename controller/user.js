'use strict';

var User = require('../model/user');
var sendMail = require('../util/email');
var md5 = require('MD5');

var USER_EXISTED = '当前用户名已被注册';
var USER_NOT_EXISTED = '用户名可用';
var CREATE_SUCCESS = '用户创建成功';
var FIND_USER_BY_ID = '成功找到用户';

var findUser = function(req, res, next) {

  var name = req.query.name;

  User.find({name: name})
    .exec()
    .then(function(user) {

      if(user.length === 1) {

        res.send({state: 200, data: true, message: USER_EXISTED});
      } else {

        res.send({state: 200, data: false, message: USER_NOT_EXISTED});
      }
    })
    .onReject(function(err) {

      next(err);
    });
};

var getUserById = function(req, res, next) {

  var id = req.params.id;

  User.findById(id)
    .exec()
    .then(function(user) {

      var currentUser = {

        id: user._id,
        name: user.name
      };

      res.send({state: 200, data: currentUser, message: FIND_USER_BY_ID});
    })
    .onReject(function(err) {
      next(err);
    });
};

var createUser = function(req, res, next) {

  req.body.password = md5(req.body.password);
  var currentUser = req.body;

  console.log(currentUser);
  User.create(currentUser)
    .then(function(user) {

      sendMail.sendMail(user);

      var newUser = {

        id: user._id,
        name: user.name
      };

      res.send({state: 200, data: newUser, message: CREATE_SUCCESS});
    })
    .onReject(function(err) {

      next(err);
    });

};

module.exports = {

  findUser: findUser,
  getUserById: getUserById,
  createUser: createUser
};
