// 'use strict';

var _ = require('lodash');
var $ = require('./jquery.pagination');

require('github/Semantic-Org/Semantic-UI@1.11.6/dist/semantic');

$(document).ready(function () {

  $('.pagination').pagination({

    pageCount: application.index.pageCount,
    currentPage: application.index.currentPage,
    visiblePageCount: 7,
    onPageChange: function(n) {

      var path = '/index/';
      if(application.index.isCategory) {

        path = '/categoryView/' + pathId + '/';
      }

      location.href = path + n;
    }
  });

  //var $secondMenu = $('.secondMenu');
  //$secondMenu.on('click', function(c) {
  //
  //  pathId = $(this).data('id');
  //  console.log(pathId);
  //
  //});

  var $image = $('.image');
  $image.on('click', function() {
    var id = $(this).data('id');
    location.href = '/itemDetails/' + id;
  });

});
