'use strict';

var _ = require('lodash');

var User = require('../model/user');
var SendMail = require('../util/email');

var user = {};

user.getUsers = function(req, res) {

  User.find(function(err, users) {

    res.send({users: users});
  });
};

user.createUser = function(req, res) {

  var currentUser = req.body;

  User.create(currentUser, function(err, data) {
    SendMail.sendMail;
    res.send({user: data});

  });
};

user.updateUser = function(req, res) {

  var userId = req.params.id;
  var indentId = req.body.indentId;

  User.update(userId, {$addToSet: {indents: indentId}}, function () {

    res.send('add indent to user is successful');
  });
};

module.exports = user;
