'use strict';

describe('cart', function () {

  afterEach(function () {
    reloadDatabase();
  });

  describe('getCart', function () {

    var resMock = {};
    var reqMock = {};

    var cartController = require('../../controller/cart');

    it('shoulde return cart', function (done) {

      resMock.render = function (view, object) {

        expect(view).to.equal('cart');
        expect(object).to.have.property('cartItems');
        expect(object).to.have.property('total');
        expect(object.total).to.equal(3334.50);

        done();
      };

      cartController.getCart(reqMock, resMock);
    });
  });

  describe('addToCart', function () {

    var resMock = {};
    var reqMock = {};

    var cartController = require('../../controller/cart');

    it('shoulde return cart', function (done) {

      reqMock.body = {number: 6};
      reqMock.params = {id: '5523cea79294d58a8e06c3bf'};

      resMock.sendStatus = function (object) {
        expect(object).to.equal(200);

        done();
      };
      cartController.addToCart(reqMock, resMock);
    });
  });
});

