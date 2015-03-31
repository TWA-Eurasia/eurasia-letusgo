'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('success', {amount: 89});
});

module.exports = router;
