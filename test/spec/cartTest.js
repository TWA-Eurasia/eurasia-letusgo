'use strict';

describe('cart', function() {

  afterEach(function(){

    reloadDatabase();
  });

  describe('getCart', function() {

    var resMock = {};
    var reqMock = {};

    var cartController = require('../../controller/cart');

    it('shoulde return cart', function(done) {

      resMock.render = function(view, object){

        expect(view).to.equal('cart');
        expect(object).to.have.property('cartItems');
        expect(object).to.have.property('total');
        expect(object.total).to.equal(3582);

        done();
      };

      cartController.getCart(reqMock, resMock);
    });
  });
});


//'use strict';
//
//var app = require('../../app.js');
//
//var router = require('../../router/route/cart');
//
//describe('cart', function() {
//
//  afterEach(function(){
//
//    reloadDatabase();
//  });
//
//  describe('GET /', function() {
//
//    it('should return 200 ok', function(done) {
//
//      request(app)
//        .get('/cart/')
//        .expect('Content-Type', /html/)
//        .expect(200)
//        .end(function(err, res) {
//          if(err) throw err;
//          done();
//        })
//    });
//  });
//
//  describe('GET /:id', function() {
//
//    it('should return correct inventory', function(done) {
//
//      request(app)
//        .get('/cart/cartItems/551cc20e47a654d14a280e9c')
//        .send({inventory: 234})
//        .expect(200)
//        .expect('Content-Type', /json/)
//        .end(function(err, res) {
//          if(err) {throw err;}
//          expect(res.body.inventory).to.equal(100);
//          done();
//        })
//    });
//  });
//
//  describe('POST /:id', function() {
//
//    it('should return 200 ok', function() {
//
//      request(app)
//        .post('/cart/:id')
//        .expect(200)
//        .end(function(err, res) {
//          if(err) {throw err;}
//        })
//    });
//  });
//
//  describe('POST /:id', function() {
//
//    it('should return aasdasd', function() {
//
//      request(app)
//        .post('/cart/551cc20e47a654d14a280e9b')
//        .expect(200)
//        .end(function(err, res) {
//          if(err) {throw err;}
//        })
//    });
//  });
//
//  //describe('GET /:amount', function() {
//  //
//  //  it('should return amount', function(done) {
//  //
//  //    request(app)
//  //      .get('/cart/:amount')
//  //      .expect(200)
//  //      .expect('Content-Type', /json/)
//  //      .end(function(err, res) {
//  //        if(err) {throw err;}
//  //        done();
//  //      })
//  //  });
//  //});
//
//  //describe('PUT /:id', function() {
//  //
//  //  it('should return number', function (done) {
//  //
//  //    request(app)
//  //      .put('/cart/551cc20e47a654d14a280e9c')
//  //      .send({number: 2, price: 10, total:150})
//  //      .expect(200)
//  //      .expect('Content-Type', /json/)
//  //      .end(function(err, res) {
//  //        if(err) {throw err;}
//  //        expect(res.body.subtotal).to.equal('20.00');
//  //        expect(res.body.total).to.equal('150.00');
//  //        done();
//  //    })
//  //  });
//  //});
//});
