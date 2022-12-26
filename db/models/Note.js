const moongoose = require('mongoose');
const connectDb = require('../connection');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();
connectDb();

const userSchema = new moongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Note = moongoose.model('Note', userSchema);

module.exports = Note;
