'use strict';

var $ = require('jquery');

$(function(){

  function initErrorBox() {

    $('#empty-error').hide();
    $('#input-existed-error').hide();
  }

  function verifyCategoryIsExisted(name, callback) {
    $.get('/api/category/' + name)
      .success(function(resp) {

        console.log(resp.data);
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

  var $mainCategoryName = $('#category-name');
  $mainCategoryName.on('change', function() {

    verifyCategoryIsExisted($mainCategoryName.val().trim(), function(isExisted) {
      if(isExisted) {

        $('#empty-error').hide();
        $('#input-existed-error').show();
      } else {
        $('#empty-error').hide();
        $('#input-existed-error').hide();
      }
    });
  });

  $('#save').on('click', function () {

    initErrorBox();

    var result = true;
    var mainCategoryName = $mainCategoryName.val().trim();
    var parentCategoryId = $('#parent-category-selector').val() || '55196b3e0042a1db62203a0a';
    if(mainCategoryName.length === 0) {
      $('#empty-error').show();
      $('#input-existed-error').hide();
      result = false;
    } else {
      verifyCategoryIsExisted($mainCategoryName.val().trim(), function(isExisted) {
        if(isExisted) {

          $('#empty-error').hide();
          $('#input-existed-error').show();
          result = false;
        } else {
          $('#empty-error').hide();
          $('#input-existed-error').hide();
          result = true;
        }
      });
    }

    if(result) {
      saveNewMainCategory(mainCategoryName, parentCategoryId);
    }
  });

});
