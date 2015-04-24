'use strict';


describe('cart', function () {
  var resMock;
  var reqMock;
  var cartController = require('../../controller/cart');


  beforeEach(function() {
    resMock = {};
    reqMock = {};
  });

  afterEach(function (done) {
    reloadDatabase(done);
  });

  describe('getCart', function () {

    it('shoulde return cart', function (done) {
      reqMock.session = {
        currentUserName: 'yangmingkun'
      };

      resMock.render = function (view, object) {

        expect(view).to.equal('cart');
        expect(object).to.have.property('cartItems');
        expect(object.total).to.equal('3334.50');
        expect(object.currentUserName).to.equal('yangmingkun');

        done();
      };

      cartController.getCart(reqMock, resMock);
    });
  });

  describe('addToCart', function () {

    it('shoulde return 200 ok', function (done) {

      reqMock.body = {number: 12};
      reqMock.params = {id: '5523cea79294d58a8e06c3bf'};

      resMock.sendStatus = function (object) {
        expect(object).to.equal(200);

        done();
      };
      cartController.addToCart(reqMock, resMock);
    });
  });

  describe('addToCart', function () {

    it('shoulde can branch', function (done) {

      reqMock.body = {number: 12};
      reqMock.params = {id: '5523cea79294d58a8e06c07f'};

      resMock.sendStatus = function (object) {
        expect(object).to.equal(200);

        done();
      };
      cartController.addToCart(reqMock, resMock);
    });
  });

  describe('changeCartItem', function () {

    it('shoulde return correct total and subtotal', function (done) {

      reqMock.body = {total: 120,
                      price: 6.00,
                      number: 10};

      reqMock.params = {id: '551cc20e47a654d14a280e9e'};

      resMock.send = function (object) {
        expect(object.total).to.equal('90.00');
        expect(object.subtotal).to.equal('60.00');
        done();
      };
      cartController.changeCartItem(reqMock, resMock);
    });
  });

  describe('removeCartItem', function () {

    it('shoulde return correct total and subtotal', function (done) {

      reqMock.params = {id: '551cc20e47a654d14a280e9b'};

      resMock.send = function (object) {

        expect(object).to.have.property('cart');
        expect(object).to.have.property('total');
        expect(object.cart).to.have.property('cartItems');
        expect(object.total).to.equal(3334.50);
        done();
      };
      cartController.removeCartItem(reqMock, resMock);
    });
  });

  describe('getAmount', function () {

    it('shoulde return correct total and subtotal', function (done) {

      resMock.send = function (object) {

        expect(object).to.have.property('amount');
        expect(object.amount).to.equal(31);

        done();
      };
      cartController.getAmount(reqMock, resMock);
    });
  });

  describe('getInventory', function () {


    it('shoulde return correct total and subtotal', function (done) {

      reqMock.params = {id: '551cc20e47a654d14a280e9b'};

      resMock.send = function (object) {

        expect(object.inventory).to.equal(100);

        done();
      };
      cartController.getInventory(reqMock, resMock);
    });
  });
});

