'use strict';
var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {
  console.log('aaaaaaaaaa');
  $('#logout').on('click', function () {

    console.log('bbbbbbbb');
    sessionStorage.setItem('user', null);
    $('#login').css('display', 'block');
    $('#register').css('display', 'block');
    $('#logout').css('display', 'none');
//    $('#current-user').html('').show();
  });
});
