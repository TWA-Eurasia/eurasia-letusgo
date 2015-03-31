module.exports = function (app) {

    app.use('/', require('./route/home'));
    app.use('/helloWorld', require('./route/helloWorld'));
    app.use('/itemDetails', require('./route/itemDetails'));


    app.use('/api/item', require('./route/item'));
    app.use('/api/category', require('./route/category'));

    app.use('/orderList', require('./route/orderList'));
};
