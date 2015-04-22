'use strict';
describe('GET /', function () {

  var resMock = {};
  var reqMock = {};

  var verification = require('../../controller/verification');

  it('it should return userName', function (done) {
    reqMock.params = {
      _id: '531888e2719cd8056307fd6'
    };

    resMock.render = function (view, object) {
      expect(view).is.to.equal('verification');
      //expect(object).to.have.property('userName');
      //expect(object.itemDetails.item.name).to.equal('水溶C100功能饮料');

      done();
    };

    verification.updateActive(reqMock, resMock);

    afterEach(function () {

      reloadDatabase();
    });

  });
});

