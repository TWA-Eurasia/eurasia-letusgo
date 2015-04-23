'use strict';

var express = require('express');
var router = express.Router();

var indentController = require('../../controller/indent');

router.post('/', indentController.createIndent);

module.exports = router;
