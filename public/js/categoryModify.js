'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function(){

  function initErrorBox() {

    $('#empty-error').hide();
    $('#input-existed-error').hide();
  }

  function verifyCategoryIsExisted(name, callback) {
    $.get('/api/category/' + name)
      .success(function(resp) {

        callback(resp.data);
      });
  }

  function updateCategory(id, name, parent) {

    $.ajax({
      url: '/api/category/' + id,
      type: 'PUT',
      data: {name: name, parent: parent},
      success: function() {
        $(location).attr('href', '/admin/categoriesManagement');
      }
    });
  }

  var $categoryName = $('#category-name');
  $categoryName.on('change', function() {

    verifyCategoryIsExisted($categoryName.val().trim(), function(isExisted) {
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
    var categoryName = $categoryName.val().trim();

    var categoryId = $categoryName.data('id');
    var parentCategoryId = $('#parent-category-selector').val();
    if(categoryName.length === 0) {
      $('#empty-error').show();
      $('#input-existed-error').hide();
      result = false;
    }

    if(result) {
      updateCategory(categoryId, categoryName, parentCategoryId);
    }
  });
});
