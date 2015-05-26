'use strict';

var $ = require('./jquery.pagination');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function(){

  if (application.index.pageCount > 1) {

    var visiblePageCount = 7;
    $('.pagination').pagination({

      pageCount: application.index.pageCount,
      currentPage: application.index.currentPage,
      visiblePageCount: visiblePageCount,
      onPageChange: function (n) {

        location.href = '/admin/categoriesManagement/index/' + n;
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
});
