'use strict';

var User = require('../model/user');

var updateActive = function (req, res) {
  var id = req.params.id;

  User.update({_id: id}, {$set: {active: true}}, function() {
    User.findById(id, function(err, user) {
      if (err) {
        throw err;
      }
      var userName = user.name;
      res.render('verification',{userName : userName});
    });
  });
};

var getUser = function (req, res) {
  var userName = req.params.userName;

  User.find({name : userName})
    .exec(function(err, user) {
    if (err) {
      throw err;
    }
    res.send({user : user});
  });
};

module.exports = {
  updateActive : updateActive,
  getUser : getUser

};
