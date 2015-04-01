'use strict';
var $ = require('jquery');
require('semantic-ui');


$(document).ready(function () {

  $('#pay').on('click', function () {

    $('.first.modal')
      .modal('show');
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
