'use strict';

var express = require('express');
var router = express.Router();

var indentController = require('../../controller/indentController');

router.get('/', function(req, res){
  indentController.getIndent(req, res);
});

//router.get('/', indentController.getIndent);
//router.post('/', function (req, res, next) {
//
//  Indent.create({
//
//    cartItems: ['551cc20e47a654d14a280e9b', '551cc20e47a654d14a280e9c','551cc20e47a654d14a280e9d','551cc20e47a654d14a280e9e'
//    ],
//    createDate: 2015 - 4 - 1
//  }, function (err, indent) {
//    if (err) {
//      return next(err);
//    }
//    res.send(indent);
//  });
//});
//
//router.post('/:id', function (req, res) {
//  var id = req.params.id;
//
//  Indent.update(id, {$set: {isPaid: true}}, function (err, indent) {
//
//    res.send('isPaid is true');
//  });
//});

module.exports = router;
