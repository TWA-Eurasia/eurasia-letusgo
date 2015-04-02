'use strict';
var $ = require('jquery');
require('github/Semantic-Org/Semantic-UI@1.11.6/dist/semantic');


$(document).ready(function () {

  $('#pay').on('click', function () {

    $('.first.modal')
      .modal('show');
  });

  $('.ispay').on('click', function () {
    $.ajax({
      url: '/success',
      type: 'GET'
    });

  });
});

//$(document).ready(function () {
//
//  $('.ispay').on('click', function () {
//    //var itemList = this.id;
//    //console.log(itemList.toString().toArray());
//    //_.forEach(itemList, function(aa) {
//    //  $.ajax({
//    //    url: '/indent'+aa.item._id,
//    //    type: 'GET',
//    //    data: item.number
//    //  });
//    //});
//
//    $('.second.modal')
//      .modal('attach events', '.first.modal .button');
//
//  });
//});
