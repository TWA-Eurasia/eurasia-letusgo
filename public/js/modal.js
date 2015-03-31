'use strict';
var $ = require('jquery');
require('semantic-ui');


$(document).ready(function () {

  $('#pay').on('click', function () {
    //$('.small.modal')
    //  .modal('show');
    //$('.small.modal')
    //  .modal('attach events', '.first.modal .button')
    //;
    $('.coupled.modal')
      .modal({
        allowMultiple: true
      })
    ;
    //open second modal on button click
    $('.second.modal')
      .modal('attach events', '.first.modal .button')
    ;
// show first immediately
    $('.first.modal')
      .modal('show')
    ;
  });
});

//// initialize all modals

//$(document).ready(function () {
//
//  $('#ispay').on('click', function () {
//
//
//
//  });
//});
