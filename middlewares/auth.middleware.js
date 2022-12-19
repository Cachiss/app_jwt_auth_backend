const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

export const createToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 horas
    });
};

