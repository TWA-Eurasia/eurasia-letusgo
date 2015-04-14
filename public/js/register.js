'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {


  $('#userName').on('blur', function () {

    $('#userNameMessage').hide();

    var userName = $('#userName').val();
    var userNameLength = userName.replace(/[^x00-xff]/g,'**').length;

    if (userName === '') {

      $('#userNameMessage').html('用户名不能为空');
      $('#userNameMessage').show();

    } else if (userNameLength < 6 || userNameLength > 20) {

      $('#userNameMessage').html('用户名至少为6-20位字符');
      $('#userNameMessage').show();
    }
  });

  $('#password').on('blur', function (){

    $('#passwordMessage').hide();

    var password = $('#password').val();
    var passwordReg = /^(\w){6,20}$/;

    if (password === '') {

      $('#passwordMessage').html('密码不能为空');
      $('#passwordMessage').show();

    } else if (!passwordReg.exec(password)) {

      $('#passwordMessage').html('密码至少为6-20位字符');
      $('#passwordMessage').show();
    }
  });

  $('#repeatPassword').on('blur', function (){

    $('#repeatPasswordMessage').hide();

    var password = $('#password').val();
    var repeatPassword = $('#repeatPassword').val();

    if (repeatPassword === '') {

      $('#repeatPasswordMessage').html('重复密码不能为空');
      $('#repeatPasswordMessage').show();

    } else if (repeatPassword !== password) {

      $('#repeatPasswordMessage').html('用户两次密码输入不一致');
      $('#repeatPasswordMessage').show();
    }
  });

  $('#email').on('blur', function (){

    $('#emailMessage').hide();

    var email = $('#email').val();
    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;

    if (email === '') {

      $('#emailMessage').html('邮箱不能为空');
      $('#emailMessage').show();

    } else if (!emailReg.exec(email)) {

      $('#emailMessage').html('请填写正确邮箱的格式');
      $('#emailMessage').show();
    }
  });

  $('#resetButton').on('click', function() {

    $('#userName').val('');
    $('#password').val('');
    $('#repeatPassword').val('');
    $('#phoneNumber').val('');
    $('#address').val('');
    $('#email').val('');
  });
});
