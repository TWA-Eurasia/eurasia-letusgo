'use strict';

var $ = require('jquery');
var moment = require('moment');
var md5 = require('MD5');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var PASSWORD_MESSAGES = {

  REQUIRED: '密码不能为空',
  RULE: '密码至少为6-20位字符'
};

var REPEAT_PASSWORD_MESSAGES = {

  REQUIRED: '重复密码不能为空',
  RULE: '用户两次密码输入不一致'
};

var EMAIL_MESSAGES = {

  REQUIRED: '邮箱不能为空',
  RULE: '请填写正确邮箱的格式'
};

$(function () {

  var previousUrl = document.referrer;
  $('.confirm').attr('href', previousUrl);

  function getUsers(name, callback) {

    $.get('/api/user', {name: name})
      .success(function (data) {

        callback(data);
      });
  }

  function verifyUserExisted(userName, messageSelector, correctSelector) {

    var isCorrect = true;
    getUsers(userName, function (resp) {

      if (resp.data) {
        messageSelector.val('用户名已存在').show();
        correctSelector.hide();
        isCorrect = false;

      } else {
        correctSelector.show();
      }
      return isCorrect;
    });
  }

  function commonVerifyRegular(value, selectors, messages, condition) {

    var isCorrect = true;
    if (value === '') {
      selectors.message.val(messages.REQUIRED).show();
      selectors.correct.hide();
      isCorrect = false;

    } else if (condition) {
      selectors.message.val(messages.RULE).show();
      selectors.correct.hide();
      isCorrect = false;

    } else {
      selectors.correct.show();
    }
    return isCorrect;
  }

  $('#user-name').on('change', function () {

    var $userNameMessage = $('#user-name-message');
    $userNameMessage.val('');

    var $userNameCorrect = $('#user-name-correct');
    $userNameCorrect.val('');

    var userName = $('#user-name').val().trim('');
    var userNameLength = userName.replace(/[^x00-xff]/g, '**').length;
    var userReg = new RegExp('[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b@]');

    if (userName === '') {

      $userNameMessage.val('用户名不能为空').show();

    } else if (userNameLength < 6 || userNameLength > 20) {

      $userNameMessage.val('用户名至少为6-20位字符').show();
    } else if (userReg.exec(userName)) {

      $userNameMessage.val('请输入正确格式的用户名').show();
    } else {

      verifyUserExisted(userName, $userNameMessage, $userNameCorrect);
    }
  });

  $('#password').on('change', function () {

    var $passwordMessage = $('#password-message');
    $passwordMessage.val('');

    var $passwordCorrect = $('#password-correct');
    $passwordCorrect.hide();

    var password = $('#password').val().trim('');

    var passwordReg = /^(\w){6,20}$/;

    var passwordSelectors = {

      message: $passwordMessage,
      correct: $passwordCorrect
    };

    commonVerifyRegular(password, passwordSelectors, PASSWORD_MESSAGES, !passwordReg.exec(password));
  });

  $('#repeat-password').on('change', function () {

    var $repeatPasswordMessage = $('#repeat-password-message');
    $repeatPasswordMessage.val('');

    var $repeatPasswordCorrect = $('#repeat-password-correct');
    $repeatPasswordCorrect.val('');

    var password = $('#password').val().trim('');
    var repeatPassword = $('#repeat-password').val().trim('');

    var repeatPasswordSelectors = {

      message: $repeatPasswordMessage,
      correct: $repeatPasswordCorrect
    };

    commonVerifyRegular(repeatPassword, repeatPasswordSelectors, REPEAT_PASSWORD_MESSAGES, repeatPassword !== password);
  });


  $('#email').on('change', function () {

    var $emailMessage = $('#email-message');
    $emailMessage.val('');

    var $emailCorrect = $('#email-correct');
    $emailCorrect.show();

    var email = $('#email').val().trim('');
    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

    var emailSelectors = {

      message: $emailMessage,
      correct: $emailCorrect
    };

    commonVerifyRegular(email, emailSelectors, EMAIL_MESSAGES, !emailReg.exec(email));
  });

  $('#reset-button').on('click', function () {

    $('#user-name').val('');
    $('#password').val('');
    $('#repeat-password').val('');
    $('#phone-number').val('');
    $('#address').val('');
    $('#email').val('');

    $('#user-name-correct').show();
    $('#password-correct').show();
    $('#repeat-password-correct').show();
    $('#email-correct').show();

    $('#user-name-message').val('');
    $('#password-message').val('');
    $('#repeat-password-message').val('');
    $('#email-message').val('');
  });

  $('#submit-button').on('click', function () {

    var isCorrect = true;

    var $userNameMessage = $('#user-name-message');
    $userNameMessage.val('');

    var $userNameCorrect = $('#user-name-correct');


    var userName = $('#user-name').val().trim('');
    var userNameLength = userName.replace(/[^x00-xff]/g, '**').length;
    var userReg = new RegExp('[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b@]');

    if (userName === '') {
      isCorrect = false;
      $userNameMessage.val('用户名不能为空').show();
      $userNameCorrect.hide();

    } else if (userNameLength < 6 || userNameLength > 20) {
      isCorrect = false;
      $userNameMessage.val('用户名至少为6-20位字符').show();
      $userNameCorrect.hide();

    } else if (userReg.exec(userName)) {
      isCorrect = false;
      $userNameMessage.val('请输入正确格式的用户名').show();
      $userNameCorrect.hide();

    } else {
      isCorrect = verifyUserExisted(userName, $userNameMessage, $userNameCorrect);
    }

    var $passwordMessage = $('#password-message');
    $passwordMessage.val('');

    var $passwordCorrect = $('#password-correct');
    $passwordCorrect.show();


    var password = $('#password').val().trim('');
    var passwordReg = /^(\w){6,20}$/;

    var passwordSelectors = {

      message: $passwordMessage,
      correct: $passwordCorrect
    };
    isCorrect = commonVerifyRegular(password, passwordSelectors, PASSWORD_MESSAGES, !passwordReg.exec(password));

    var $repeatPasswordMessage = $('#repeat-password-message');
    $repeatPasswordMessage.val('');

    var $repeatPasswordCorrect = $('#repeat-password-correct');
    $repeatPasswordCorrect.show();

    var repeatPassword = $('#repeat-password').val().trim('');

    var repeatPasswordSelectors = {

      message: $repeatPasswordMessage,
      correct: $repeatPasswordCorrect
    };

    isCorrect = commonVerifyRegular(repeatPassword, repeatPasswordSelectors, REPEAT_PASSWORD_MESSAGES, repeatPassword !== password);

    var $emailMessage = $('#email-message');
    $emailMessage.val('');

    var $emailCorrect = $('#email-correct');


    var email = $('#email').val().trim('');
    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

    var emailSelectors = {

      message: $emailMessage,
      correct: $emailCorrect
    };

    isCorrect = commonVerifyRegular(email, emailSelectors, EMAIL_MESSAGES, !emailReg.exec(email));

    var address = $('#address').val().trim();
    var phoneNumber = $('#phone-number').val().trim();
    var createDate = moment().format('YYYY-MM-DD HH:mm:ss');

    if (isCorrect) {

      $.post('api/user',
        {
          name: userName,
          password: md5(password),
          address: address,
          phoneNumber: phoneNumber,
          createDate: createDate,
          email: email
        }).success(function() {

          $('#registermodal')
            .modal('show');
      });
    }
  });
});
