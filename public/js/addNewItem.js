'use strict';

var $ = require('jquery');

$(function(){

  $('a#save').on('click', function () {

    initBorder();
    initErrorBox();

    var unit = $('input#itemUnit').val();
    var price = $('input#itemPrice').val();
    var name = $('input#itemName').val();
    var inventory = $('input#itemInventory').val();

    if(infoIsVerfied(name, unit, price, inventory)){

      saveNewItem(name, unit, price);
    }
  });

  function initBorder() {

    $('#itemName').css('border', "grey 1px solid");
    $('#itemUnit').css('border', "grey 1px solid");
    $('#itemPrice').css('border', "grey 1px solid");
  }

  function initErrorBox() {

    $('#emptyError').hide();
    $('#inputError').hide();
  }

  function infoIsVerfied(name, unit, price, inventory) {

    if (!inputsIsIntergrated(name, unit, price, inventory)) {

      $('#emptyError').show();
      return false;
    } else {

      if (!inputsIsRight(name, unit, price, inventory)) {

        $('#inputError').show();
        return false;
      }

      return true;
    }
  }

  function inputsIsIntergrated(name, unit, price, inventory) {

    if (!name) {

      $('#itemName').css('border', "red 1px solid");
    }
    if (!unit) {

      $('#itemUnit').css('border', "red 1px solid");
    }
    if (!price) {

      $('#itemPrice').css('border', "red 1px solid");
    }

    if (!inventory) {

      $('#itemInventory').css('border', "red 1px solid");
    }
    return name && unit && price && inventory;
  }

  function inputsIsRight(name, unit, price, inventory) {

    if (!inputIsWord(name)) {
      $('#itemName').css('border', "red 1px solid");
    }

    if (!inputIsWord(unit)) {

      $('#itemUnit').css('border', "red 1px solid");
    }

    if (!isNumber(price)) {

      $('#itemPrice').css('border', "red 1px solid");
    }

    if (!isNumber(inventory)) {

      $('#itemPrice').css('border', "red 1px solid");
    }

    return inputIsWord(name) && inputIsWord(unit) && isNumber(price) && isNumber(inventory);
  }

  function inputIsWord(word) {

    var trimedWord = word.trim();
    return trimedWord.length > 0;
  }

  function isNumber(price) {

    var reg = /^\d+(\.\d+)?$/;
    return reg.exec(price);
  }

  function saveNewItem(name, unit, price) {

    $.post('/api/item', {name: name.trimLeft(), unit: unit.trimLeft(), price: price.trimLeft()})
      .success(function () {
        $(location).attr('href', '/shopManagement')
      });
  }
});
