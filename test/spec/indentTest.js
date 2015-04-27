'use strict';

describe('indent', function () {

  var resMock = {};
  var reqMock = {};
  var indentController = require('../../controller/indent');

  afterEach(function (done) {
    reloadDatabase(done);
  });
  describe('getIndent', function () {

    it('should get total and indent', function (done) {

      reqMock.session = {
        currentIndent : '551fd16975cd55ed0cfa5503',
        currentUserName : 'Jacob KANG'
      };

      resMock.render = function (view,object) {
        expect(view).to.equal('indent');
        expect(object).to.have.property('total');
        expect(object.total).to.equal('3334.50');
        expect(object).to.have.property('currentUserName');
        expect(object.currentUserName).to.equal('Jacob KANG');
        expect(object).to.have.property('cartItems');
        expect(object).to.have.property('shortedCartItemName');

        done();
      };

      indentController.getIndentInfo(reqMock, resMock);
    });
  });

  //describe('createIndent', function () {
  //  it('should return success', function () {
  //    reqMock.body = {};
  //    reqMock.session = {
  //      currentUserId : '5523cea79294d58a8e06c3c9',
  //      currentIndent : '551fd16975cd55ed0cfa5503'
  //    };
  //
  //    resMock.send = function (object) {
  //      expect(object).to.have.property('data');
  //      //expect(object.total).to.equal('3334.50');
  //      //expect(object).to.have.property('currentUserName');
  //      //expect(object.currentUserName).to.equal('Jacob KANG');
  //      //expect(object).to.have.property('cartItems');
  //      //expect(object).to.have.property('shortedCartItemName');
  //
  //      done();
  //    };
  //
  //    indentController.create(reqMock, resMock);
  //  });
  //});
});
