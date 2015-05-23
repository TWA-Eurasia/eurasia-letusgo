'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var deleteCartItem;

$('.itemName').popup({
  content: $(this).prop('data-content')
});

$('.delete_item').on('click', function () {

  deleteCartItem = this;

  $('.delete-modal')
    .modal('show');
});

$('.yes').on('click', function () {

  var deleteId = deleteCartItem.closest('td').id;

  $.ajax({
    url: '/api/item/' + deleteId,
    type: 'DELETE',

    success: function () {

      $('.delete-modal').modal('hide');
      $('.delete-message').show();

      $(deleteCartItem.closest('tr').remove());

      window.setTimeout(function () {

        $('.delete-message').hide();
      }, 1000);

      //$('#total').text(data.total);
      //countCartAmount();
    }
  });
});
