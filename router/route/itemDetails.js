'use strict';

var express = require('express');
var router = express.Router();

var itemDetailsController = require('../../controller/itemDetails.js');


router.get('/:id', itemDetailsController.getItemDetails);
module.exports = router;
