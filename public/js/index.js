'use strict';

var _ = require('lodash');
var $ = require('./jquery.pagination');

require('semantic-ui');

$(document).ready(function () {

  $('.pagination').pagination({

    pageCount: application.index.pageCount,
    currentPage: application.index.currentPage,
    visiblePageCount: 7,
    onPageChange: function(n) {
      $(location).attr('href', '/index/'+ n);
    }
  });

  //$('.pageNumber').on('click', function() {
  //  var pageNumber = parseInt(this.id);
  //
  //  $.ajax({
  //    url: '/index/' + pageNumber,
  //    type: 'GET',
  //    success: function(result) {
  //
  //    }
  //  });
  //
  //})

});
