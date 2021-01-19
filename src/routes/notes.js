const express = require('express');
const router = express.Router();

router.get('/notes', (request, response) => {
    response.send('TODAS LAS NOTAS');
});

module.exports = router;