'use strict';

var express = require('express');
var router = express.Router();

var categoriesManagementController = require('../../controller/categoriesManagement');

router.get('/', categoriesManagementController.getCategoriesManagementInfo);
router.get('/index/:pageNumber', categoriesManagementController.getSubCategoriesByPageNumber);
router.get('/addCategory', categoriesManagementController.addNewMainCategoryInfo);
router.get('/addSubCategory', categoriesManagementController.addNewSubCategoryInfo);

module.exports = router;
