var express = require('express');
var router = express.Router();

var Item = require('../../model/item');
var Category = require('../../model/category');
var getItem = require('../controller/getItem.js');


router.get('/:id', function (req, res) {

  getItem(req, res);
});

module.exports = router;
