'use strict';

var indexController = require('../../controller/index');

describe('index', function () {
  var session;
  var reqMock = {};
  var resMock = {};

  afterEach(function (done) {

    reloadDatabase(done);
  });

  describe('getIndexInfo', function () {

    it('should return index page with data contains of mainCategories, items, pageCount and so on', function (done) {

      session = {currentUserName: 'Jacob KANG'};
      reqMock.session = session;

      resMock.render = function (view, object) {

        expect(view).to.equal('index');

        expect(object.currentUserName).to.equal('Jacob KANG');
        expect(object.mainCategories.length).to.equal(10);
        expect(object.items.length).to.equal(8);
        expect(object.pageCount).to.equal(2);
        expect(object.currentPage).to.equal(1);
        expect(object.isCategory).to.equal(false);

        done();
      };

      indexController.getIndexInfo(reqMock, resMock);
    });
  });

  describe('getRecommendItemsByPageNumber', function () {

    it('should return recommend items in certain pageNumber', function (done) {

      reqMock.params = {

        pageNumber: 2
      };

      resMock.render = function (view, object) {

        expect(view).to.equal('index');
        expect(object).to.have.property('mainCategories');
        expect(object).to.have.property('currentCategory');
        expect(object).to.have.property('items');
        expect(object).to.have.property('pageCount');
        expect(object).to.have.property('currentPage');
        expect(object).to.have.property('isCategory');

        expect(object.mainCategories.length).to.equal(10);
        expect(object.items.length).to.equal(3);
        expect(object.pageCount).to.equal(2);
        expect(object.currentPage).to.equal(2);
        expect(object.isCategory).to.equal(false);

        done();
      };

      indexController.getRecommendItemsByPageNumber(reqMock, resMock);
    });
  });

  describe('getItemsByCategoryId', function () {

    it('should return items of a certain category', function (done) {

      reqMock.params = {

        id: '5523bc489294d58a8e06c387'
      };

      resMock.render = function (view, object) {

        expect(view).to.equal('index');
        expect(object).to.have.property('mainCategories');
        expect(object).to.have.property('currentCategory');
        expect(object).to.have.property('items');
        expect(object).to.have.property('pageCount');
        expect(object).to.have.property('currentPage');
        expect(object).to.have.property('isCategory');

        expect(object.mainCategories.length).to.equal(10);
        expect(object.items.length).to.equal(4);
        expect(object.pageCount).to.equal(1);
        expect(object.currentPage).to.equal(1);
        expect(object.isCategory).to.equal(true);

        done();
      };

      indexController.getItemsByCategoryId(reqMock, resMock);

    });
  });

  describe('getItemsByCategoryIdAndPageNumber', function () {

    it('should return items of a certain and a certain pageNumber', function (done) {

      reqMock.params = {

        id: '5523bc489294d58a8e06c387',
        pageNumber: 2
      };

      resMock.render = function (view, object) {

        expect(view).to.equal('index');
        expect(object).to.have.property('mainCategories');
        expect(object).to.have.property('currentCategory');
        expect(object).to.have.property('items');
        expect(object).to.have.property('pageCount');
        expect(object).to.have.property('currentPage');
        expect(object).to.have.property('isCategory');

        expect(object.mainCategories.length).to.equal(10);
        expect(object.items.length).to.equal(0);
        expect(object.pageCount).to.equal(1);
        expect(object.currentPage).to.equal(2);
        expect(object.isCategory).to.equal(true);

        done();
      };

      indexController.getItemsByCategoryIdAndPageNumber(reqMock, resMock);

    });
  });
});
