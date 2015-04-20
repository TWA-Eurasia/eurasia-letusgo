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

    $('.user-login-modal')
      .modal('show');

    $('#login-result').html('');
  });

  $('#user-login').on('click', function () {

    var userName = $('#user-name-login').val();
    var password = $('#password-login').val();

    $.post('/api/user/login', {username: userName, password: password}, function (data) {

      if (data.user) {
        sessionStorage.setItem('user', data.user._id);

        var currentUserId = sessionStorage.getItem('user');
        $('#login').css('display', 'none');
        $('#register').css('display', 'none');
        $('#logout').css('display', 'block');

        $.get('/api/user/' + currentUserId)
          .success(function(data) {

            $('#current-user').html(data.user.name).show();

          });

        $('.user-login-modal').modal('hide');
        $('#login-success').html(data.message);
        $('#tips').show().fadeOut(2000);

      } else {
        $('#login-result').html(data.message).show();
      }
    });
  });
});

