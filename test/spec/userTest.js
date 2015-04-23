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

    it('should find correct user and return right message!', function() {

      reqMock.query = {name: 'Jacob KANG'};

      resMock.send = function(object) {

        expect(object.state).to.equal(200);
        expect(object.data).to.equal(true);
        expect(object.message).to.equal('成功找到用户');
      };
    });
  });
});
