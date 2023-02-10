const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    idUser: {
        type: Array,
        required: true,
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
