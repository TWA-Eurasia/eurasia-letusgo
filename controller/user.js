'use strict';

var _ = require('lodash');

var User = require('../model/user');
var sendMail = require('../util/email');

var USER_EXISTED = '当前用户名已被注册';
var USER_UNEXISTED = '用户名可用';
var LOGIN_SUCCESS = '登陆成功！';
var LOGIN_FAILURE = '用户或密码错误！';
var LOGIN_ACTIVE = '帐号未激活！';
var CREATE_SUCCESS = '用户创建成功';

var findUser = function(req, res, next) {

  var name = req.query.name;

  User.find({name: name})
    .then(function(user) {

      console.log(user);
      if(user.length === 1) {

        res.send({isExisted: true, message: USER_EXISTED});
      } else {

        res.send({isExisted: false, message: USER_UNEXISTED});
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
      user.password = '******';
      res.send({state: 200, user: user});
    })
    .onReject(function(err) {
      next(err);
    });
};

var createUser = function(req, res, next) {

  var currentUser = req.body;

  User.create(currentUser)
    .then(function(user) {

      console.log(user);
      sendMail.sendMail(user);

      user.password = '******';
      res.send({status: 200, data: user, message: CREATE_SUCCESS});
    })
    .onReject(function(err) {

      next(err);
    });

};
//
//var updateUser = function(req, res) {
//
//  var userId = req.params.id;
//  var indentId = req.body.indentId;
//
//  User.update(userId, {$addToSet: {indents: indentId}}, function () {
//
//    res.send('add indent to user is successful');
//  });
//};

var login = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({'name': username}, function (err, user) {

    if(user && user.active === false) {
      return res.send({state: 401, data: {}, message: LOGIN_ACTIVE});
    }

    if(!user || user.password !== password) {
      return res.send({state: 401, data: {}, message: LOGIN_FAILURE});
    }
    user.password = '******';
    res.send({state: 200, user: user, message: LOGIN_SUCCESS});
  });
};

module.exports = {
  findUser: findUser,
  getUserById: getUserById,
  createUser: createUser,
  //updateUser: updateUser,
  login: login
};
