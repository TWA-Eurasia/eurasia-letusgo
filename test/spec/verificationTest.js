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
      reqMock.params = {
        _id: '5523cea79294d58a8e06c3c9'
      };

      reqMock.session = {
        currentUserName: 'Jacob KANG'
      };

      resMock.render = function (view, object) {
        expect(view).is.to.equal('verification');
        expect(object.userName).to.equal('Jacob KANG');

        done();
      };
      verification.updateActive(reqMock, resMock);
    });
  });

});

