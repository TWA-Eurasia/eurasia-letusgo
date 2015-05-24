'use strict';

var $ = require('jquery');
var moment = require('moment');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var deleteCartItem;
var MAX_CART_AMOUNT = 99;

$(function () {
  var totalAmount = $('#total').text();

  function changeTotal(jqDom) {
    var id = jqDom.closest('tr').data('id');
    var num = jqDom.closest('td').find('.number').val();
    var price = jqDom.parents('td').prev().find('#price').text();
    var total = $('#total').text();
    var input = jqDom;

    $.ajax({
      url: 'cart/' + id,
      type: 'PUT',
      data: {number: num, price: price, total: total},

      success: function (data) {
        input.closest('tr').find('.subtotal').text(data.subtotal);
        var isChecked = input.closest('td').next().next().next().find('.checkedCartItem').prop('checked');
        if (isChecked) {
          $('#total').text(data.total);
        }
      }
    });
  }

  function verifyNumber(number, input) {

    var reg = /^(0|[1-9][0-9]*)$/;
    if (!reg.exec(number)) {
      input.val(1);
    }
  }

  function isShorted(input) {

    var inputNumber = parseInt(input.closest('td').find('.number').val());
    var leftNumber = input.closest('td').find('.leftNumber').text();

    return inputNumber > leftNumber;
  }

  function getCartItemInventory(jqDom, callback) {
    var id = jqDom.closest('tr').data('id');

    $.get('/cart/cartItems/' + id, function (data) {
      callback(data);
    });
  }

  function countCartAmount() {
    $.get('/cart/amount', function (data) {
      if (MAX_CART_AMOUNT < parseInt(data.amount)) {
        data.amount = '99+';
      }
      $('#cart-amount').text(data.amount);
    });
  }
  //$('img')
  //  .error(function () {
  //    $(this).attr('src', '/image/missing1.png');
  //  })
  //  .attr('src', function () {
  //    return $(this).data('src');
  //  });

  $('#allChecked').ready(function () {
    var checkboxesSize = $('.checkedCartItem').length;

    if (checkboxesSize === 0) {
      $('#allChecked').prop('checked','');
    } else {
      $('#allChecked').prop('checked','true');
    }

  });

  $('#allChecked').on('click', function () {

    $('input[name="checkedCartItem"]').prop('checked', this.checked);
    $('#total').text(this.checked ? totalAmount : 0);
  });

  function getCheckedIds() {
    var checkboxes = $('.checkedCartItem');
    var cartItemIds = [];

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        cartItemIds.push(checkboxes[i].id);
      }
    }

    return cartItemIds;
  }

  $('.checkedCartItem').on('click', function () {

    var subtotal = $(this).closest('td').prev().prev().find('.subtotal').text();
    var total = $('#total').text();

    var checkboxesSize = $('.checkedCartItem').length;
    var checkedBoxesSize = $('.checkedCartItem:checked').length;

    $('#allChecked').prop('checked', checkboxesSize === checkedBoxesSize);

    if ($(this).prop('checked')) {
      total = parseInt(total) + parseInt(subtotal);
    } else {
      total = parseInt(total) - parseInt(subtotal);
    }

    $('#total').text(total.toFixed(2));
  });

  $('.reduce').on('click', function () {

    var inputDom = $(this).closest('td').find('.number');
    var numberInput = parseInt(inputDom.val());

    if (numberInput !== 1) {
      inputDom.val(numberInput - 1);
      changeTotal($(this));
    }

    countCartAmount();
  });

  $('.increase').on('click', function () {

    var $this = $(this);
    var inputDom = $this.closest('td').find('.number');
    var numberInput = parseInt(inputDom.val());

    getCartItemInventory($this, function (data) {

      if (data.inventory > numberInput) {

        inputDom.val(numberInput + 1);
        changeTotal($($this));
      }

      countCartAmount();
    });
  });

  $('.number').on('change', function () {

    var $this = $(this);
    $this.closest('td').find('.inventory').hide();

    var numberInput = $this.closest('td').find('.number');

    var number = parseInt(numberInput.val());
    numberInput.val(number);

    verifyNumber(number, $this);

    if (isShorted($this)) {

      $this.closest('td').find('.inventory').show();
      $('#indent').addClass('disabled');
      return;
    }

    $('#indent').removeClass('disabled');

    changeTotal($this);
    countCartAmount();
  });

  $('.delete_cartItem').on('click', function () {

    deleteCartItem = this;

    $('.delete-modal')
      .modal('show');
  });

  $('.yes').on('click', function () {

    var deleteId = deleteCartItem.closest('td').id;

    $.ajax({
      url: 'cart/' + deleteId,
      type: 'DELETE',

      success: function (data) {

        $('.delete-modal').modal('hide');
        $('.delete-message').show();

        $(deleteCartItem.closest('tr').remove());

        window.setTimeout(function () {

          $('.delete-message').hide();
        }, 1000);

        $('#total').text(data.total);
        countCartAmount();
      }
    });
  });

  $('.itemName').popup({
    content: $(this).prop('data-content')
  });

  countCartAmount();

  $('#indent').on('click', function () {

    var cartItemIds = getCheckedIds();
    var createDate = moment().format('YYYY-MM-DD HH:mm:ss');

    $.post('/api/indent',
      {
        user: '',
        cartItems: cartItemIds,
        createDate: createDate,
        isPaid: false
      }).success(function (err, data) {

        if (data) {
          location.href = '/indent';
        }
    });
  });

  $('img')
    .error(function () {
      $(this).attr('src', '/image/missing1.png');
    })
    .attr('src', function () {
      return $(this).data('src');
    });

});
