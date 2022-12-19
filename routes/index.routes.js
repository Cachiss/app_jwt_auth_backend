const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('<h1> Este es el backend de jwt app </h1>');
});


module.exports = router;