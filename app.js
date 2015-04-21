'use strict';

require('newrelic');

var express = require('express');
var path = require('path');

var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//connect to database
mongoose.connect('mongodb://localhost/eurasiaLetusgo', function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

if (app.get('env') === 'production') {
  app.set('port', 80);
  // changes it to use the optimized version for production
  //app.use(express.static(path.join(__dirname, '/dist')));
  app.use(express.static(path.join(__dirname, './public')));
  app.use(express.static(path.join(__dirname, './.tmp')));
  app.use(express.static(path.join(__dirname, './')));
  app.use(express.static(path.join(__dirname, './jspm_packages')));
}

app.set('port', 3000);
app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './.tmp')));
app.use(express.static(path.join(__dirname, './')));
app.use(express.static(path.join(__dirname, './jspm_packages')));


var router = require('./router');
router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production settings
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    if(req.header('X-Requested-With')) {
      res.send({
        message: err.message,
        status: err.status || 500,
        err: {}
      });
    }else{

      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    }
  });
}

app.use(function (err, req, res, next) {
  console.log(req.header('X-Requested-With'));
  if(req.header('X-Requested-With')) {
    res.send({
      message: err.message,
      status: err.status || 500,
      error: err
    });
  }else{

    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  }
});

module.exports = app;




