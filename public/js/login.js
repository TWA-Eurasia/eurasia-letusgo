'use strict';
var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$('.modal')
  .modal({
    selector: {
      close: 'icon.close'
    }
  })
;

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
    $('#loginResult').html('');
  });

  $('#userLogin').on('click', function () {

    var userName = $('#user-name-login').val();
    var password = $('#password-login').val();

    $.post('/api/user/login', {username: userName, password: password}, function (data) {

      if (data.user) {
        sessionStorage.setItem('user', data.user._id);

        var currentUserId = sessionStorage.getItem('user');

        $.get('/api/user/' + currentUserId)
          .success(function(data) {

            $('#current-user').html(data.user.name).show();
          });

        $('.userLogin').modal('hide');
        $('#loginSuccess').html(data.message);
        $('#tips').show().fadeOut(2000);


      } else {
        $('#loginResult').html(data.message).show();
      }
    });
  });
});

