'use strict';

var $ = require('./jquery.pagination');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

var deleteCartItem;

$(function(){

  if (application.index.pageCount > 1) {

    var visiblePageCount = 7;
    $('.pagination').pagination({

      pageCount: application.index.pageCount,
      currentPage: application.index.currentPage,
      visiblePageCount: visiblePageCount,
      onPageChange: function (n) {

        var path = '/admin/categoriesManagement/';
        location.href = path + n;
      }
    });
  }

  $('.category-name').popup({
    content: $(this).prop('data-content')
  });

  $('#main-category-step').on('click', function() {

    $('#main-category-step').attr('class', 'step active');

    $('#sub-category-step').attr('class', 'step');

    $('#main-category-list').show();
    $('#sub-category-list').hide();
  });

  $('#sub-category-step').on('click', function() {

    $('#main-category-step').attr('class', 'step');

    $('#sub-category-step').attr('class', 'step active');

    $('#main-category-list').hide();
    $('#sub-category-list').show();
  });

  $('.delete_item').on('click', function () {

    deleteCartItem = this;

    $('.delete-modal')
      .modal('show');
  });

  $('.yes').on('click', function () {

    var deleteId = deleteCartItem.closest('td').id;

    $.ajax({
      url: '/itemsManagement/' + deleteId,
      type: 'DELETE',

      success: function (data) {

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
