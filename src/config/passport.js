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

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id_user, done) => {
    const user = await User.findById({_id: id_user});
    if( user ){
        done(null, user);
    }
});