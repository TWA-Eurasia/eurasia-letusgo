describe('GET api/indent', function () {

  var resMock = {};
  var reqMock = {};

  var getIndent = require('../../router/controller/getIndent');


  it('should get total and indent', function(done){

    resMock.send = function(object){

      expect(object).to.have.property('indent');
      expect(object).to.have.property('total');
      expect(object.total).to.equal('3582.00');

      done();
    };

    getIndent(reqMock, resMock);
  });

  afterEach(function(){

    reloadDatabase();
  });
});
