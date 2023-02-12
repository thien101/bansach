const mongoose = require('mongoose');

async function connectToDB(){
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect('mongodb://127.0.0.1:27017/QLSach');
        console.log('Successfully !!!');
    } catch (error) {
        console.log('Failed !!!');
    }
}

module.exports = { connectToDB };   