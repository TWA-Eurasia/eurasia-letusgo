'use strict';
var $ = require('jquery');

$(document).ready(function() {
  function jump(count) {

    window.setTimeout(function() {
      count--;

      if(count > 0) {
        $('#sec').text(count);
        jump(count);
      } else {
        location.href="/helloWorld";
      }
    }, 1000);
  }
  jump(3);
});



