describe('GET /', function () {

  afterEach(function(){

    reloadDatabase();
  });

  it('it should return 200 ok', function (done){
   request(app)
   .get('/items/5523cea79294d58a8e06c3bf')
     .expect(200,done);

  });
});
