const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
//INITIALIZATIONS
const app = express();

//SETTINGS

//Si existe un puertom, lo toma sino pilla el puerto 3000
app.set('port', process.env.PORT | 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app-get('views'), 'partials'),
    extname: '.hbs'
}));
//Seteamos toda la configuración para el 'motor de las vistas' ('view engine') llamado '.hbs'
app.set('view engine', '.hbs');

//MIDDLEWARES

//GLOBAL VARIABLES

//ROUTES

//STATIC FILES

//SERVER START
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});