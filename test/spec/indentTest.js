describe('GET api/indent', function () {

  it('should get total and indent', function (done) {

      request(app)
        .get('/api/indent')
        .expect('Content-type', /json/)
        .expect(200, function(err, res) {

          expect(res.body).to.have.property('indent');
          done();
        });
  });

  afterEach(function(){

    Item.remove();
    CartItem.remove();
    Cart.remove();
    Category.remove();
    Indent.remove();

    Item.create(items);
    CartItem.create(cartItems);
    Cart.create(carts);
    Category.create(categories);
    Indent.create(indents);
  });
});
