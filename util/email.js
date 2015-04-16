'use strict';

var nodemailer = require('nodemailer');
//var config = require('config');
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Hotmail',
  auth: {
    user: 'fgcui@outlook.com',
    pass: '19921204cfg'
  }
});
var html = '<p>xxx,您好：<p/> <p>我们收到您在 Letusgo 的注册申请，请点击下面的链接激活帐户：</p> <a href="http://127.0.0.1:3000">请点击本链接激活帐号 </a>';

// setup e-mail data with unicode symbols
var mailOptions = {
  from: 'letusgo@letusgo.com', // sender address
  to: 'fgcui@outlook.com', // list of receivers
  subject: '[Letusgo] 账号激活邮件', // Subject line
  text: '账号激活邮件', // plaintext body
  html: html
};


// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
  if(error){
    console.log(error);
  }else{
    console.log('Message sent: ' + info.response);
  }
});

