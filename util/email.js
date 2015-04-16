'use strict';

var nodemailer = require('nodemailer');
//var config = require('../config');
var user = '877975601@qq.com';
var pass = '2014@cfg';

var transport = nodemailer.createTransport({
  service: 'QQ',
  auth: {
    user: user,
    pass: pass
  }
});

var mailOptions = {
  from: '877975601@qq.com', // sender address
  to: 'fgcui1204@163.com', // list of receivers
  subject: '来自html5jq.com的激活邮件', // Subject line
  text: '欢迎来到前端世界', // plaintext body
  html: '欢迎来到前端世界 ' // html body
};
//transport.sendMail({
//  from    : 'Kris<' + user + '>',
//  to      : '<fgcui1204@163.com>',
//  subject : 'Node.JS通过SMTP协议从QQ邮箱发送邮件',
//  html    : '这是一封测试邮件 <br> '
//}, function(err, res) {
//  console.log(err, res);
//});

