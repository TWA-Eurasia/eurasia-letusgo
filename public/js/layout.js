'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {
  $('#logout').on('click', function () {

    sessionStorage.removeItem('user');
    $('#login').css('display', 'block');
    $('#register').css('display', 'block');
    $('#logout').css('display', 'none');
    $('#current-user').html('').show();
  });
})
