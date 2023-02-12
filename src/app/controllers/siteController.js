const Book = require('../model/books');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class siteController {
    //[GET] /
    index(req, res, next) {
        // Use Callback
        // Book.find({}, (err, book) => {
        //     if (!err) res.json(book);
        //     else res.status(400).json({err: 'Error'});
        // })
        //res.render('home');

        // Use Promise
        Book.find({})
            .then((books) => {
                 res.render('home', {
                     books: mutipleMongooseToObject(books)
                })
             })
            .catch(next);
    }
}

module.exports = new siteController();