const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/jwt_app", {
            useNewUrlParser: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;
