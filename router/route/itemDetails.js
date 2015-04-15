'use strict';

var express = require('express');
var router = express.Router();

var getItem = require('../../controller/getItem.js');


router.get('/:id', function (req, res) {

  getItem(req, res);
});

module.exports = router;
