'use strict';
var $ = require('jquery');
require('github/Semantic-Org/Semantic-UI@1.11.6/dist/semantic');

var deleteId;
var closeTr;

$(document).ready(function () {

  function changetotal(t) {
    var id = t.closest('tr').data('id');
    var num = t.closest('td').find('#number').val();
    var price = t.parents('td').prev().find('#price').text();
    var total = $('#total').text();
    var input = t;

    $.ajax({
      url: 'cart/' + id,
      type: 'POST',
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

  $('i.caret.left').on('click', function () {

    var numberInput = parseInt($(this).closest('td').find('#number').val());

    if (numberInput !== 1) {
      $(this).closest('td').find('#number').val(numberInput - 1);
      changetotal($(this));
    }
  });

  $('i.caret.right').on('click', function () {


    var numberInput = parseInt($(this).closest('td').find('#number').val());

    var inventory = $('#leftNumber').text();

    if (inventory > numberInput) {
      $(this).closest('td').find('#number').val(numberInput + 1);
      changetotal($(this));
    }


  });

  $('input').on('keyup', function () {
    changetotal($(this));
  });

  $('input').on('blur', function () {

    $(this).closest('td').find('#inventory').hide();

    var numberInput = parseInt($(this).closest('td').find('#number').val());
    numberInput = numberInput.toString();

    var number = numberInput.replace(/\b(0+)/gi, '');
    var input = $(this);

    verifyNumber(number);

    if (isShorted(input)) {
      $(this).closest('td').find('#inventory').show();
    }
  });

  function verifyNumber(number) {

    var reg = /^(0|[1-9][0-9]*)$/;

    if (!reg.exec(number)) {
      parseInt($(this).closest('td').find('#number').val(1));
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


  $('.delete_cartItem').on('click', function (event) {

    var delete_cartItem = this;

    deleteId = delete_cartItem.closest('td').id;
    closeTr = delete_cartItem.closest('tr');

    $('.first.modal')
      .modal('show');
  });

  $('.yes').on('click', function (event) {

    $.ajax({
      url: 'cart/' + deleteId,
      type: 'DELETE',

      success: function (data) {

        closeTr.remove();
        //$(delete_cartItem.closest('tr')).replaceWith(
        //  "<tr><td colspan='7'> " + "<div class='ui teal message delete-massage'>" + "删除成功" + "</div></td></tr>");
        //jump(2, delete_cartItem);
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


