'use strict';

var userController = require('../../controller/user');

describe('user', function () {

  var reqMock = {};
  var resMock = {};

  afterEach(function () {

    reloadDatabase();
  });

  describe('findUser', function () {

    it('should verify if the user is Existed before and return boolean', function (done) {

      reqMock.query = {

        name: 'Jacob KANG'
      };

      resMock.send = function (object) {

        expect(object.isExisted).to.equal(false);
        expect(object.message).to.equal('用户名可用');

        done();
      };

      userController.findUser(reqMock, resMock);
    });
  });

  describe('createUser', function () {

    it('should create a user and save it to mongoDB', function (done) {

      reqMock.body = {

        name: 'Sofia',
        password: '9311220',
        address: '',
        phoneNumber: '',
        active: true,
        createDate: new Date()
      };

      resMock.send = function (object) {

        expect(object).to.have.property('status');
        expect(object).to.have.property('message');
        expect(object.data.password).to.equal('******');
        expect(object.data.name).to.equal('Sofia');

        done();
      };

      userController.createUser(reqMock, resMock);
    });
  });

});
