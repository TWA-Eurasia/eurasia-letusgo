'use strict';

var express = require('express');
var router = express.Router();

var User = require('../../model/user');
//
//router.post('/:id', function (req, res) {
//
//  var userId = req.params.id;
//  var indentId = req.body.indentId;
//
//  User.update(userId, {$addToSet: {indents: indentId}}, function (err, user) {
//    res.send('add indent to user is successful');
//  });
//});

router.post('/login', function(req, res) {
  var message = '登陆成功！';
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({'name': username}, function(err, user) {
    if(!user || user.password !== password) {
      message = '用户或密码错误！';
    }

    res.send({user: user, message: message});
  });
});

module.exports = router;
