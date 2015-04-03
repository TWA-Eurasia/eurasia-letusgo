'use strict';

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
        $(location).attr('href', '/index/'+ n);
      }
    });
  }


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


});
