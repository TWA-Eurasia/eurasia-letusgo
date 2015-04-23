'use strict';

var $ = require('jquery');
var md5 = require('MD5');

require('github/ziyiking/Semantic-UI@master/dist/semantic');

$('.modal')
  .modal({
    selector: {
      close: 'icon.close'
    }
  });

$(function () {

  $('#login').on('click', function () {

    $('.user-login-modal')
      .modal('show');

    $('#login-result').hide();
  });

  $('#user-login').on('click', function () {

    var userName = $('#user-name-login').val();
    var password = $('#password-login').val();

    $.post('/api/sessions', {username: userName, password: md5(password)}, function (data) {

      if (data.data) {

        $('#login').css('display', 'none');
        $('#register').css('display', 'none');
        $('#logout').css('display', 'block');


        $('.user-login-modal').modal('hide');
        $('#current-user').html(data.data).show();

        $('#login-success').html(data.message);
        $('#tips').show().fadeOut(2000);
      } else {

        $('#login-result').html(data.message).show();
      }
    });
  });


  $('#logout').on('click', function () {
    $.ajax({
      url: '/api/sessions/',
      type: 'DELETE',
      success: function(data){
        console.log(data);
      }
    });

    $('#login').css('display', 'block');
    $('#register').css('display', 'block');
    $('#logout').css('display', 'none');
    $('#current-user').html('').show();
  });
});

