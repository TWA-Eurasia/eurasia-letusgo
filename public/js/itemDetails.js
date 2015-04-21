'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');
var MAX_CART_AMOUNT = 99;

$(function () {

   if(sessionStorage.getItem('user')) {
      $('#login').css('display', 'none');
      $('#register').css('display', 'none');
      $('#logout').css('display', 'block');
    }

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

  function countCartAmount() {

    $.ajax({
      url: '/cart/amount',
      type: 'GET',

      success: function (data) {
        if (MAX_CART_AMOUNT < parseInt(data.amount)) {
          data.amount = '99+';
        }
        $('#cart-amount').text(data.amount);
      }
    });
  }

  $('img')
    .error(function () {
      $(this).attr('src', '/image/missing1.png');
    })
    .attr('src', function () {
      return $(this).data('src');
    });

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

  $('#numberInput').on('change', function () {
    $('#inputError').hide();
    var numberInput = $('#numberInput').val();
    var number = numberInput.replace(/\b(0+)/gi, '');

    $('#numberInput').val(number);
    verifyNumber(number);

    if (isShorted()) {
      $('#inputError').show();
      $('.addToCart').addClass('disabled');
      return;
    }
    $('.addToCart').removeClass('disabled');

  });

  $('input.specification').on('click', function () {
    var price = $(this).data('price');
    var inventory = $(this).data('inventory');

    $('#itemPrice').text(price);
    $('#inventory').text(inventory);
  });

  $('.addToCart').on('click', function () {

    var itemId = $(this).data('id');

    var numberInput = parseInt($('#numberInput').val());

    $.ajax({
      url: '/cart/' + itemId,
      type: 'POST',
      data: {number: numberInput},
      success: function () {
        countCartAmount();
        $('#add-success').show();

        window.setTimeout(function () {
          $('#add-success').hide();
        }, 1000);
      }
    });
  });

   $('#logout').on('click', function () {

      sessionStorage.removeItem('user');
      $('#login').css('display', 'block');
      $('#register').css('display', 'block');
      $('#logout').css('display', 'none');
      $('#current-user').html('').show();
    });
});
