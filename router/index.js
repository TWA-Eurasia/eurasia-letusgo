module.exports = function (app) {

    app.use('/', require('./route/home'));
    app.use('/helloWorld', require('./route/helloWorld'));
    app.use('/itemDetails', require('./route/itemDetails'));


    app.use('/api/item', require('./route/item'));
    app.use('/cart',require('./route/cart'));

    app.use('/indent', require('./route/indent'));
    app.use('/success', require('./route/success'));
};
