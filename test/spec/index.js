'use strict';

var app = require('../../app.js');

var router = require('../../router/route/index');

describe('index', function() {
  describe('GET /', function () {
    it('should return 200 OK', function (done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });
});
