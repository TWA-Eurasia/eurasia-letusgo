'use strict';

var User = require('../model/user');

var USER_LOGIN_SUCCESS = '用户登陆成功!';
var ADMIN_LOGIN_SUCCESS = '管理员登陆成功!';
var LOGIN_FAILURE = '用户或密码错误!';
var LOGIN_ACTIVE = '帐号未激活!';
var LOGOUT_SUCCESS = '退出成功!';

var login = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  var session = req.session;

  User.findOne({name: username}, function (err, user) {

    if(user && user.name === 'letusgoAdmin'){
      console.log('hhah');
      return res.send({state: 200, data: {name: user.name, role: 'admin'}, message: ADMIN_LOGIN_SUCCESS});
    }

    if(user && user.active === false) {
      return res.send({state: 401, data: {}, message: LOGIN_ACTIVE});
    }

    if(!user || user.password !== password) {
      return res.send({state: 401, data: {}, message: LOGIN_FAILURE});
    }

    session.currentUserId  = user._id;
    session.currentUserName = user.name;

    res.send({state: 200, data: {name: user.name, role: 'user'}, message: USER_LOGIN_SUCCESS});
  });
};

var logout = function(req, res) {

  req.session.currentUserName = null;

  res.send({state: 200, data: {}, message: LOGOUT_SUCCESS});
};

module.exports = {

  login: login,
  logout: logout
};
