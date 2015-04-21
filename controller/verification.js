'use strict';

var User = require('../model/user');
var FIND_SUCCESS = '用户信息存在！！';
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

  User.findOne({name : userName})
    .exec(function(err, user) {
    if (err) {
      throw err;
    }

      res.send({state: 200, user: user, message: FIND_SUCCESS});
  });
};

module.exports = {
  updateActive : updateActive,
  getUser : getUser

};
