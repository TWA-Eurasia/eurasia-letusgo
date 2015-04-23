'use strict';

var User = require('../model/user');

var LOGIN_SUCCESS = '登陆成功！';
var LOGIN_FAILURE = '用户或密码错误！';
var LOGIN_ACTIVE = '帐号未激活！';

var login = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  var session = req.session;

  User.findOne({name: username}, function (err, user) {

    if(user && user.active === false) {
      return res.send({state: 401, data: {}, message: LOGIN_ACTIVE});
    }

    if(!user || user.password !== password) {
      return res.send({state: 401, data: {}, message: LOGIN_FAILURE});
    }

    session.currentUserName = user.name;
    res.send({state: 200, data: user.name, message: LOGIN_SUCCESS});
  });
};

var logout = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  var session = req.session;

  User.findOne({name: username}, function (err, user) {

    if(user && user.active === false) {
      return res.send({state: 401, data: {}, message: LOGIN_ACTIVE});
    }

    if(!user || user.password !== password) {
      return res.send({state: 401, data: {}, message: LOGIN_FAILURE});
    }

    session.currentUserName = user.name;
    res.send({state: 200, data: user.name, message: LOGIN_SUCCESS});
  });
};

module.exports = {

  login: login,
  logout: logout
};
