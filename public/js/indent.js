'use strict';
var $ = require('jquery');
require('github/Semantic-Org/Semantic-UI@1.11.6/dist/semantic');


$(document).ready(function () {

  $('#pay').on('click', function () {

    $('.first.modal')
      .modal('show');
  });

  $('#isPaid').on('click', function(){

    var total = $(this).data('total');
    var cart = $(this).data('cart');

    cart.forEach(function(cartItem){
      var number = cartItem.number;

      $.ajax({
        url: '/api/item/' + cartItem.item._id,
        type: 'GET',
        success: function(item){

          var inventory = item.inventory;
          if(number < inventory){

            $(location).attr('href', '/success?amount=' + total);
            updateInventory(inventory, number, item);

            var indentId = '551fd16975cd55ed0cfa5503';
            $.post('/indent/' + indentId);

            var userId = '551fd2a9ecb148410c4c8048';
            $.post('/api/user/' + userId, {indentId: indentId});
          }
        }
      });
    });
  });
});

function updateInventory(inventory, number, item){

  inventory -= number;

  $.ajax({
    url:'/api/item/' + item._id,
    type:'POST',
    data: {inventory: inventory}
  });
}

