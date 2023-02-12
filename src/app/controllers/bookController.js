const Book = require('../model/books');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');


class bookController {
    //[GET] /search
    search(req, res, next) {
        let search = req.query.search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        // Book.find({$or: [{category: {$regex: search}}, {name :  {$regex: search}}]})
        //     .then((books) => {
        //         res.render('home', {
        //             books: mutipleMongooseToObject(books)
        //         })
        //     })
        //     .catch(next);
        
        Book.find({})
            .then((books) => {
                res.render('home', {
                    books: mutipleMongooseToObject(books.filter(book => {
                        return book.category.toLowerCase().includes(search) || book.name.toLowerCase().includes(search)
                    })),
                });
            })
            .catch(next);
    }

    //[GET] /create
    create(req, res, next) {
        res.render('books/create')
    }

    //[GET] /:id/edit
    edit(req, res, next) {
        Book.findById(req.params.id)
            .then((book) => {
                res.render('books/edit', {
                    book: mongooseToObject(book)
                })
            })
            .catch(next);
    }

    //[GET] /store
    store(req, res, next) {
        Book.find({})
            .then((books) => {
                res.render('books/store-book', {
                    books: mutipleMongooseToObject(books)
                })
            })
            .catch(next)
    }

    //[GET] /trash
    trash(req, res, next) {
        Book.findDeleted({})
            .then((books) => {
                res.render('books/trash-book', {
                    books: mutipleMongooseToObject(books)
                })
            })
            .catch(next)
    }

    //[POST] create book /store
    addbook(req, res, next) {
        req.body.img = 'https://files.fullstack.edu.vn/f8-prod/courses/2.png';
        const book = new Book(req.body);

        book.save()
            .then(res.redirect('/book/store'))
            .catch(next);
    }

    //[PUT]  /:id
    update(req, res, next) {
        req.body.img = 'https://files.fullstack.edu.vn/f8-prod/courses/2.png';
        const book = new Book(req.body);
        Book.updateOne({_id: req.params.id}, req.body)
            .then(res.redirect('/book/store'))
            .catch(next);
    }

    //[PATCH]  /:id/restore
    restore(req, res, next) {
        Book.restore({_id: req.params.id})
            .then(res.redirect('/book/store'))
            .catch(next);
    }

    //[DELETE]  /:id
    delete(req, res, next) {
        Book.delete({_id: req.params.id})
            .then(res.redirect('/book/store'))
            .catch(next);
    }

    forcedelete(req, res, next) {
        Book.deleteOne({_id: req.params.id})
            .then(res.redirect('/book/store'))
            .catch(next);
    }
}

module.exports = new bookController();