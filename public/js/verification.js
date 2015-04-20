'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function() {
  $.post('/verification/login',function (data) {
    $('#userName').html(data.user.name);
  });
});
