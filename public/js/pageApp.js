'use strict';

var $ = require('./jquery.pagination');

$('.pagination').pagination({

  pageCount: 10,
  currentPage: localStorage.pageCount || 1,
  visiblePageCount: 7
});
