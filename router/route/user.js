'use strict';

var express = require('express');
var router = express.Router();

var userController = require('../../controller/user');

router.post('/', userController.createUser);
router.post('/:id', userController.updateUser);

module.exports = router;
