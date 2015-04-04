'use strict';

var _ = require('lodash');
var $ = require('./jquery.pagination');

require('github/Semantic-Org/Semantic-UI@1.11.6/dist/semantic');

$(document).ready(function () {

  var pathId = '5519881c0042a1db62223b09';
  $('.pagination').pagination({

    pageCount: application.index.pageCount,
    currentPage: application.index.currentPage,
    visiblePageCount: 7,
    onPageChange: function(n) {

      var path = '/index/';
      if(application.index.isCategory) {

        var pathId = location.href.toString().split('/')[4];
        path = '/categoryView/' + pathId + '/';
      }

      location.href = path + n;
    }
  });
});
