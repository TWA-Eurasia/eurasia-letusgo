'use strict';

var express = require('express');
var router = express.Router();

var indexController = require('../../controller/index');
router.get('/', indexController.getIndexInfo);
router.get('/index/:pageNumber', indexController.getRecommendItemsByPageNumber);
router.get('/categories/:id', indexController.getItemsByCategoryId);
router.get('/categories/:id/:pageNumber', indexController.getItemsByCategoryIdAndPageNumber);

module.exports = router;
