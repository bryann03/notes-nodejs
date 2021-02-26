const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    //Busqueda en BBDD
}));