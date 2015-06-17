'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/letusgoTest', function (err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

var chai = require('chai');
global.expect = chai.expect;

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

global.request = require('supertest');
global.sinon = require('sinon');
global.reloadDatabase = require('./helper/reloadDatabase');


