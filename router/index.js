module.exports = function (app) {

    app.use('/helloWorld', require('./route/helloWorld'));
    app.use('/', require('./route/home'));

    app.use('/api/item', require('./route/item'));
};
