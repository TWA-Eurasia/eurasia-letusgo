// 'use strict';

var _ = require('lodash');
var $ = require('./jquery.pagination');
require('github/Semantic-Org/Semantic-UI@1.11.6/dist/semantic');

$(document).ready(function () {

  if(application.index.pageCount > 1) {
    var visiblePageCount = 7;
    $('.pagination').pagination({
      pageCount: application.index.pageCount,
      currentPage: application.index.currentPage,
      visiblePageCount: visiblePageCount,
      onPageChange: function(n) {
        var path = '/index/';
        if(application.index.isCategory) {

          var pathId = location.href.toString().split('/')[4];
          path = '/' + location.href.toString().split('/')[3] + '/' + pathId + '/';
        }
        location.href = path + n;
      }
    });
  }

  var $firstMenu = $('.firstMenu');
  $firstMenu.on('click', function() {
    var id = $(this).data('id');
    location.href = '/categoryView/' + id;
  });

  var $image = $('.image');
  $image.on('click', function() {
    var id = $(this).data('id');
    location.href = '/itemDetails/' + id;
  });

  var $itemName = $('.itemName');
  $itemName.popup( {
    content: $(this).prop("data-content")
  });

  var $button = $('.button');
  $button.on('click', function() {
    var id = $(this).data('id');
    location.href = '/itemDetails/' + id;
  })
});
