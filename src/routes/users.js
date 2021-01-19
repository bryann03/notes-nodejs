const express = require('express');
const router = express.Router();

router.get('/users/signin', (request, response) => {
    response.send('SIGN IN');
});

router.get('/users/signup', (request, response) => {
    response.send('SIGN UP');
});

module.exports = router;