'use strict';

var $ = require('jquery');

require('github/ziyiking/Semantic-UI@master/dist/semantic');

var LOGOUT_SUCCESS = '退出成功';
var MAX_CART_AMOUNT = 99;

$('.modal')
  .modal({
    selector: {close: '.close'},
    closable: false
  });

$(function () {

  function countCartAmount() {
    $.get('/cart/amount', function (data) {
      if (MAX_CART_AMOUNT < parseInt(data.amount)) {
        data.amount = '99+';
      }

      $('#cart-amount').text(data.amount);
    });
  }

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

  $('img')
    .error(function () {
      $(this).attr('src', '/image/missing1.png');
    })
    .attr('src', function () {
      return $(this).data('src');
    });

  $login.on('click', function () {

    $('.user-login-modal')
      .modal('show');

    $('#login-result').hide();
  });

  $('#user-login').on('click', function () {

    var userName = $('#user-name-login').val();
    var password = $('#password-login').val();

    $.post('/api/sessions', {username: userName, password: password}, function (resp) {

      if(resp.state === 401) {
        $('#login-result').html(resp.message).show();
      } else if(resp.data.role === 'admin') {
        location.href = '/admin/index';
      } else {

        $login.hide();
        $register.hide();
        $logout.show();
        $myCart.show();

        countCartAmount();
        $('.user-login-modal').modal('hide');
        $('#current-user').html(resp.data).show();
        $('#login-success').html(resp.message);
        $('#login-tips').show().fadeOut(2000);
      }
    });
  });

  $('#admin-logout').on('click', function() {
    $.ajax({
      url: '/api/sessions',
      type: 'DELETE',
      success: function(data){

        if(data.state === 200) {
          location.href = '/';
        }
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

