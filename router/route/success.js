'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('success', {currentUserName: req.session.currentUserName});
});

module.exports = router;
