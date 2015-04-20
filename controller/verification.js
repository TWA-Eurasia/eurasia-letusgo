'use strict';

var User = require('../model/user');

var updateActive = function (req, res) {
  var id = req.params.id;

    User.update({_id: id}, {$set: {active: true}}, function() {
      User.findById(id, function(err, user) {
        if (err) {
          throw err;
        }
        res.render('verification',{user : user});
      });
    });
};

module.exports = {
  updateActive : updateActive,
};
