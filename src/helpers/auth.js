const helpers = {};

helpers.isAuth = (req, res, next) => {
    if( req.isAuthenticated() ){
        //SI SE HA LOGEADO RETORNAMOS 'next()' pa que continue con la siguiente función
        return next();
    }
    else{
        req.flash('error_msg', 'Not authorized');
        res.redirect('users/signin');
    }
};

module.exports = helpers;