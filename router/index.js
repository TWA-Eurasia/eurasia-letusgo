'use strict';

module.exports = function (app) {

  app.use('/', require('./route/index'));
  app.use('/items', require('./route/itemDetails'));
  app.use('/cart', require('./route/cart'));
  app.use('/indent', require('./route/indentPage'));
  app.use('/success', require('./route/success'));
  app.use('/register', require('./route/register'));
  app.use('/verification',require('./route/verification'));
  app.use('/retrievePassword',require('./route/retrievePassword'));


  app.use('/api/item', require('./route/item'));
  app.use('/api/user', require('./route/user'));
  app.use('/api/indent', require('./route/indent'));
  app.use('/api/sessions', require('./route/session'));

  app.use('/admin', require('./route/admin'));
  app.use('/admin/itemsManagement', require('./route/itemsManagement'));
  app.use('/admin/categoriesManagement', require('./route/categoriesManagement'));
};
