'use strict';

var app = require('../../app.js');

var router = require('../../router/route/cart');

describe('cart', function() {

  describe('GET /', function() {

    it('should return 200 ok', function(done) {

      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function(err, res) {
          if(err) throw err;
          done();
        })
    });
  });

  describe('POST /:id', function() {

    it('should return ', function() {

      request(app)
        .post('/:id')
        .expect(200)
        .end(function(err, res) {
          if(err) {throw err;}
        })
    });
  });

  describe('GET /:amount', function() {

    it('should return amount', function(done) {

      request(app)
        .get('/cart/:amount')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {throw err;}
           expect(res.body.amount).to.equal(19550);
          done();
        })
    });
  });
});
