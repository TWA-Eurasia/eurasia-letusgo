var $ = require('jquery');

$(document).ready(function () {

  $('i.minus').on('click',function () {
    
    $('#numberInput').val($('#numberInput').val() -1);
  });
});
