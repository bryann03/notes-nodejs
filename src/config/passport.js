const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    //Busqueda en BBDD
    const user = await User.findOne({email: email});
    if( user ){
        const matchPassword = await User.matchPassword(password);
        if(matchPassword){
            return done(null, user);
        }
        else{
            return done(null, false, {message: 'Password not match!'});
        }
    }
    else{
        return done(null, false, {message: 'User not found!'});
    }
}));