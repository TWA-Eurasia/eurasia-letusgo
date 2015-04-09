var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(document).ready(function () {
  $( "img" )
    .error(function() {
      $( this ).hide();
    })
    .attr( "src", "../image/missing.jpg" );

  $('i.minus').on('click', function () {
    var numberInput = parseInt($('#numberInput').val());
    if (numberInput !== 1) {
      $('#numberInput').val(numberInput - 1);
    }
  });

  $('i.add').on('click', function () {
    var numberInput = parseInt($('#numberInput').val());
    var inventory = $('#inventory').text();

    if (inventory > numberInput) {
      $('#numberInput').val(numberInput + 1);
    }
  });

  $('#numberInput').on('mouseout', function () {
    $('#inputError').hide();
    var numberInput = $('#numberInput').val();
    var number = numberInput.replace(/\b(0+)/gi, '');

    $('#numberInput').val(number);
    verifyNumber(number);

    if (isShorted()) {
      $('#inputError').show();
    }
  });

  $('input.specification').on('click', function () {
    var price = $(this).data('price');
    var inventory = $(this).data('inventory');

    $('#itemPrice').text(price);
    $('#inventory').text(inventory);
  });

  function verifyNumber(number) {
    var reg = /^(0|[1-9][0-9]*)$/;
    if (!reg.exec(number)) {
      $('#numberInput').val(1);
    }
  }

  function isShorted() {
    var inputNumber = parseInt($('#numberInput').val());
    var inventory = $('#inventory').text();
    return inputNumber > inventory;
  }


  $('.addToCart').on('click', function () {

    var itemId = $(this).data('id');

    var numberInput = parseInt($('#numberInput').val());
    $.ajax({
      url: '../cart/' + itemId,
      type: 'POST',
      data: {number: numberInput},
      success: function () {

        $('.success').show();
        function jump(count) {

          window.setTimeout(function () {
            count--;

            if (count > 0) {
              $('.success').show();
              jump(count);
            } else {
              $('.success').hide();

            }
          }, 1000);
        }
      jump(1);
      }
    })
  });
});
