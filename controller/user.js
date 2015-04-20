'use strict';

var _ = require('lodash');

var User = require('../model/user');
var sendMail = require('../util/email');

var getUsers = function(req, res) {

  User.find(function(err, users) {

    res.send(users);
  });
};

var getUserById = function(req,res) {

  var id = req.params.id;

  User.findById(id)
    .exec(function(err, user) {

      res.send({user: user});
    });
};
var createUser = function(req, res) {

  var currentUser = req.body;

  User.create(currentUser, function (err, data) {

    sendMail.sendMail(data);
    res.send(data);

  });
};

var updateUser = function(req, res) {

  var userId = req.params.id;
  var indentId = req.body.indentId;

  User.update(userId, {$addToSet: {indents: indentId}}, function () {

    res.send('add indent to user is successful');
  });
};

var login = function(req, res) {

  var message = '登陆成功！';
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({'name': username}, function (err, user) {
    if (!user || user.password !== password) {
      message = '用户或密码错误！';
    }
    res.send({user: user, message: message});
  });
};

module.exports = {
  getUsers: getUsers,
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  login: login
};
