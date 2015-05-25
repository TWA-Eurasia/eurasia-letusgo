'use strict';

var $ = require('jquery');

$(function(){

  function initErrorBox() {

    $('#main-category-empty-error').hide();
    $('#main-category-input-error').hide();
    $('#main-category-input-existed-error').hide();
  }

  function verifyCategoryIsExisted(name, callback) {
    $.get('/api/category/' + name)
      .success(function(resp) {

        callback(resp.data);
      });
  }

  function saveNewMainCategory(name, parent) {

    $.post('/api/category', {name: name, parent: parent})
      .success(function (data) {
        if(data.state === 200) {

          $(location).attr('href', '/admin/categoriesManagement');
        }
      });
  }

  var $mainCategoryName = $('#main-category-name');
  $mainCategoryName.on('change', function() {

    verifyCategoryIsExisted($mainCategoryName.val().trim(), function(isExisted) {
      if(isExisted) {

        $('#main-category-empty-error').hide();
        $('#main-category-input-existed-error').show();
      } else {
        $('#main-category-empty-error').hide();
        $('#main-category-input-existed-error').hide();
      }
    });
  });

  $('#main-category-save').on('click', function () {

    initErrorBox();

    var result = true;
    var mainCategoryName = $mainCategoryName.val().trim();
    if(mainCategoryName.length === 0) {
      $('#main-category-empty-error').show();
      $('#main-category-input-existed-error').hide();
      result = false;
    } else {
      verifyCategoryIsExisted($mainCategoryName.val().trim(), function(isExisted) {
        if(isExisted) {

          $('#main-category-empty-error').hide();
          $('#main-category-input-existed-error').show();
          result = false;
        } else {
          $('#main-category-empty-error').hide();
          $('#main-category-input-existed-error').hide();
          result = true;
        }
      });
    }

    if(result) {
      saveNewMainCategory(mainCategoryName, '55196b3e0042a1db62203a0a');
    }
  });

});
