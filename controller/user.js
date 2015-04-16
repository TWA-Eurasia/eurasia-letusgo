'use strict';

var _ = require('lodash');

var User = require('../model/user');

var user = {};

user.getUsers = function(req, res) {

  User.find(function(err, users) {

    res.send(users);
  });
};

user.createUser = function(req, res) {

  var currentUser = req.body;

  User.create(currentUser, function(err, data) {

    res.send(data);

  });
};

user.updateUser = function(req, res) {

  var userId = req.params.id;
  var indentId = req.body.indentId;

  User.update(userId, {$addToSet: {indents: indentId}}, function () {

    res.send('add indent to user is successful');
  });
};

user.login = function(req, res) {

  var message = '登陆成功！';
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({'name': username}, function(err, user) {
    if(!user || user.password !== password) {
      message = '用户或密码错误！';
    }
    res.send({user: user, message: message});
  });
};

module.exports = user;
