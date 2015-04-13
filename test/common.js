'use strict';

var mongoose = require('mongoose');
var express = require('express');

var request = require('supertest');
global.request = request;

var chai = require('chai');
global.expect = chai.expect;

var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var sinon = require('sinon');
global.sinon = sinon;
