'use strict';

var express = require('express');
var router = express.Router();

var userController = require('../../controller/user');

router.get('/', userController.findUser);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;
