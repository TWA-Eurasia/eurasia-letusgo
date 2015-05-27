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

var getUserById = function (req,res){

  var id = req.params.id;

  User.findById(id, function(err, user){
    res.render('userModifyPage', {
      status: 200,
      data: user
    });
  });
};

var updateUser = function(req, res){

  var id = req.params.id;

  User.update({_id: id}, {
    $set: {

      name: req.body.name,
      password: req.body.password,
      address: req.body.address,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      active: req.body.active
    }
  }, function(){

    res.send({status: 200});
  });
};

module.exports = {

  getUsersManagementPage: getUsersManagementPage,
  removeUserById: removeUserById,
  getUserById: getUserById,
  updateUser: updateUser
};
