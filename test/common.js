'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/letusgoTest', function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

var express = require('express');

var request = require('supertest');
global.request = request;

var chai = require('chai');
global.expect = chai.expect;

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var sinon = require('sinon');
global.sinon = sinon;

var app = require('../app.js');
global.app = app;

var reloadDatabase = require('./helper/reloadDatabase');
global.reloadDatabase = reloadDatabase;

reloadDatabase();
