'use strict';

var express = require('express');
var router = express.Router();

var indentController = require('../../controller/indentController');

router.get('/', function(req, res){
  indentController.getIndent(req, res);
});

module.exports = router;
