'use strict';

var express = require('express');
var router = express.Router();

var categoriesManagementController = require('../../controller/categoriesManagement');

router.get('/', categoriesManagementController.getCategoriesManagementInfo);
router.get('/addCategory', categoriesManagementController.addCategoryInfo);
router.get('/modifyCategory/:id', categoriesManagementController.getCategoryById);

module.exports = router;
