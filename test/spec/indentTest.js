'use strict';

describe('GET api/indent', function () {

  var resMock = {};
  var reqMock = {};

  var indentController = require('../../controller/indentController');

  it('should get total and indent', function (done) {

    resMock.send = function (object) {

      expect(object).to.have.property('cartItems');
      expect(object).to.have.property('isPaid');

      done();
    };

    indentController.getIndent(reqMock, resMock);
  });

  afterEach(function () {

    reloadDatabase();
  });
});
