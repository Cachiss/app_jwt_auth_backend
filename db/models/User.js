const mongoose = require('mongoose');
const connectDb = require('../connection');

connectDb();

const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
    phone: String,
});

module.exports = User;