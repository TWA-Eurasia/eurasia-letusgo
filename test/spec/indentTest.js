'use strict';

describe('indent', function () {

  var resMock = {};
  var reqMock = {};
  var indentController = require('../../controller/indent');

  afterEach(function () {
    reloadDatabase();
  });
  describe('getIndent', function () {

    it('should get total and indent', function (done) {

      reqMock.session = {
        currentIndent : '551fd16975cd55ed0cfa5503'
      };

      resMock.send = function (object) {

        expect(object).to.have.property('total');
        expect(object.total).to.equal('3334.50');

        done();
      };

      indentController.getIndent(reqMock, resMock);
    });


  });
});


