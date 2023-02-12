const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema ({
    name: {type: String},
    age: {type: Number, default: 1},
})

module.exports = mongoose.model('User', User);