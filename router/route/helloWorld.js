var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('helloWorld');
});

module.exports = router;
