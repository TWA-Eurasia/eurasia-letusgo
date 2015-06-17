'use strict';

var express = require('express');
var router = express.Router();

var adminController = require('../../controller/admin');

router.get('/index', adminController.getAdminIndexInfo);

module.exports = router;
