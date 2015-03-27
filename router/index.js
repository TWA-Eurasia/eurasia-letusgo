module.exports = function (app) {

    app.use('/helloWorld', require('./route/helloWorld'));

    app.use('/api/item', require('./route/item'));
    app.use('/:user/cart',require('./route/cart'));
};
