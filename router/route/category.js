'use strict';

var express = require('express');
var router = express.Router();

var categoryController = require('../../controller/category');

router.get('/:name', categoryController.getCategoryByName);
router.post('/', categoryController.createNewCategory);

module.exports = router;
