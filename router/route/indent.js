'use strict';

var express = require('express');
var router = express.Router();

var indentController = require('../../controller/indentController');

router.get('/', indentController.getIndent);

module.exports = router;
