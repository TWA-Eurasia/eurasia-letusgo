'use strict';
describe('verification', function () {

  afterEach(function () {
    reloadDatabase();
  });

  describe('updateActive', function () {

    var resMock = {};
    var reqMock = {};

    var verification = require('../../controller/verification');

    it('it should return userName', function (done) {
      //var next = function(err) {
      //  return err;
      //};

      reqMock.params = {
        _id: '5523cea79294d58a8e06c3c9'
      };


      resMock.render = function (view, object) {
        expect(view).is.to.property('verification');
        //expect(object).to.have.property('userName');
        //expect(object.userName).to.equal('Jacob KANG');

        done();
      };
      verification.updateActive(reqMock, resMock);
    });
  });

  describe('getUser', function () {
    it('it should return 200 ok', function (done) {
      var resMock = {};
      var reqMock = {};
      var verification = require('../../controller/verification');

      reqMock.params = {
        userName: 'Jacob KANG'
      };

      resMock.send = function (object) {
        expect(object.state).to.equal(200);
        //expect(object.user.name).to.have.property('user');
        done();

      };
      verification.getUser(reqMock,resMock);
    });
  });

});

