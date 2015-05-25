'use strict';

var $ = require('jquery');

$(function(){

  function initErrorBox() {

    $('#emptyError').hide();
    $('#inputError').hide();
  }

  function saveNewMainCategory(name, parent) {

    $.post('/api/category', {name: name, parent: parent})
      .success(function () {
        $(location).attr('href', '/admin/categoriesManagement');
      });
  }

  $('#main-category-save').on('click', function () {

    var $mainCategoryName = $('#main-category-name');
    $mainCategoryName.css('border', 'grey 1px solid');
    initErrorBox();

    var mainCategoryName = $mainCategoryName.val().trim();
    if(mainCategoryName.length > 0) {
      saveNewMainCategory(mainCategoryName, '');
    }
  });

});
