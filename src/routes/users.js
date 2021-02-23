const { request } = require('express');
const express = require('express');
const router = express.Router();

router.get('/users/signin', (request, response) => {
    response.render('users/signin');
});

router.get('/users/signup', (request, response) => {
    response.render('users/signup');
});

router.post('/users/signup', (request, response) => {
    const { name, email, password, confirm_password } = request.body;
    const errors = [];
    if( password != confirm_password ){
        errors.push({text: 'Password do not match'});
    }
    if( password.length < 4 ){
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if(errors.length > 0){
        response.render('users/signup', {errors, name, email, password, confirm_password});
    }
    else{
        response.send('ok');
    }
});
module.exports = router;