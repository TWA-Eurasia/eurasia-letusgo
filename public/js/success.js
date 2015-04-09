'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var JUMP_TIME =3;

$(document).ready(function () {

  $.get('/api/indent', function(data){

    var amount = data.total;
    $('#amount').text(amount);

    jump(JUMP_TIME);

  });
});

function jump(count) {

  window.setTimeout(function () {
    count--;

    if (count > 0) {
      $('#sec').text(count);
      jump(count);
    } else {
      location.href = "/";
    }
  }, 1000);
}
