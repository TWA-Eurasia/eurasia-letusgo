module.exports = function (app) {

    app.use('/', require('./route/home'));
    app.use('/helloWorld', require('./route/helloWorld'));

    app.use('/api/item', require('./route/item'));

    app.use('/orderList', require('./route/orderList'));
};
