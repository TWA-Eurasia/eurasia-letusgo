'use strict';
var $ = require('jquery');

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var amount = getParameterByName('amount');
$('#amount').text(amount);

$(document).ready(function () {


  function jump(count) {

    window.setTimeout(function () {
      count--;

      if (count > 0) {
        $('#sec').text(count);
        jump(count);
      } else {
        location.href = "/helloWorld";
      }
    }, 1000);
  }

  jump(3);
});



