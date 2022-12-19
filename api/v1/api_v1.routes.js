const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../../db/models/User');

router.get('/', (req, res) => {
    res.send('<h1>API v1 for JWT app</h1>'); 
});

router.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body;
    const user = new User({
        name,
        email,
        password,
        phone,
    });
    await user.save();

    res.status(201).json(user);
});

module.exports = router;