var itemsDetails = require('../../router/route/itemDetails.js');
var request = require('supertest');
describe('GET /', function () {
  it('it should return 200 ok', function (done){
    request(itemsDetails)
    .get('/')
    .expect(200,done);
  });
});
