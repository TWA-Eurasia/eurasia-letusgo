module.exports = function (app) {

    app.use('/', require('./route/index'));
    app.use('/helloWorld', require('./route/helloWorld'));
    app.use('/itemDetails', require('./route/itemDetails'));

    app.use('/api/item', require('./route/item'));
    app.use('/api/category', require('./route/category'));
    app.use('/cart',require('./route/cart'));

    app.use('/indent', require('./route/indent'));
    app.use('/success', require('./route/success'));
    app.use('/api/user', require('./route/user'));
};
