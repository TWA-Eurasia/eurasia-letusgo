module.exports = function (app) {

    app.use('/helloWorld', require('./route/helloWorld'));
    app.use('/itemDetails', require('./route/itemDetails'));

    app.use('/api/item', require('./route/item'));
};
