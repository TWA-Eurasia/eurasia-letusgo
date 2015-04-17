'use strict';
var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {

  $('#login').on('click', function() {

    $('.userLogin')
      .modal('show');
  });

  $('#userLogin').on('click', function() {

    var userName = $('#user-name-login').val();
    var password = $('#password-login').val();

    $.post('/api/user/login', {username: userName, password: password}, function(data) {

      if(data.user) {
        $('.loginResult').html(data.message);
        $('.LoginSuccess').modal('show');
      } else {
        $('.loginResult').html(data.message);
        $('.LoginFailure').modal('show');
      }
    });
  });

  $('#confirm').on('click', function() {
    $('.LoginFailure').hide();
    $('.userLogin').modal('show');
  });
});

