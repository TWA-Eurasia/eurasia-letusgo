'use strict';

var $ = require('./jquery.pagination');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function () {

   if(sessionStorage.getItem('user')) {
      $('#login').css('display', 'none');
      $('#register').css('display', 'none');
      $('#logout').css('display', 'block');
    }

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
      $(this).attr('src', '/image/missing1.png');
    })
    .attr('src', function () {
      return $(this).data('src');
    });

  var $itemName = $('.itemName');
  $itemName.popup({

    content: $(this).prop('data-content')
  });

 $('#logout').on('click', function () {

     sessionStorage.removeItem('user');
     $('#login').css('display', 'block');
     $('#register').css('display', 'block');
     $('#logout').css('display', 'none');
     $('#current-user').html('').show();
  });
});
