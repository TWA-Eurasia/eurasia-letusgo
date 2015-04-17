'use strict';

var express = require('express');
var router = express.Router();

var userController = require('../../controller/user');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.post('/login', userController.login);

module.exports = router;
