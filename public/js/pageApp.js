'use strict';

var $ = require('./jquery.pagination');

$('.pagination').pagination({
  pageCount: 10,
  currentPage: 5,
  visiblePageCount: 7
});
