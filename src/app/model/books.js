const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Book = new Schema ({
    name: {type: String},
    image: {type: String},
    author: {type: String},
    category: {type: String},
})

Book.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Book', Book); 