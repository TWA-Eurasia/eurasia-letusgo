'use strict';

var _ = require('lodash');
var $ = require('./jquery.pagination');

require('github/Semantic-Org/Semantic-UI@1.11.6/dist/semantic');

$(document).ready(function () {

  $('.pagination').pagination({

    pageCount: application.index.pageCount,
    currentPage: application.index.currentPage,
    visiblePageCount: 7,
    onPageChange: function(n) {
      $(location).attr('href', '/index/'+ n);
    }
  });

  $('.ui.dropdown.item').on('click', function() {

    var id = $(this).data('id');

    console.log(id);
    $(location).attr('href', '/mainCategoryView/'+ id);

    //$.get('/api/category')
  });
});
