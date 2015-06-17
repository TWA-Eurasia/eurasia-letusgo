'use strict';

var $ = require('jquery');
require('github/ziyiking/Semantic-UI@master/dist/semantic');

$(function(){

  //function getUsers(name, callback) {
  //
  //  $.get('/api/user', {name: name})
  //    .success(function (data) {
  //
  //      callback(data);
  //    });
  //}

  //function userIsExisted(userName) {
  //
  //  var isExisted = false;
  //  getUsers(userName, function (resp) {
  //
  //    if (resp.data) {
  //      isExisted = true;
  //
  //    }
  //
  //    return isExisted;
  //  });
  //}

  function modifyErrorBoxToRed(userName, userPassword, userEmail, userActiveMessage, userPhoneNumber){

    if(!userName) {
      $('#userName').css('border', 'red 1px solid');
    }

    if(! userPassword){
      $('#userPassword').css('border', 'red 1px solid');
    }

    if(! userEmail){
      $('#userEmail').css('border', 'red 1px solid');
    }

    if(! userActiveMessage){
      $('#userActiveMessage').css('border', 'red 1px solid');
    }

    //if(! userAddress){
    //  $('#userAddress').css('border', 'red 1px solid');
    //}

    if(! userPhoneNumber){
      $('#userPhoneNumber').css('border', 'red 1px solid');
    }
  }

  function phoneNumberHasRightFormat(userPhoneNumber){

    if(!userPhoneNumber){

      return true;
    }else{

      var phoneNumberReg = /^\d+(\-\d+)?$/;

      var phoneNumberLengthIsRight = false;
      if(userPhoneNumber.length === 11){

        phoneNumberLengthIsRight = true;
      }

      return phoneNumberLengthIsRight && phoneNumberReg.exec(userPhoneNumber);
    }
  }

  function isCorrect(userName, userPassword, userEmail, userPhoneNumber, userActiveMessage) {
    console.log(userName + "-----");

    var userReg = new RegExp('[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b@]');
    var nameIsCorrect = userReg.exec(userName);

    var passwordReg = /^(\w){6,20}$/;
    var passwordIsCorrect = passwordReg.exec(userPassword);

    var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    var emailIsCorrect = emailReg.exec(userEmail);

    var phoneNumberIsCorrect = phoneNumberHasRightFormat(userPhoneNumber);

    var userActiveMessageIsCorrect = false;

    if(userActiveMessage === 'false' || userActiveMessage === 'true'){
      userActiveMessageIsCorrect = true;
    }

    modifyErrorBoxToRed(!nameIsCorrect, passwordIsCorrect, emailIsCorrect, userActiveMessageIsCorrect, phoneNumberIsCorrect);

    return (!nameIsCorrect) && passwordIsCorrect && emailIsCorrect && userActiveMessageIsCorrect && phoneNumberIsCorrect;
  }

  $('.save').on('click', function () {

    var userId = this.id;

    var userName = $('#userName').val().trim('');
    var userPassword = $('#userPassword').val().trim('');
    var userAddress = $('#userAddress').val().trim('');
    var userEmail = $('#userEmail').val().trim('');
    var userPhoneNumber = $('#userPhoneNumber').val().trim('');
    var userActiveMessage = $('#userActiveMessage').val().trim('');

    var messageIsIntegrated = userName && userPassword && userEmail && userActiveMessage;

    var messageIsRight = isCorrect(userName, userPassword, userEmail, userPhoneNumber, userActiveMessage);

    if(!messageIsIntegrated){

      $('#emptyError').show();
    }else{

      if(! messageIsRight){

        $('#inputError').show();
      }else{

        updateUser(userId, userName, userPassword, userAddress, userEmail, userPhoneNumber, userActiveMessage);
      }
    }


    modifyErrorBoxToRed(userName, userPassword, userEmail, userActiveMessage, true);
  });


  function updateUser(userId, userName, userPassword, userAddress, userEmail, userPhoneNumber, userActiveMessage){

    $.ajax({

      url: '/admin/usersManagement/' + userId,
      type: 'POST',
      data: {name: userName, password: userPassword, address: userAddress, email: userEmail, phoneNumber: userPhoneNumber, active: userActiveMessage},

      success: function (data) {
        if (200 == data.status) {
          $(location).attr('href', '/admin/usersManagement')
        }
      }
    });
  }
});
