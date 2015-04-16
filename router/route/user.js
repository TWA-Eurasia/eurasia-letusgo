'use strict';

var express = require('express');
var router = express.Router();

var userController = require('../../controller/user');

router.post('/', userController.createUser);

//router.post('/:id', function (req, res) {
//
//  var userId = req.params.id;
//  var indentId = req.body.indentId;
//
//  User.update(userId, {$addToSet: {indents: indentId}}, function (err, user) {
//    res.send('add indent to user is successful');
//  });
//});

module.exports = router;
