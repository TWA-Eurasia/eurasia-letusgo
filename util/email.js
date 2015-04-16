'use strict';

var nodeMailer = require('nodemailer');

var transporter = nodeMailer.createTransport({
  service: 'Hotmail',
  auth: {
    user: 'fgcui@outlook.com',
    pass: '19921204cfg'
  }
});

var sendMail = function(data){

  var html = '<p>'+data.name+',您好：<p/> <p>我们收到您在 Letusgo 的注册申请，请点击下面的链接激活帐户：</p> '+
              '<a href="http://127.0.0.1:3000/verification/'+data._id+'">请点击本链接激活帐号 </a>';

  var mailOptions = {
    from: 'letusgo@letusgo.com',
    to: data.email,
    subject: '[Letusgo] 账号激活邮件',
    text: '账号激活邮件',
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Message sent: ' + info.response);
    }
  });
};

module.exports = {
  sendMail: sendMail
};
