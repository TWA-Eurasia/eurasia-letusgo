'user strict';

var express = require('express');
var router = express.Router();

var usersManagementController =  require('../../controller/usersManagement');

router.get('/', usersManagementController.getUsersManagementPage);
router.delete('/:id', usersManagementController.removeUserById);

module.exports = router;
