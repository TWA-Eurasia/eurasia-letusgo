'use strict';

xdescribe('GET api/indent', function () {

  var resMock = {};
  var reqMock = {};

  var indentController = require('../../controller/indent');

  it('should get total and indent', function (done) {

    resMock.send = function (object) {

      expect(object).to.have.property('cartItems');
      expect(object).to.have.property('isPaid');

      done();
    };

    indent.getIndent(reqMock, resMock);
  });

  afterEach(function () {

    reloadDatabase();
  });
});
