'use strict';

var express = require('express');
var router = express.Router();

var categoriesManagementController = require('../../controller/categoriesManagement');

router.get('/', categoriesManagementController.getCategoriesManagementInfo);

module.exports = router;
