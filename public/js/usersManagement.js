'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function(){

  var deleteUser;
  $('.delete_user').on('click', function () {

    deleteUser = this;

    $('.delete-modal')
      .modal('show');
  });

  $('.yes').on('click', function () {

    var deleteId = deleteUser.closest('td').id;

    $.ajax({
      url: '/admin/usersManagement/' + deleteId,
      type: 'DELETE',

      success: function (data) {

        $('.delete-modal').modal('hide');
        $('.delete-message').show();

        $(deleteUser.closest('tr').remove());

        window.setTimeout(function () {

          $('.delete-message').hide();
        }, 1000);
      }
    });
  });

  $('.no').on('click', function(){
    $('.delete-modal').modal('hide');
  });
});
