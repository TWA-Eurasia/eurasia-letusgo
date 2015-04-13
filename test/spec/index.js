'use strict';

var app = require('../../app.js');

var router = require('../../router/route/index');

describe('index', function() {

  describe('GET /', function () {

    it('should return 200 OK', function (done) {

      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          done();
        });
    });
  });

  describe('GET /index/:pageNumber', function () {

    it('should return 200 OK', function (done) {

      request(app)
        .get('/index/3')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          done();
        });
    });
  });

  describe('GET /categories/:id', function () {

    it('should return 200 OK', function (done) {

      request(app)
        .get('/categories/5523bc489294d58a8e06c38c')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          done();
        });
    });
  });

  describe('GET /categories/:id/:pageNumber', function () {

    it('should return 200 OK', function (done) {

      request(app)
        .get('/categories/5523bc489294d58a8e06c38c/1')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function(err, res){
          if (err) throw err;
          done();
        });
    });
  });

  describe('POST /', function () {

    it('should return 200 OK', function (done) {

      request(app)
        .post('/')
        .send({
          name: '雪纺衫',
          unit: '件',
          price: 199,
          image: 'image/georgette.jpg',
          description: '这是件雪纺衫',
          inventory: 100,
          category: '5519881c0042a1db62223b09',
          specification: 'S',
          isRecommend: true
        })
        .expect(500)
        .end(function(err, res){
          done();
        })
    });
  });
});
