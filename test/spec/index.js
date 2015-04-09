'use strict';
var mongoose = require('mongoose')
  , express = require('express')
  , request = require('supertest')
  , app     = require('../../app.js');

var router = require('../../router/route/index');
var sinon = require('sinon');
var chai = require('chai');
chai.should();
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('index', function() {
  describe('GET /', function () {
    it('should return 200 OK', function (done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  //describe('GET /', function () {
  //  it('should return cannot find the username', function (done) {
  //    request(app)
  //      .get('/index/:pageNumber')
  //      .send({username: 'Jacobs', password: 'd'})
  //      .expect('无法找到用户: Jacobs', done)
  //      .expect(401);
  //  });
  //});


});
