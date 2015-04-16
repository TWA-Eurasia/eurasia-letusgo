'use strict';

var userController = require('../../controller/user');

describe('index', function() {

  var reqMock = {};
  var resMock = {};

  afterEach(function(){

    reloadDatabase();
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

      resMock.send = function(object){

        expect(object).to.have.property('user');
        expect(object.user.name).to.equal('Sofia');

        done();
      };

      userController.createUser(reqMock, resMock);
    });
  });
});
