'use strict';

var _ = require('lodash');
var $ = require('./jquery.pagination');

require('github/Semantic-Org/Semantic-UI@1.11.6/dist/semantic');

$(document).ready(function () {
  var path = 'index';

  $('.pagination').pagination({

    pageCount: application.index.pageCount,
    currentPage: application.index.currentPage,
    visiblePageCount: 7,
    onPageChange: function(n) {
      $(location).attr('href', '/' + path + '/'+ n);
    }
  });

  $('item.secondMenu').on('click', function() {
    var id = $(this).data('id');
    path = 'subCategoryView/' + id;
    console.log(path);
  })
});
