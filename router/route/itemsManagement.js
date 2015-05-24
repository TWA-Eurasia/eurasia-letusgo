'use strict';

var express = require('express');
var router = express.Router();

var itemManagementController = require('../../controller/itemsManagement');

router.get('/', itemManagementController.getItemsManagementPage);
router.get('/modifyItem/:id', itemManagementController.getItemById);
router.delete('/:id', itemManagementController.removeItemById);
router.post('/:id', itemManagementController.updateItemById);
router.get('/addItem', itemManagementController.addNewItemPage);

module.exports = router;
