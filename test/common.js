'use strict';

var chai = require('chai');
global.expect = chai.expect;

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var sinon = require('sinon');

global.sinon = sinon;
