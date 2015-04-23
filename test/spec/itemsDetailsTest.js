'use strict';

xdescribe('itemsDetails', function () {
  beforeEach(function () {
    reloadDatabase();
  });

  afterEach(function () {
    reloadDatabase();
  });


  describe('getItemDetails', function () {
    var resMock = {};
    var reqMock = {};
    var itemDetails = require('../../controller/itemDetails');
    reqMock.params = {
      id: '5523cea79294d58a8e06c3bf'
    };

    reqMock.session = {
      currentUserName: 'Jacob KANG'
    };

    it('it should return about item message', function (done) {
      resMock.render = function (view, object) {
        expect(view).to.equal('itemDetails');
        expect(object.currentUserName).to.equal('Jacob KANG');
        expect(object.itemDetails.item.name).to.equal('水溶C100功能饮料');

        done();
      };
      itemDetails.getItemDetails(reqMock, resMock);
    });
  });

});



