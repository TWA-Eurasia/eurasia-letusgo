'use strict';

var app = require('../../app.js');

var router = require('../../router/route/cart');

describe('cart', function() {

  describe('GET /', function() {

    it('should return 200 ok', function() {

      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200)
        .end(function(err) {
          if(err) {throw err;}
        })
    });
  });

  describe('POST /:id', function() {

    it('should return ', function() {

      request(app)
        .post('/:id')
        .expect(200)
        .end(function(err) {
          if(err) {throw err;}
        })
    });
  });
});
