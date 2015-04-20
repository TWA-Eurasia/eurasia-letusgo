'use strict';
var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {

  if(sessionStorage.getItem('user')) {

    var currentUserId = sessionStorage.getItem('user');

    $.get('/api/user/' + currentUserId)
      .success(function(data) {

        $('#current-user').html(data.user.name).show();
      });
  }

  $('#login').on('click', function () {

    $('.userLogin')
      .modal('show');
  });

  $('#userLogin').on('click', function () {

    var userName = $('#user-name-login').val();
    var password = $('#password-login').val();

    $.post('/api/user/login', {username: userName, password: password}, function (data) {

      if (data.user) {
        $('.loginResult').html(data.message);
        $('.LoginSuccess').modal('show');

        sessionStorage.setItem('user', data.user._id);

        var currentUserId = sessionStorage.getItem('user');

        $.get('/api/user/' + currentUserId)
          .success(function(data) {

            $('#current-user').html(data.user.name).show();
          });

      } else {
        $('.loginResult').html(data.message);
        $('.LoginFailure').modal('show');
      }
    });
  });

  $('#confirm').on('click', function () {
    $('.LoginFailure').hide();
    $('.userLogin').modal('show');
  });
});

