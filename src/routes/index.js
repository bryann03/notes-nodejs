const { response } = require('express');
const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('Index');
})

router.get('/about', (request, response) => {
    response.send('ABOUT')
})
module.exports = router;