'use strict';

var $ = require('jquery');
var moment = require('moment');
var _ = require('lodash');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {

  var previousUrl = document.referrer;
  $('.confirm').attr('href', previousUrl);

  function getUsers(callback) {

    $.get('/api/user')
      .success(function(users) {

        callback(users);
      });
  }

  function verifyUserExisted(userName, messageSelector, correctSelector) {

    var isCorrect = true;
    getUsers(function(users) {

      if (_.find(users, function (user) {

          return user.name === userName;
        })) {

        messageSelector.html('当前用户名已被注册').show();
        isCorrect = false;
      } else {

        correctSelector.show();
      }
    });
    return isCorrect;
  }

  function commonVerifyRegular(value, selectors, messages, condition) {

    var isCorrect = true;
    if (value === '') {

      selectors[0].html(messages[0]).show();
      isCorrect = false;

    } else if (condition) {

      selectors[0].html(messages[1]).show();
      isCorrect = false;
    } else {

      selectors[1].show();
    }
    return isCorrect;
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

    var passwordSelectors = [$passwordMessage, $passwordCorrect];
    var passwordMessages = ['密码不能为空', '密码至少为6-20位字符'];

    commonVerifyRegular(password, passwordSelectors, passwordMessages, !passwordReg.exec(password));
  });

  $('#repeat-password').on('blur', function (){

    var $repeatPasswordMessage = $('#repeat-password-message');
    $repeatPasswordMessage.hide();

    var $repeatPasswordCorrect = $('#repeat-password-correct');
    $repeatPasswordCorrect.hide();

    var password = $('#password').val().trim('');
    var repeatPassword = $('#repeat-password').val().trim('');

    var repeatPasswordSelectors = [$repeatPasswordMessage, $repeatPasswordCorrect];
    var $repeatPasswordMessages = ['重复密码不能为空', '用户两次密码输入不一致'];

    commonVerifyRegular(repeatPassword, repeatPasswordSelectors, $repeatPasswordMessages, repeatPassword !== password);
  });


  $('#email').on('blur', function (){

    var $emailMessage = $('#email-message');
    $emailMessage.hide();

    var $emailCorrect = $('#email-correct');
    $emailCorrect.hide();

    var email = $('#email').val().trim('');
    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

    var emailSelectors = [$emailMessage, $emailCorrect];
    var emailMessages = ['邮箱不能为空', '请填写正确邮箱的格式'];

    commonVerifyRegular(email, emailSelectors, emailMessages, !emailReg.exec(email));
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
    var userReg = new RegExp('[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b@]');

    if (userName === '') {

      $userNameMessage.html('用户名不能为空').show();

    } else if (userNameLength < 6 || userNameLength > 20) {

      $userNameMessage.html('用户名至少为6-20位字符').show();
    } else if (userReg.exec(userName)) {

      $userNameMessage.html('请输入正确格式的用户名').show();
    } else {

      isCorrect = verifyUserExisted(userName, $userNameMessage, $userNameCorrect);
    }

    var $passwordMessage = $('#password-message');
    $passwordMessage.hide();

    var $passwordCorrect = $('#password-correct');
    $passwordCorrect.hide();


    var password = $('#password').val().trim('');
    var passwordReg = /^(\w){6,20}$/;

    var passwordSelectors = [$passwordMessage, $passwordCorrect];
    var passwordMessages = ['密码不能为空', '密码至少为6-20位字符'];

    isCorrect = commonVerifyRegular(password, passwordSelectors, passwordMessages, !passwordReg.exec(password));

    var $repeatPasswordMessage = $('#repeat-password-message');
    $repeatPasswordMessage.hide();

    var $repeatPasswordCorrect = $('#repeat-password-correct');
    $repeatPasswordCorrect.hide();

    var repeatPassword = $('#repeat-password').val().trim('');

    var repeatPasswordSelectors = [$repeatPasswordMessage, $repeatPasswordCorrect];
    var $repeatPasswordMessages = ['重复密码不能为空', '用户两次密码输入不一致'];

    isCorrect = commonVerifyRegular(repeatPassword, repeatPasswordSelectors, $repeatPasswordMessages, repeatPassword !== password);

    var $emailMessage = $('#email-message');
    $emailMessage.hide();

    var $emailCorrect = $('#email-correct');
    $emailCorrect.hide();

    var email = $('#email').val().trim('');
    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

    var emailSelectors = [$emailMessage, $emailCorrect];
    var emailMessages = ['邮箱不能为空', '请填写正确邮箱的格式'];

    isCorrect = commonVerifyRegular(email, emailSelectors, emailMessages, !emailReg.exec(email));

    var address = $('#address').val().trim();
    var phoneNumber = $('#phone-number').val().trim();
    var createDate = moment().format('YYYY-MM-DD HH:mm:ss');

    if(isCorrect) {

      $.post('api/user',
        {
          name: userName,
          password: password,
          address: address,
          phoneNumber: phoneNumber,
          active: true,
          createDate: createDate

        }).success(function() {

          $('.ui.second.modal')
            .modal('show');
      });
    }
  });
});
