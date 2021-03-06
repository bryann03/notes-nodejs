const { request } = require('express');
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const passport = require('passport');

router.get('/users/signin', (request, response) => {
    response.render('users/signin');
});

//USAMO MÉTODO DE 'express/passport' DIRECTAMENTE PARA HACER EL 'logout'
router.get('/users/logout', (request, response) => {
    request.logout();
    response.redirect('/');
});

//AL passport.authenticate() LE PASAMOS EL NOMBRE DE LA AUTENTICACIÓN, EL CUAL POR DEFECTO ES 'local'
router.post('/users/signin', passport.authenticate('local', {
    //CONTROL DE ERRORES/SUCCESS
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (request, response) => {
    response.render('users/signup');
});

router.post('/users/signup', async (request, response) => {
    const { name, email, password, confirm_password } = request.body;
    const errors = [];
    if( name.length <= 0 ){
        errors.push({text: 'Please insert your name'});
    }
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
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            request.flash('error_msg', 'The email is already in use');
            response.redirect('/users/signup');
        }
        else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            try {
                await newUser.save();
                request.flash('success_msg', 'You are resgistered!');
                response.redirect('/users/signin');
            } catch (error) {
                console.log(error);
            }
        }
    }
});
module.exports = router;