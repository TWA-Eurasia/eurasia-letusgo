var $ = require('jquery');

$(document).ready(function () {
  initPage();

  $('i.minus').on('click',function () {

    var numberInput = parseInt($('#numberInput').val());

    if (numberInput !== 1) {
      $('#numberInput').val(numberInput - 1);
    }
  });

  $('i.add').on('click',function () {

    var numberInput = parseInt($('#numberInput').val());

    $('#numberInput').val(numberInput + 1);
  });

  $('#numberInput').on('mouseout', function () {

    var numberInput = parseInt($('#numberInput').val());

    if(isNaN(numberInput)) {
      $('#numberInput').val(1);
    }
  });

  function initPage(){
    $.get('api/item', function (item) {

      $('#itemName').text(item.name);
      $('#itemPrice').text('￥' + item.price);
      $('#itemSpecification').text(item.specification);
      $('#itemDescription').text(item.description);
      $('#itemImage').attr('src', item.imageUrl);
    });
  }

});
