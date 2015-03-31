module.exports = function (app) {

    app.use('/', require('./route/home'));
    app.use('/helloWorld', require('./route/helloWorld'));
    app.use('/itemDetails', require('./route/itemDetails'));
    app.use('/index', require('./route/index'));

    app.use('/api/item', require('./route/item'));

    app.use('/orderList', require('./route/orderList'));
};
