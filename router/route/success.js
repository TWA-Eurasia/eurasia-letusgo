'use strict';

var express = require('express');
var router = express.Router();

var indentController = require('../../controller/indent');
//router.get('/', function (req, res) {
//  res.render('success', {currentUserName: req.session.currentUserName});
//});
router.get('/', indentController.getSuccessInfo);

module.exports = router;
