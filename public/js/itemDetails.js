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

    var numberInput = $('#numberInput').val();

    var reg = /^(0|[1-9][0-9]*)$/;
    if(!reg.exec(numberInput)){
      $('#numberInput').val(1);
    }
  });

  function initPage(){
    $.get('api/item', function (item) {

      $('.itemName').text(item.item.name);
      $('#itemPrice').text(item.item.price + ' 元');
      $('#itemUnit').text(item.item.unit);
      $('#itemSpecification').text(item.item.specification);
      $('#itemDescription').text(item.item.description);
      $('#itemImage').attr('src', item.item.imageUrl);
      $('#itemLeftNum').text(item.item.leftNumber + ' ' + item.item.unit);
      $('#category').text(item.category.parent.name);
      $('#subcategory').text(item.item.category.name);

    });
  }

});
