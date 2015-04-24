'use strict';

var $ = require('jquery');
var md5 = require('MD5');

require('github/ziyiking/Semantic-UI@master/dist/semantic');

var LOGOUT_SUCCESS = '退出成功';
$('.modal')
  .modal({
    selector: {close: '.close'},
    closable: false
  });

$(function () {

  var currentUserName = $('#current-user').text();

  var $login = $('#login');
  var $logout = $('#logout');
  var $register = $('#register');
  var $myCart = $('#my-cart');

  if(currentUserName !== '') {

    $login.hide();
    $register.hide();
    $logout.show();
    $myCart.show();
  }

  $login.on('click', function () {

    $('.user-login-modal')
      .modal('show');

    $('#login-result').hide();
  });

  $('#user-login').on('click', function () {

    var userName = $('#user-name-login').val();
    var password = $('#password-login').val();

    $.post('/api/sessions', {username: userName, password: md5(password)}, function (data) {
      if (data.state === 200) {

        $login.hide();
        $register.hide();
        $logout.show();
        $myCart.show();
        $('.user-login-modal').modal('hide');
        $('#current-user').html(data.data).show();

        $('#login-success').html(data.message);
        $('#login-tips').show().fadeOut(2000);
      } else {
        $('#login-result').html(data.message).show();
      }
    });
  });


  $logout.on('click', function () {
    $.ajax({
      url: '/api/sessions',
      type: 'DELETE',
      success: function(data){

        if(data.message) {
          $('#logout-success').html(LOGOUT_SUCCESS).show();
          $('#logout-tips').show().fadeOut(2000);
        }
      }
    });

    $login.show();
    $register.show();
    $logout.hide();
    $myCart.hide();
    $('#current-user').html('').show();
  });
});

