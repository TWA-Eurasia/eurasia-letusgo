'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var delete_cartItem;
var MAX_CART_AMOUNT = 99;

$(function () {

  function changeTotal(jQ_DOM) {
    var id = jQ_DOM.closest('tr').data('id');
    var num = jQ_DOM.closest('td').find('#number').val();
    var price = jQ_DOM.parents('td').prev().find('#price').text();
    var total = $('#total').text();
    var input = jQ_DOM;

    $.ajax({
      url: 'cart/' + id,
      type: 'PUT',
      data: {number: num, price: price, total: total},

      success: function (data) {
        input.closest('tr').find('#subtotal').text(data.subtotal);
        $('#total').text(data.total);
      }
    })
  }

  function verifyNumber(number, input) {

    var reg = /^(0|[1-9][0-9]*)$/;
    if (!reg.exec(number)) {
      input.val(1);
    }
  }

  function isShorted(input) {

    var inputNumber = parseInt(input.closest('td').find('#number').val());
    var leftNumber = $('#leftNumber').text();

    return inputNumber > leftNumber
  }

  function getCartItemInventory(jQ_DOM, callback) {
    var id = jQ_DOM.closest('tr').data('id');

    $.get('/cart/cartItems/' + id, function (data) {
      callback(data);
      return data;
    });
  }

  function countCartAmount() {

    $.ajax({
      url: '/cart/:amount',
      type: 'GET',

      success: function (data) {
        if (MAX_CART_AMOUNT < parseInt(data.amount)) {
          data.amount = '99+';
        }
        $('#cart-amount').text(data.amount);
      }
    })
  }

  $(document).on('cart-count-change', function (event, cartId) {
    $.ajax({
      url: 'cart' + cartId,
      type: 'GET',

      success: function (data) {
        $(".nav-cart-count").text(data);
      }
    });
  });

  $('img')
    .error(function () {
      $(this).attr('src', '/image/missing.jpg')
    })
    .attr('src', function () {
      return $(this).data('src');
    });

  $('#allChecked').on('change', function () {

    var checkboxes = $('input[name="checkedCartItem"]');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = this.checked;
    }

  });

  $('.checkedCartItem').on('change', function () {

    var isChecked = $(this).prop('checked');
    if (!isChecked) {
      $('#allChecked').prop('checked', false);
    }

    var isAllChecked = true;
    var checkboxes = $('input[name="checkedCartItem"]');

    for (var i = 0; i < checkboxes.length; i++) {
      isAllChecked = checkboxes[i].checked;
      if (!isAllChecked) {
        return;
      }
    }

    if (isAllChecked) {
      $('#allChecked').prop('checked', true);
    }
  });

  $('.reduce').on('click', function () {
    var inputDom = $(this).closest('td').find('#number');
    var numberInput = parseInt(inputDom.val());

    if (numberInput !== 1) {
      inputDom.val(numberInput - 1);
      changeTotal($(this));
    }
    countCartAmount();
  });

  $('.increase').on('click', function () {
    var self = this;
    var inputDom = $(this).closest('td').find('#number');
    var numberInput = parseInt(inputDom.val());

    var inventory = $('#leftNumber').text();

    getCartItemInventory($(this), function (data) {
      if (data.inventory > numberInput) {
        inputDom.val(numberInput + 1);
        changeTotal($(self));
      }
      countCartAmount();
    });
  });

  $('input').on('keyup', function () {

    $(this).closest('td').find('#inventory').hide();

    var numberInput = $(this).closest('td').find('#number').val();
    //numberInput = numberInput.toString();

    var number = numberInput.replace(/\b(0+)/gi, '');
    var input = $(this);

    verifyNumber(number, input);
    changeTotal(input);
    if (isShorted(input)) {
      $(this).closest('td').find('#inventory').show();
    } else {
      countCartAmount();
    }
  });

  $('.delete_cartItem').on('click', function () {

    delete_cartItem = this;

    $('.first.modal')
      .modal('show');
  });

  $('.yes').on('click', function () {

    var deleteId = delete_cartItem.closest('td').id;

    $.ajax({
      url: 'cart/' + deleteId,
      type: 'DELETE',

      success: function (data) {
        $('.delete-message').show();
        $(delete_cartItem.closest('tr').remove());

        window.setTimeout(function () {
          $('.delete-message').hide();
        }, 1000);

        $("#total").text(data.total);

      }
    })
  });

  $('.itemName').popup({
    content: $(this).prop("data-content")
  });

  countCartAmount();
});
