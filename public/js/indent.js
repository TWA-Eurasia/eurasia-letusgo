'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var MESSAGE = ' 库存不足, 请减少商品数量！';

function updateInventory(inventory, number, item) {

  inventory -= number;

  $.ajax({
    url: '/api/item/' + item._id,
    type: 'POST',
    data: {inventory: inventory}
  });
}

function showShortage(shortedCartItemName) {

  $('#modalTips').text(shortedCartItemName + MESSAGE);

  $('.second.modal')
    .modal('show');
}

$(document).ready(function () {

  $('#pay').on('click', function () {

    var shortedCartItemName = $('#shortedCartItemName').text();

    if (shortedCartItemName) {

      showShortage(shortedCartItemName);
    } else {
      $('.confirmPay')
        .modal('show');
    }
  });

  $('#isPaid').on('click', function () {

    //var total = $(this).data('total');
    var cartItems = $(this).data('cart');

    $.get('/api/item', {cartItems: cartItems}, function (items) {

      cartItems.forEach(function (cartItem) {
        items.forEach(function (item) {

          var number = cartItem.number;
          var inventory = item.inventory;
          if (item._id === cartItem.item._id) {

            if (number < inventory) {

              $(location).attr('href', '/success');
              updateInventory(inventory, number, item);
            }
          }
        });
      });
    });
  });

  $('.itemName').popup({
    content: $(this).prop('data-content')
  });

  $('img')
    .error(function () {
      $(this).attr('src', '/image/missing1.png');
    })
    .attr('src', function () {
      return $(this).data('src');
    });
});
