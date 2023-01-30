const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://cachiss:${process.env.MONGO_PASSWORD}@cluster0.rvmyh73.mongodb.net/jwt_app`, {
            useNewUrlParser: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;
