describe('GET api/indent', function () {

  it('should get total and indent', function (done) {

      request(app)
        .get('/api/indent')
        .expect('Content-type', /json/)
        .expect(200, function(err, res) {

          expect(res.body).to.have.property('indent');
          expect(res.body.total).to.equal('2676.00');
          done();
        });
  });

  afterEach(function(){

    reloadDatabase();
  });
});
