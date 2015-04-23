'use strict';

var User = require('../model/user');

var updateActive = function (req, res, next) {
  var id = req.params.id;

  User.findByIdAndUpdate(id, {$set: { active:  true}})
    .exec()
    .then(function(user) {

      req.session.currentUserName = user.name;

      var currentUserName = req.session.currentUserName;
      res.render('verification', {currentUserName: currentUserName, userName : currentUserName});
    })
    .onReject(function(err) {

      next(err);
    });
};

module.exports = {

  updateActive : updateActive
};
