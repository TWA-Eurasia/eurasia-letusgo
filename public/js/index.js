'use strict';

var _ = require('lodash');
var $ = require('./jquery.pagination');

require('semantic-ui');

$(document).ready(function () {

  $('.pagination').pagination({

    pageCount: application.index.pageCount,
    currentPage: application.index.currentPage,
    visiblePageCount: 7
  });

  $('.item.secondMenu').on('click', function () {

    var id = $('.item.secondMenu').data('id');
    console.log(id + '++++++++++++++++++++');
    var parentId = this.closest('.firstMenu').id;
    console.log(id + parentId);

    $.get('/api/category/' + id, {id : id})
      .success(function (data) {

        console.log(data);
      })
  });

  $('.pageNumber').on('click', function() {
    var pageNumber = parseInt(this.id);

    $.ajax({
      url: '/index/' + pageNumber,
      type: 'GET',
      success: function(result) {
        $(location).attr('href', '/index/'+ pageNumber);
      }
    });

  })

});
