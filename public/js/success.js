'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var JUMP_TIME = 3;

function jump(jumpTime) {

  window.setTimeout(function () {
    jumpTime--;

    if (jumpTime > 0) {
      $('#sec').text(jumpTime);
      jump(jumpTime);
    } else {
      location.href = '/';
    }
  }, 1000);
}

$(document).ready(function () {

   if(sessionStorage.getItem('user')) {
      $('#login').css('display', 'none');
      $('#register').css('display', 'none');
      $('#logout').css('display', 'block');
    }

  $.get('/api/indent', function (data) {

    var amount = data.total;
    $('#amount').text(amount);

    jump(JUMP_TIME);

  });

   $('#logout').on('click', function () {

      console.log('hsdfakjdshakf');
      sessionStorage.setItem('user', null);
      $('#login').css('display', 'block');
      $('#register').css('display', 'block');
      $('#logout').css('display', 'none');
      $('#current-user').html('').show();
   });
});
