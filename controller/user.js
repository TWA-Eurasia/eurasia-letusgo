'use strict';

var _ = require('lodash');

var userModel = require('../model/user');

var user = {};

user.createUser = function(req, res) {

  var currentUser = req.body;

  userModel.create(currentUser, function(err, data) {

    res.send(data);
  });
};

module.exports = user;
