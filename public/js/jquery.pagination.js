'use strict';

var $ = require('jquery');

function Pagination(jqContainer, options) {
  this.jqContainer = jqContainer;
  this.options = options;
  this.currentPage = options.currentPage;
  this.visiblePage = {};
  this.render();
  this.jqContainer.data('pagination', this);
}

Pagination.prototype.render = function () {
  this.jqContainer.empty();
  var that = this;
  var ulContainer = $('<ul />');
  var range = this.getRange();

  $('<li />')
    .text('< 上一页')
    .toggleClass('previous', this.currentPage == 1)
    .on('click', function () {
      if (that.currentPage > 1) {
        that.emit(--that.currentPage);
      }
    }).appendTo(ulContainer);

  this.renderMiddle(ulContainer);

  $('<li />')
    .text('下一页 >')
    .toggleClass('next', this.currentPage == range.pop())
    .on('click', function () {
      if (that.currentPage < that.options.pageCount) {
        that.emit(++that.currentPage);
      }
    })
    .appendTo(ulContainer);

  ulContainer.appendTo(this.jqContainer);
};

Pagination.prototype.renderMiddle = function (ulContainer) {
  var range = this.getRange();
  var that = this;
  for (var i = 0; i < range.length; i++) {
    $('<li />')
      .text(function () {
        return range[i] !== -1 ? range[i] : '';
      })
      .addClass('pageNumber')
      .toggleClass('current', range[i] == this.currentPage)
      .toggleClass('ellipsis', range[i] == -1)
      .on('click', function (i) {
        return function () {
          if (i !== that.currentPage) {
            that.currentPage = i;
            that.emit(i);
          }
        }
      }(range[i])).appendTo(ulContainer);
  }
};

Pagination.prototype.emit = function (n) {
  this.render();
  this.options.onPageChange(n);
};

Pagination.prototype.getRange = function () {
  var rangeCount = this.options.visiblePageCount - 3;
  var leftPageCount = Math.floor(rangeCount / 2);
  var current = this.currentPage;
  var pageCount = this.options.pageCount;

  var startPage = Math.min(pageCount - rangeCount, current - leftPageCount);
  startPage = Math.max(2, startPage);
  var endPage = Math.min(pageCount - 1, startPage + rangeCount - 1);

  var result = [];

  for (var i = startPage; i <= endPage; i++) {
    result.push(i);
  }

  if (result[0] != 2 && result[0]) {
    result.unshift(-1);
  }

  if ((this.options.pageCount > 5) && result[result.length - 1] != this.options.pageCount - 1) {
    result.push(-1);
  }

  result.unshift(1);
  result.push(this.options.pageCount);

  return result;
};

var defaultConfig = {
  pageCount: 10,
  currentPage: 1,
  visiblePageCount: 7
};

$.fn.pagination = function (config) {
  var options = $.extend(defaultConfig, config);
  return new Pagination($(this), options);
};

module.exports = $;
