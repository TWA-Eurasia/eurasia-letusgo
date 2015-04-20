'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var deleteCartItem;
var MAX_CART_AMOUNT = 99;

$(function () {

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
        input.closest('tr').find('#subtotal').text(data.subtotal);
        $('#total').text(data.total);
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

  $('img')
    .error(function () {
      $(this).attr('src', '/image/missing.jpg');
    })
    .attr('src', function () {
      return $(this).data('src');
    });

  $('#allChecked').on('change', function () {

    $('input[name="checkedCartItem"]').prop('checked', this.checked);

  });

  $('.checkedCartItem').on('blur', function () {

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

  $('#indent').on('click', function() {

    if(!sessionStorage.getItem('user')) {

      $('.user-login')
        .modal('show');
    } else {

      $.post('/api/user').success(function() {

      });
    }
  });

  $('#user-login').on('click', function () {

    var userName = $('#user-name-login').val();
    var password = $('#password-login').val();

    $.post('/api/user/login', {username: userName, password: password}, function (data) {

      if (data.user) {
        $('.loginResult').html(data.message);
        $('.LoginSuccess').modal('show');

        sessionStorage.setItem('user', data.user._id);

        var currentUserId = sessionStorage.getItem('user');

        $.get('/api/user/' + currentUserId)
          .success(function(data) {

            $('#current-user').html(data.user.name).show();
          });

      } else {
        $('.loginResult').html(data.message);
        $('.LoginFailure').modal('show');
      }
    });
  });
});
