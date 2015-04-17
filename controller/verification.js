'use strict';

var User = require('../model/user');

var updateActive = function (req, res) {
  var id = req.params.id;

  User.findById(id, function (err, user) {
      User.update({_id: id}, {$set: {active: true}}, function () {
        res.render('verification',{user:user});
      });
    });
};

module.exports = {
  updateActive : updateActive
};
