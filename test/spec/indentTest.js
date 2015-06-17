'use strict';

describe('indent', function () {
  var session;
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
        expect(object.total).to.equal('3334.50');
        expect(object.currentUserName).to.equal('Jacob KANG');
        expect(object).to.have.property('cartItems');
        expect(object).to.have.property('shortedCartItemName');

        done();
      };

      indentController.getIndentInfo(reqMock, resMock);
    });
  });

  describe('createIndent', function () {
    it('should return success', function (done) {
      reqMock.body = {user: '',
                      'cartItems[]':'551cc20e47a654d14a280e9e',
                      createDate: '',
                      isPaid: false};

      session = {currentUserId : '5523cea79294d58a8e06c3c9',
        currentIndent: ''};

      reqMock.session = session;

      resMock.send = function (object) {
        expect(object.status).to.equal(200);
        expect(object.message).to.equal('订单生成成功');

        done();
      };

      indentController.createIndent(reqMock, resMock);
    });
  });

  describe('getSuccessInfo', function () {
    it('should return success', function (done) {

      session = {currentUserName : 'yangmingkun',
        currentIndent: '551fd16975cd55ed0cfa5503'};

      reqMock.session = session;

      resMock.render = function (view, object) {
        expect(view).to.equal('success');
        expect(object.currentUserName).to.equal('yangmingkun');
        expect(object.total).to.equal('3334.50');

        done();
      };

      indentController.getSuccessInfo(reqMock, resMock);
    });
  });
});
