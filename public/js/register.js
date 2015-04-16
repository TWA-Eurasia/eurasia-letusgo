'use strict';

var $ = require('jquery');
var moment = require('moment');
var _ = require('lodash');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {

  var previousUrl = document.referrer;
  $('.confirm').attr('href', previousUrl);

  function getUsers(callback) {

    $.ajax({
      url: '/api/user',
      type: 'GET',
      success: function (users) {

        callback(users);
      }
    });
  }

  function verifyUserExisted(userName, messageSelector, correctSelector) {

    getUsers(function(users) {

      if (_.find(users, function (user) {

          return user.name === userName;
        })) {

        messageSelector.html('当前用户名已被注册').show();
      } else {

        correctSelector.show();
      }
    });
  }

  $('#user-name').on('blur', function () {

    var $userNameMessage = $('#user-name-message');
    $userNameMessage.hide();

    var $userNameCorrect = $('#user-name-correct');
    $userNameCorrect.hide();

    var userName = $('#user-name').val().trim('');
    var userNameLength = userName.replace(/[^x00-xff]/g,'**').length;
    var userReg = new RegExp('[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b@]');

    if (userName === '') {

      $userNameMessage.html('用户名不能为空').show();

    } else if (userNameLength < 6 || userNameLength > 20) {

      $userNameMessage.html('用户名至少为6-20位字符').show();
    } else if (userReg.exec(userName)) {

      $userNameMessage.html('请输入正确格式的用户名').show();
    } else {

      verifyUserExisted(userName, $userNameMessage, $userNameCorrect);
    }
  });

  $('#password').on('blur', function (){

    var $passwordMessage = $('#password-message');
    $passwordMessage.hide();

    var $passwordCorrect = $('#password-correct');
    $passwordCorrect.hide();


    var password = $('#password').val().trim('');
    var passwordReg = /^(\w){6,20}$/;

    if (password === '') {

      $passwordMessage.html('密码不能为空').show();

    } else if (!passwordReg.exec(password)) {

      $passwordMessage.html('密码至少为6-20位字符').show();
    } else {

      $passwordCorrect.show();
    }
  });

  $('#repeat-password').on('blur', function (){

    var $repeatPasswordMessage = $('#repeat-password-message');
    $repeatPasswordMessage.hide();

    var $repeatPasswordCorrect = $('#repeat-password-correct');
    $repeatPasswordCorrect.hide();

    var password = $('#password').val().trim('');
    var repeatPassword = $('#repeat-password').val().trim('');

    if (repeatPassword === '') {

      $repeatPasswordMessage.html('重复密码不能为空').show();

    } else if (repeatPassword !== password) {

      $repeatPasswordMessage.html('用户两次密码输入不一致').show();
    } else {

      $repeatPasswordCorrect.show();
    }
  });


  $('#email').on('blur', function (){

    var $emailMessage = $('#email-message');
    $emailMessage.hide();

    var $emailCorrect = $('#email-correct');
    $emailCorrect.hide();

    var email = $('#email').val().trim('');
    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;


    if (email === '') {

      $emailMessage.html('邮箱不能为空').show();

    } else if (!emailReg.exec(email)) {

      $emailMessage.html('请填写正确邮箱的格式').show();
    } else {

      $emailCorrect.show();
    }
  });

  $('#reset-button').on('click', function() {

    $('#user-name').val('');
    $('#password').val('');
    $('#repeat-password').val('');
    $('#phone-number').val('');
    $('#address').val('');
    $('#email').val('');
  });

  $('#submit-button').on('click', function() {

    var isCorrect = true;

    var $userNameMessage = $('#user-name-message');
    $userNameMessage.hide();

    var $userNameCorrect = $('#user-name-correct');
    $userNameCorrect.hide();

    var userName = $('#user-name').val().trim('');
    var userNameLength = userName.replace(/[^x00-xff]/g,'**').length;

    if (userName === '') {

      $userNameMessage.html('用户名不能为空').show();
      isCorrect = false;

    } else if (userNameLength < 6 || userNameLength > 20) {

      $userNameMessage.html('用户名至少为6-20位字符').show();
      isCorrect = false;

    } else {

      $userNameCorrect.show();
    }


    var $passwordMessage = $('#password-message');
    $passwordMessage.hide();

    var $passwordCorrect = $('#password-correct');
    $passwordCorrect.hide();

    var password = $('#password').val().trim('');
    var passwordReg = /^(\w){6,20}$/;

    if (password === '') {

      $passwordMessage.html('密码不能为空').show();
      isCorrect = false;

    } else if (!passwordReg.exec(password)) {

      $passwordMessage.html('密码至少为6-20位字符').show();
      isCorrect = false;

    } else {

      $passwordCorrect.show();
    }


    var $repeatPasswordMessage = $('#repeat-password-message');
    $repeatPasswordMessage.hide();

    var $repeatPasswordCorrect = $('#repeat-password-correct');
    $repeatPasswordCorrect.hide();

    var repeatPassword = $('#repeat-password').val().trim('');

    if (repeatPassword === '') {

      $repeatPasswordMessage.html('重复密码不能为空').show();
      isCorrect = false;


    } else if (repeatPassword !== password) {

      $repeatPasswordMessage.html('用户两次密码输入不一致').show();
      isCorrect = false;

    } else {

      $repeatPasswordCorrect.show();
    }


    var $emailMessage = $('#email-message');
    $emailMessage.hide();

    var $emailCorrect = $('#email-correct');
    $emailCorrect.hide();

    var email = $('#email').val().trim('');
    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

    if (email === '') {

      $emailMessage.html('邮箱不能为空').show();
      isCorrect = false;

    } else if (!emailReg.exec(email)) {

      $emailMessage.html('请填写正确邮箱的格式').show();
      isCorrect = false;

    } else {

      $emailCorrect.show();
    }

    var address = $('#address').val().trim();
    var phoneNumber = $('#phone-number').val().trim();
    var createDate = moment().format('YYYY-MM-DD HH:mm:ss');

    if(isCorrect) {
      $.ajax({
        url: '/api/user',
        type: 'POST',
        data: {
          name: userName,
          password: password,
          address: address,
          phoneNumber: phoneNumber,
          active: true,
          createDate: createDate,
        },
        success: function() {

          $('.ui.second.modal')
            .modal('show');
        }
      });
    }
  });
});
