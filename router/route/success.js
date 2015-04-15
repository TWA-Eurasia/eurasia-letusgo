'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('success');
});

module.exports = router;
