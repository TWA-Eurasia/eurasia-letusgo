'use strict';

describe('session', function () {

  afterEach(function (done) {
    reloadDatabase(done);
  });

  describe('login', function() {
    var session = {};
    var resMock = {};
    var reqMock = {};
    var sessionController = require('../../controller/session');

    it('should return login success', function(done) {

      session = {currentUserId: '',
                 currentUserName:''};
      reqMock.session = session;

      reqMock.body = {
        username: 'Jacob KANG',
        password: '123456789'
      };

      resMock.send = function (object) {
        expect(object.state).is.to.equal(200);
        expect(object.data).to.equal('Jacob KANG');
        expect(object.message).to.equal('登陆成功！');

        done();
      };
      sessionController.login(reqMock, resMock);
    });

  });
});
