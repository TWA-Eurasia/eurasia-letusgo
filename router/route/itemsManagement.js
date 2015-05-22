'use strict';

var express = require('express');
var router = express.Router();

var itemManagementController = require('../../controller/itemsManagement');

router.get('/', itemManagementController.getItemsManagementPage);

module.exports = router;
