const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const { request } = require('http');

//INITIALIZATIONS
const app = express();
require('./database');

//SETTINGS

// -> Si existe un puerto, lo toma sino pilla el puerto 3000
app.set('port', process.env.PORT | 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    //el 'path-join' simplemente sirve para indicale la ruta de donde se encuentran los archivos
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
// -> Seteamos toda la configuración para el 'motor de las vistas' ('view engine') llamado '.hbs'
app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//GLOBAL VARIABLES
app.use( (request, response, next) => {
    response.locals.success_msg = request.flash('success_msg');
    response.locals.error_msg = request.flash('error_msg');
    next();
});


//ROUTES
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//SERVER START
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});