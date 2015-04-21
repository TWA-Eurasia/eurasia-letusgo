'use strict';

var _ = require('lodash');

var User = require('../model/user');
var sendMail = require('../util/email');

var getUserByName = function(req, res) {

  var name = req.params.name;

  User.find({name: name}, function(err, user) {

    if(user) {

      res.send({isExisted: true});
    } else {

      res.send({isExisted: false});
    }
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

  User.findOne({'name': username, 'active': true}, function (err, user) {

    if(!user) {
      message = '用户不存在或未激活账户！';
      return res.send({message: message});
    }

    if(user.password !== password) {
      message = '用户或密码错误！';
      return res.send({message: message});
    }

    res.send({user: user, message: message});
  });
};

module.exports = {
  getUserByName: getUserByName,
  getUserById: getUserById,
  createUser: createUser,
  updateUser: updateUser,
  login: login
};
