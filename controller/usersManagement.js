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

var removeUserById = function(req, res){
  var id = req.params.id;

  User.remove({_id: id}, function(){
    res.send({
      status: 200
    });
  });
};

module.exports = {

  getUsersManagementPage: getUsersManagementPage,
  removeUserById: removeUserById
};
