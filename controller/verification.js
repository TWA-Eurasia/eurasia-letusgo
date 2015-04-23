'use strict';

var User = require('../model/user');
var FIND_SUCCESS = '用户信息存在！！';

var updateActive = function (req, res, next) {
  var id = req.params.id;

  User.findOne(id)
    .exec()
    .then(function(user) {
      user.active = true;

      req.session.currentUserName = user.name;

      var currentUserName = req.session.currentUserName;
      res.render('verification',{currentUserName: currentUserName, userName : currentUserName});
    })
    .onReject(function(err) {

      next(err);
    });
};

var getUser = function (req, res, next) {
  var userName = req.params.userName;

  User.findOne({name : userName})
    .exec()
    .then(function(user) {

      res.send({state: 200, user: user, message: FIND_SUCCESS});
    })
    .onReject(function(err) {

      next(err);
    });
};

module.exports = {

  updateActive : updateActive,
  getUser : getUser
};
