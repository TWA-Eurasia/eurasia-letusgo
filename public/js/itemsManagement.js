'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var deleteCartItem;

$(function(){

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
    console.log(deleteId);
    $.ajax({
      url: '/itemsManagement/' + deleteId,
      type: 'DELETE',

      success: function (data) {
        var i_data = data;
        console.log(i_data);

        $('.delete-modal').modal('hide');
        $('.delete-message').show();

        $(deleteCartItem.closest('tr').remove());

        window.setTimeout(function () {

          $('.delete-message').hide();
        }, 1000);
      }
    });
  });

});
