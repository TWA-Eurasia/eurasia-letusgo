'use strict';

var express = require('express');
var router = express.Router();

var sessionController = require('../../controller/session');

router.post('/new', sessionController.login);

module.exports = router;
