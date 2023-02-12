const bookRouter = require('./book');
const siteRouter = require('./site');

function route(app) {
    app.use('/book', bookRouter);
    app.use('/', siteRouter);
}

module.exports = route;