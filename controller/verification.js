'use strict';

var User = require('../model/user');
var Cart = require('../model/cart');

var updateActive = function (req, res, next) {
  var id = req.params.id;

  User.findByIdAndUpdate(id, {$set: { active:  true}})
    .exec()
    .then(function(user) {

      req.session.currentUserName = user.name;
      req.session.currentUserId = user._id;

      Cart.create({user: user._id});

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
