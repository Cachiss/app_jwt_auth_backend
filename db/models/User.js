const mongoose = require('mongoose');
const connectDb = require('../connection');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: String,
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo',
        }
    ]
});

// Para que encripte la contraseña antes de crear el usuario o actualizarlo
userSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS)); 
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch(error){
        console.log(error);
        throw new Error(error); // Para que no se guarde el usuario
    }
});
userSchema.pre('update', async function (next) {
    try{
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS)); 
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }
    catch(error){
        console.log(error);
        throw new Error(error); // Para que no se guarde el usuario
    }
});

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;