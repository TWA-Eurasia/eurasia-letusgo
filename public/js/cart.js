'use strict';
var $ = require('jquery');
require('semantic-ui');


$(document).ready(function () {

  $('.delete_cartItem').on('click', function (event) {

    var delete_cartItem = this;

    $('.first.modal')
      .modal('show');

    $('.yes').on('click', function (event) {
      var id = delete_cartItem.closest('td').id;

      $.ajax({
        url: 'cart/' + id,
        type: 'DELETE',

        success: function (data) {
          $(delete_cartItem.closest('tr')).replaceWith(
            "<tr><td colspan='7'> " + "<div class='ui teal message delete-massage'>" + "删除成功" + "</div></td></tr>");
          jump(2, delete_cartItem);
        }
      })
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

});


