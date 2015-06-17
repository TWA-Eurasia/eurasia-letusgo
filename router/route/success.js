'use strict';

var express = require('express');
var router = express.Router();

var indentController = require('../../controller/indent');

router.get('/', indentController.getSuccessInfo);

module.exports = router;
