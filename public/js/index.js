'use strict';

var $ = require('./jquery.pagination');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {

  if (application.index.pageCount > 1) {

    var visiblePageCount = 7;
    $('.pagination').pagination({

      pageCount: application.index.pageCount,
      currentPage: application.index.currentPage,
      visiblePageCount: visiblePageCount,
      onPageChange: function (n) {

        var path = '/index/';
        if (application.index.isCategory) {

          var pathId = location.href.toString().split('/')[4];
          path = '/categories/' + pathId + '/';
        }
        location.href = path + n;
      }
    });
  }

  $('img')
    .error(function () {
      $(this).attr('src', '/image/missing.jpg');
    })
    .attr('src', function () {
      return $(this).data('src');
    });

  var $itemName = $('.itemName');
  $itemName.popup({

    content: $(this).prop('data-content')
  });
});
