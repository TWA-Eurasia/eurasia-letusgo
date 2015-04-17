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

        $('#isUserName').html(data.user.name);
        $('.userLogin').modal('hide');
        $('#tips').popup({
          delay: {
            show: 300,
            hide: 1000
          }
        });
      } else {
        $('#loginResult').html(data.message).show();
      }
    });
  });
});

