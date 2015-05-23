'use strict';

var express = require('express');
var router = express.Router();

var itemManagementController = require('../../controller/itemsManagement');

router.get('/', itemManagementController.getItemsManagementPage);
router.get('/:id', itemManagementController.getItemById);
router.delete('/:id', itemManagementController.removeItemById);
router.post('/:id', itemManagementController.updateItemById);

module.exports = router;
