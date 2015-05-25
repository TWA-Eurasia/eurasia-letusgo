'use strict';

var User = require('../model/user');


var getUsersManagementPage = function(req, res){
  User.find()
    .then(function(users){

      res.render('usersManagement', {
        status: 200,
        data: users
      });
    })
};

module.exports = {

  getUsersManagementPage: getUsersManagementPage
};
