'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function() {

  var userName = $('#user-name').text();

  $.post('/verification/' + userName)
    .success(function(data) {

      $('#current-user').html(data.user.name).show();
      $('#login').hide();
      $('#register').hide();
      $('#logout').show();
    });

});
