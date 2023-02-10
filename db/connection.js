const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const connectDb = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(`mongodb+srv://cachiss:${process.env.MONGO_PASSWORD}@cluster0.rvmyh73.mongodb.net/jwt_app`, {
        useNewUrlParser: true,
        
    })
    .then(() => console.log('Mongo DB connected'))
    .catch((err) => console.log(err));

}

module.exports = connectDb;
