'use strict';

describe('cart', function () {

  afterEach(function () {
    reloadDatabase();
  });

  //describe('getCart', function () {
  //
  //  var resMock = {};
  //  var reqMock = {};
  //
  //  var cartController = require('../../controller/cart');
  //
  //  it('shoulde return cart', function (done) {
  //
  //    resMock.render = function (view, object) {
  //
  //      expect(view).to.equal('cart');
  //      expect(object).to.have.property('cartItems');
  //      expect(object).to.have.property('total');
  //      expect(object.total).to.equal(3334.50);
  //
  //      done();
  //    };
  //
  //    cartController.getCart(reqMock, resMock);
  //  });
  //});

  //describe('addToCart', function () {
  //
  //  var resMock = {};
  //  var reqMock = {};
  //
  //  var cartController = require('../../controller/cart');
  //
  //  it('shoulde return cart', function (done) {
  //
  //    reqMock.body = {number: 12};
  //    reqMock.params = {id: '5523cea79294d58a8e06c3bf'};
  //
  //    resMock.sendStatus = function (object) {
  //      expect(object).to.equal(200);
  //
  //      done();
  //    };
  //    cartController.addToCart(reqMock, resMock);
  //  });
  //});

  //describe('addToCart', function () {
  //
  //  var resMock = {};
  //  var reqMock = {};
  //
  //  var cartController = require('../../controller/cart');
  //
  //  it('shoulde success push', function (done) {
  //
  //    reqMock.body = {number: 12};
  //    reqMock.params = {id: '551cc20e47a654d14a280e9b'};
  //
  //    cartController.addToCart(reqMock, resMock);
  //  });
  //});

  describe('changeCartItem', function () {

    var resMock = {};
    var reqMock = {};

    var cartController = require('../../controller/cart');

    it('shoulde return correct total and subtotal', function (done) {

      reqMock.body = {total: 120};
      reqMock.body = {price: 6};
      reqMock.body = {number: 10};

      reqMock.params = {id: '551cc20e47a654d14a280e9b'};

      resMock.send = function (object) {
        expect(object).to.have.property('total');
        expect(object).to.have.property('subtotal');
        //expect(object.total).to.equal(144.00);
        //expect(object.subtotal).to.equal(200);
        done();
      };
      cartController.changeCartItem(reqMock, resMock);
    });
  });

  describe('removeCartItem', function () {

    var resMock = {};
    var reqMock = {};

    var cartController = require('../../controller/cart');

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

    var resMock = {};
    var reqMock = {};

    var cartController = require('../../controller/cart');

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

    var resMock = {};
    var reqMock = {};

    var cartController = require('../../controller/cart');

    it('shoulde return correct total and subtotal', function (done) {

      reqMock.params = {id: '551cc20e47a654d14a280e9b'};

      resMock.send = function (object) {

        expect(object).to.have.property('inventory');
        expect(object.inventory).to.equal(100);

        done();
      };
      cartController.getInventory(reqMock, resMock);
    });
  });
});

