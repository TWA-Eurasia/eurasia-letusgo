'use strict';
describe('GET /', function () {

  var resMock = {};
  var reqMock = {};

  var getItem = require('../../router/controller/getItem');

  it('it should return itemDetails', function (done) {
    reqMock.params =  {
      id : '5523cea79294d58a8e06c3bf'
    };

    resMock.render = function (view,object) {
      expect(view).is.to.equal('itemDetails');
      expect(object).to.have.property('itemDetails');

      done();
    };

    getItem(reqMock, resMock);

    afterEach(function () {

      reloadDatabase();
    });

  });
});

