'use strict';

var _ = require('lodash');

var User = require('../model/user');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Hotmail',
  auth: {
    user: 'fgcui@outlook.com',
    pass: '19921204cfg'
  }
});


var user = {};

user.getUsers = function(req, res) {

  User.find(function(err, users) {

    res.send({users: users});
  });
};

user.createUser = function(req, res) {

  var currentUser = req.body;

  User.create(currentUser, function(err, data) {


    var html = '<p>'+data.name+',您好：<p/> <p>我们收到您在 Letusgo 的注册申请，请点击下面的链接激活帐户：</p> <a href="http://127.0.0.1:3000">请点击本链接激活帐号 </a>';

    var mailOptions = {
      from: 'letusgo@letusgo.com', // sender address
      to: data.email, // list of receivers
      subject: '[Letusgo] 账号激活邮件', // Subject line
      text: '账号激活邮件', // plaintext body
      html: html
    };

    transporter.sendMail(mailOptions);
    //SendMail.sendMail;
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
