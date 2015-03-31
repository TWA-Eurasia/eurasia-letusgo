var express = require('express');
var router = express.Router();

var _ = require('lodash');

router.get('/:pageNumber', function (req, res) {


  res.render('index');
});

module.exports = router;
