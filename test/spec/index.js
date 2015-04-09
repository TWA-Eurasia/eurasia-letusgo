'use strict';
var mongoose = require('mongoose')
var app = require('../../app.js');

var router = require('../../router/route/index');
var sinon = require('sinon');
var chai = require('chai');
chai.should();
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('index', function () {
  describe('GET /', function() {
    it('should be a function', function() {
      router.get.should.be.a["function"];
    });

    it('should return index view name', function(done) {
      var mockReq = {};
      var mockRes = {
        viewName: "",
        data: {},
        render: function(view, viewData) {
          this.viewName = view;
          this.data = viewData;
        }
      }
      router.get(mockReq, mockRes);
      mockRes.viewName.should.equal('index');
    });
  });
});
