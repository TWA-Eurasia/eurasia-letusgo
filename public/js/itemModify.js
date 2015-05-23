'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function(){

  $('.save').on('click', verifyInfo);

  function verifyInfo() {
    var id = this.id;
    var name = $('input#itemName').val();
    var unit = $('input#itemUnit').val();
    var price = $('input#itemPrice').val();
    var inventory = $('input#itemInventory').val();

    var isIntegrated = name && unit && price && inventory;

    if (!isIntegrated) {
      $('#emptyError').show();
    } else {
      if(inputsIsRight(name, unit, price, inventory)){

        updateItem(id, name, unit, price);

      }else{

        $('#inputError').show();
      }
    }
  }

  function inputsIsRight(name, unit, price, inventory){
    if(!inputIsword(name)){
      $('#itemName').css('border', 'red 1px solid');
    }

    if(!inputIsword(unit)){
      $('#itemUnit').css('border', 'red 1px solid');
    }

    if(!isNumber(price)){
      $('#itemPrice').css('border', 'red 1px solid');
    }

    if(!isNumber(inventory)){
      $('#itemInventory').css('border', 'red 1px solid');
    }

    var inputsIsRight = inputIsword(name) && inputIsword(unit) && isNumber(price) && isNumber(inventory);

    return inputsIsRight;
  }

  function inputIsword(word){

    var reg = /^\s/;
    return !reg.exec(word);
  }

  function isNumber(price){

    var reg = /^\d+(\.\d+)?$/;
    return reg.exec(price);
  }


  function updateItem(id, name, unit, price) {

    $.ajax({

      url: '/api/item/' + id,
      type: 'PUT',
      data: {_id: id, name: name, unit: unit, price: price},

      success: function (data) {
        if (200 == data.status) {
          $(location).attr('href', '/shopManagement')
        }
      }
    });
  }

});
