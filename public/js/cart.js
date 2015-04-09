'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var delete_cartItem;
var JUMP_TIME = 1;

$(document).ready(function () {

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
    .error(function() {
      $(this).attr('src', '/image/missing.jpg')
    })
    .attr( 'src', function () {
      return $(this).data('src');
    });

  function changetotal(event) {
    var id = event.closest('tr').data('id');
    var num = event.closest('td').find('#number').val();
    var price = event.parents('td').prev().find('#price').text();
    var total = $('#total').text();
    var input = event;

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

  $('#allChecked').on('change', function() {

    var checkboxes = $('input[name="checkedCartItem"]');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = this.checked;
    }

  });

  $('.checkedCartItem').on('change', function() {

    var isChecked = $(this).prop('checked');
    if(!isChecked) {
      $('#allChecked').prop('checked', false);
    }

    var isAllChecked = true;
    var checkboxes = $('input[name="checkedCartItem"]');

    for(var i = 0; i < checkboxes.length; i++) {
      isAllChecked = checkboxes[i].checked;
      if(!isAllChecked) {
        return;
      }
    }

    if(isAllChecked) {
      $('#allChecked').prop('checked', true);
    }
  });

  $('i.minus.square.icon').on('click', function () {

    var numberInput = parseInt($(this).closest('td').find('#number').val());

    if (numberInput !== 1) {
      $(this).closest('td').find('#number').val(numberInput - 1);
      changetotal($(this));
    }
  });

  $('i.add.square.icon').on('click', function () {


    var numberInput = parseInt($(this).closest('td').find('#number').val());

    var inventory = $('#leftNumber').text();

    if (inventory > numberInput) {
      $(this).closest('td').find('#number').val(numberInput + 1);
      changetotal($(this));
    }


  });

  $('input').on('keyup', function () {

    $(this).closest('td').find('#inventory').hide();

    var numberInput = $(this).closest('td').find('#number').val();
    //numberInput = numberInput.toString();

    var number = numberInput.replace(/\b(0+)/gi, '');
    var input = $(this);

    verifyNumber(number,input);
    changetotal(input);
    if (isShorted(input)) {
      $(this).closest('td').find('#inventory').show();
    }
  });

  function verifyNumber(number,input) {

    var reg = /^(0|[1-9][0-9]*)$/;
    if (!reg.exec(number)) {
      input.val(1);
    }
  }

  function isShorted(input) {

    var inputNumber = parseInt(input.closest('td').find('#number').val());
    var leftNumber = $('#leftNumber').text();

    if (inputNumber > leftNumber) {
      return true;
    }

    return false;
  }


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

        $(delete_cartItem.closest('tr')).replaceWith(
          "<tr><td colspan='7'> " + "<div class='ui teal message delete-massage'>" + "删除成功" + "</div></td></tr>");

        $("#total").text(data.total);

        jump(JUMP_TIME, delete_cartItem);
      }
    })
  });

  function jump(count, self) {

    window.setTimeout(function () {
      count--;

      if (count > 0) {
        jump(count, self);

      } else {
        $('.delete-massage').closest('tr').remove();
      }

    }, 1000);
  }

  $('.itemName').popup( {
    content: $(this).prop("data-content")
  });

});
