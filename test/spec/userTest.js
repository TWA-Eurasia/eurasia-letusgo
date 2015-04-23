'use strict';

describe('user', function() {

  var reqMock;
  var resMock;
  var userController;

  beforeEach(function() {
    reqMock = {};
    resMock = {};

    userController = require('../../controller/user');
  });

  afterEach(function () {
    reloadDatabase();
  });

  describe('findUser', function() {

    it('should find correct user and return right message!', function(done) {

      reqMock.query = {name: 'Jacob KANG'};

      resMock.send = function(object) {

        expect(object.state).to.equal(200);
        expect(object.data).to.equal(true);
        expect(object.message).to.equal('当前用户名已被注册');

        done();
      };

      userController.findUser(reqMock, resMock);
    });
  });

  describe('findUser', function() {

    it('should cant find user and return useful message!', function(done) {

      reqMock.query = {name: 'Jacob'};

      resMock.send = function(object) {

        expect(object.state).to.equal(200);
        expect(object.data).to.equal(false);
        expect(object.message).to.equal('用户名可用');

        done();
      };

      userController.findUser(reqMock, resMock);
    });
  });

  describe('getUserById', function() {

    it('should get user and return right message!', function(done) {

      reqMock.params = {id: '5523cea79294d58a8e06c3c9'};

      resMock.send = function(object) {

        expect(object.state).to.equal(200);
        expect(object.message).to.equal('成功找到用户');

        done();
      };

      userController.getUserById(reqMock, resMock);
    });
  });
});
