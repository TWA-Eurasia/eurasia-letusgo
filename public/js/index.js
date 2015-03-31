'use strict';

var _ = require('lodash');
var $ = require('./jquery.pagination');

require('semantic-ui');

$(document).ready(function () {

  $('.pageNumber').on('click', function() {
    var pageNumber = parseInt(this.id);
    console.log(pageNumber);

    $.ajax({
      url: '/index/' + pageNumber,
      type: 'GET',
      success: function(result) {
        $(location).attr('href', '/index/'+ pageNumber);
      }
    });

  })

});
