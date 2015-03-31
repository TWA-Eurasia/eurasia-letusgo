var $ = require('jquery');

$(document).ready(function () {

  $('i.minus').on('click',function () {

    var numberInput = parseInt($('#numberInput').val());

    if (numberInput !== 1) {
      $('#numberInput').val(numberInput - 1);
    }
  });

  $('i.add').on('click',function () {

    var numberInput = parseInt($('#numberInput').val());

    $('#numberInput').val(numberInput + 1);
  });

  $('#numberInput').on('mouseout', function () {

    var numberInput = $('#numberInput').val();

    var reg = /^(0|[1-9][0-9]*)$/;
    if(!reg.exec(numberInput)){
      $('#numberInput').val(1);
    }

    var number = parseInt($('#numberInput').val());
    var leftNumber = $('#leftNumber').text();
    console.log(leftNumber);

    if(number > leftNumber) {
      $('#numberInput').val(leftNumber);
    }
  });

});
