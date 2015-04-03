var express = require('express');
var path = require('path');

var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));

//connect to database
mongoose.connect('mongodb://localhost/eurasiaLetusgo', function (err) {
    if (err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// development settings
if (app.get('env') === 'development') {

    app.use(express.static(path.join(__dirname, './public')));
    app.use(express.static(path.join(__dirname, './.tmp')));
    app.use(express.static(path.join(__dirname, './')));
    app.use(express.static(path.join(__dirname, './jspm_packages')));


  // development error handler
    // will print stacktrace
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production settings
if (app.get('env') === 'production') {

    // changes it to use the optimized version for production
    app.use(express.static(path.join(__dirname, '/dist')));

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

// routes
var router = require('./router')(app);

module.exports = app;




