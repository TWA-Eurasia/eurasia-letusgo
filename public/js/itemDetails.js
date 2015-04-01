var $ = require('jquery');
require('semantic-ui');

$(document).ready(function () {

  setHref();
  $('i.minus').on('click',function () {

    var numberInput = parseInt($('#numberInput').val());

    if (numberInput !== 1) {
      $('#numberInput').val(numberInput - 1);
    }
  });

  $('i.add').on('click',function () {

    var numberInput = parseInt($('#numberInput').val());

    var leftNumber = $('#leftNumber').text();

    if(leftNumber > numberInput){

      $('#numberInput').val(numberInput + 1);
    }
  });

  $('#numberInput').on('mouseout', function () {

    $('#inputError').hide();

    var numberInput = $('#numberInput').val();
    var number = numberInput.replace(/\b(0+)/gi, '');
    $('#numberInput').val(number);

    verifyNumber(number);

    if(isShorted()){
      $('#inputError').show();
    }
  });

  $('#specification').on('change', function () {

    var specification = $('#specification').val();
    var price = $('#' + specification).data('price');

    $('#itemPrice').text(price);
  });

  function verifyNumber(number){

    var reg = /^(0|[1-9][0-9]*)$/;

    if(!reg.exec(number)){
      $('#numberInput').val(1);
    }
  }

  function isShorted(){

    var inputNumber = parseInt($('#numberInput').val());
    var leftNumber = $('#leftNumber').text();

    if(inputNumber > leftNumber) {
      return true;
    }

    return false;
  }

  function setHref() {


    var href = location.pathname;
    var array = href.split('/');
    var childId = array[2];

    $.get('/api/category/' + childId, function(parentId){

      // $('#parent').attr('href','#');
      // $('#child').attr('href','#');
    });
  }
});
