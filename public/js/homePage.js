'use strict';

var $ = require('jquery');
var _ = require('lodash');

$(document).ready(function () {

  $('.item.secondMenu').on('click', function () {

    var id = this.id;
    var parentId = this.closest('.firstMenu').id;
    console.log(id + parentId);

    $.get('/api/category/' + id, {id : id})
      .success(function (data) {

        console.log(data);
      })
  })
});
