'use strict';
var $ = require('jquery');
require('semantic-ui');


$(document).ready(function () {

  $('#pay').on('click', function () {
    $('.small.modal')
      .modal('show')
    ;
  })
});

