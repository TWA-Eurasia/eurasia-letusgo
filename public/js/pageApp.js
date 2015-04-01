'use strict';

var $ = require('./jquery.pagination');

$('.pagination').pagination({
  pageCount: 10,
  currentPage: 1,
  visiblePageCount: 7
});
