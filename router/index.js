module.exports = function (app) {

    app.use('/', require('./route/index'));
    app.use('/success', require('./route/success'));
    app.use('/indent', require('./route/indentPage'));
    app.use('/cart',require('./route/cart'));
    app.use('/items', require('./route/itemDetails'));

    app.use('/helloWorld', require('./route/helloWorld'));

    app.use('/api/item', require('./route/item'));
    app.use('/api/category', require('./route/category'));
    app.use('/api/user', require('./route/user'));
    app.use('/api/indent', require('./route/indent'));

};
