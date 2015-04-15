'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

function showMessage(value, valueReg, selector, message1, message2) {

  if (value === '') {

    $(selector).html(message1).show();

  } else if (!valueReg.exec(value)) {

    $(selector).html(message2).show();
  }
}

$(function () {

  $('#userName').on('blur', function () {

    $('#userNameMessage').hide();

    var userName = $('#userName').val();
    var userNameLength = userName.replace(/[^x00-xff]/g,'**').length;

    if (userName === '') {

      $('#userNameMessage').html('用户名不能为空').show();

    } else if (userNameLength < 6 || userNameLength > 20) {

      $('#userNameMessage').html('用户名至少为6-20位字符').show();
    }
  });

  $('#password').on('blur', function (){

    $('#passwordMessage').hide();

    var password = $('#password').val();
    var passwordReg = /^(\w){6,20}$/;

    if (password === '') {

      $('#passwordMessage').html('密码不能为空').show();

    } else if (!passwordReg.exec(password)) {

      $('#passwordMessage').html('密码至少为6-20位字符').show();
    }
  });

  $('#repeatPassword').on('blur', function (){

    $('#repeatPasswordMessage').hide();

    var password = $('#password').val();
    var repeatPassword = $('#repeatPassword').val();

    if (repeatPassword === '') {

      $('#repeatPasswordMessage').html('重复密码不能为空').show();

    } else if (repeatPassword !== password) {

      $('#repeatPasswordMessage').html('用户两次密码输入不一致').show();
    }
  });


  $('#email').on('blur', function (){

    $('#emailMessage').hide();

    var email = $('#email').val();
    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    var MESSAGE1 = '邮箱不能为空';
    var MESSAGE2 = '请填写正确邮箱的格式';

    showMessage(email, emailReg, '#emailMessage', MESSAGE1, MESSAGE2);

    //if (email === '') {
    //
    //  $('#emailMessage').html('邮箱不能为空').show();
    //
    //} else if (!emailReg.exec(email)) {
    //
    //  $('#emailMessage').html('请填写正确邮箱的格式').show();
    //}
  });

  $('#resetButton').on('click', function() {

    $('#userName').val('');
    $('#password').val('');
    $('#repeatPassword').val('');
    $('#phoneNumber').val('');
    $('#address').val('');
    $('#email').val('');
  });

  $('#submitButton').on('click', function() {

    var isCorrect = true;

    //var userName = $('#userName').val();
    //var password = $('#password').val();
    //var repeatPassword = $('#repeatPassword').val();
    //var phoneNumber = $('#phoneNumber').val();
    //var address = $('#address').val();
    //var email = $('#email').val();

    //$('#userNameMessage').hide();
    //
    //var userNameLength = userName.replace(/[^x00-xff]/g,'**').length;
    //
    //if (userName === '') {
    //
    //  $('#userNameMessage').html('用户名不能为空').show();
    //  isCorrect = false;
    //
    //} else if (userNameLength < 6 || userNameLength > 20) {
    //
    //  $('#userNameMessage').html('用户名至少为6-20位字符').show();
    //  isCorrect = false;
    //}

    //$('#passwordMessage').hide();
    //
    //var passwordReg = /^(\w){6,20}$/;
    //
    //if (password === '') {
    //
    //  $('#passwordMessage').html('密码不能为空').show();
    //  isCorrect = false;
    //
    //} else if (!passwordReg.exec(password)) {
    //
    //  $('#passwordMessage').html('密码至少为6-20位字符').show();
    //  isCorrect = false;
    //}

    //$('#repeatPasswordMessage').hide();
    //
    //if (repeatPassword === '') {
    //
    //  $('#repeatPasswordMessage').html('重复密码不能为空').show();
    //  isCorrect = false;

    //} else if (repeatPassword !== password) {
    //
    //  $('#repeatPasswordMessage').html('用户两次密码输入不一致').show();
    //  isCorrect = false;
    //}
    //
    //$('#emailMessage').hide();
    //
    //var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    //
    //if (email === '') {
    //
    //  $('#emailMessage').html('邮箱不能为空').show();
    //  isCorrect = false;
    //
    //} else if (!emailReg.exec(email)) {
    //
    //  $('#emailMessage').html('请填写正确邮箱的格式').show();
    //  isCorrect = false;
    //}

    if(isCorrect) {
      $('.ui.second.modal')
        .modal('show');
      console.log('success');
    }

  });

});
