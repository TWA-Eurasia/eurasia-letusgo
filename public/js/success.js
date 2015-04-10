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
      location.href = "/";
    }
  }, 1000);
}

$(document).ready(function () {

  $.get('/api/indent', function (data) {

    var amount = data.total;
    $('#amount').text(amount);

    jump(JUMP_TIME);

  });
});
