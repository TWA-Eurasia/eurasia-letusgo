'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {


  $('#userName').on('change', function (){

    $('#userNameMessage').hide();

    var userName = $('#userName').val();
    var userNameReg = /^(\w){6,13}$/;

    if (!userNameReg.exec(userName)) {

      $('#userNameMessage').show();
    }
  });
  
  $('#submitButton').on('click', function (){

    var user = {
      userName: '',
      password: '',
      phoneNumber: '',
      address: '',
      email: ''
    };

    var userName = $('#userName').val();
    var password = $('#password').val();
    var repeatPassword = $('#repeatPassword').val();
    var phoneNumber = $('#phoneNumber').val();
    user.phoneNumber = phoneNumber;
    var address = $('#address').val();
    user.address = address;
    var email = $('#email').val();
    user.email = email;

    if(repeatPassword === password) {
      user.password = password;
    } else {
      console.log('false');
    }

    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    var userNameReg = /^(\w){6,13}$/;
    if (userNameReg.exec(userName)) {
      user.userName = userName;
    } else {
      $('#userNameMessage').show();
    }


    //if (emailReg.exec(email)) {
    //}

    console.log(user.userName + user.password + user.email);
  });

});
