'use strict';

var userController = require('../../controller/user');

describe('user', function () {

  var reqMock = {};
  var resMock = {};

  afterEach(function () {

    reloadDatabase();
  });

  //describe('findUser', function () {
  //
  //  it('should verify if the user is Existed before and return boolean', function (done) {
  //
  //    reqMock.query = {
  //
  //      name: 'pppppppp'
  //    };
  //
  //    resMock.send = function (object) {
  //
  //      expect(object).to.have.property('data');
  //      expect(object).to.have.property('message');
  //      expect(object.data).to.equal(true);
  //      expect(object.message).to.equal('用户名已存在');
  //
  //      done();
  //    };
  //
  //    userController.findUser(reqMock, resMock);
  //  });
  //});

  describe('createUser', function () {

    it('should create a user and save it to mongoDB', function (done) {

      reqMock.body = {

        name: 'kjkopliyu',
        password: '000000',
        address: '',
        phoneNumber: '',
        active: true,
        createDate: new Date()
      };

      resMock.send = function (object) {

        expect(object).to.have.property('status');
        expect(object).to.have.property('data');
        expect(object).to.have.property('message');
        expect(object.data.name).to.equal('kjkopliyu');

        done();
      };

      userController.createUser(reqMock, resMock);
    });
  });

});
