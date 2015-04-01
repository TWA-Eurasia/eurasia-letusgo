'use strict';
var $ = require('jquery');
require('semantic-ui');


$(document).ready(function () {

  $('.delete_cartItem').on('click', function (event) {
    var id = this.closest('div').id;
    console.log(id);
    $.ajax({
      url: 'cart/' + id,
      type: 'DELETE',
      success: function(data) {
        if(200 == data.status) {
          $this.closest('div').remove();
        }
      }
    })
  })
});


