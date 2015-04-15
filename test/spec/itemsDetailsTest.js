'use strict';
describe('GET /', function () {

  var resMock = {};
  var reqMock = {};

  var getItem = require('../../controller/getItem');

  it('it should return itemDetails', function (done) {
    reqMock.params =  {
      id : '5523cea79294d58a8e06c3bf'
    };

    resMock.render = function (view,object) {
      expect(view).is.to.equal('itemDetails');
      expect(object).to.have.property('itemDetails');
      expect(object.itemDetails.item.name).to.equal('水溶C100功能饮料');

      done();
    };

    getItem(reqMock, resMock);

    afterEach(function () {

      reloadDatabase();
    });

  });
});

