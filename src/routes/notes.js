const { response, request } = require('express');
const express = require('express');
const router = express.Router();

router.get('/notes/add', (request, response) => {
    response.render('notes/new-note');
});

router.post('/notes/new-note', (request, response) => {
    //DESESTRUCTURACIÓN
    const {title, description} = request.body;
    //VALIDACIÓN DE ERRORES
    const errors = [];
    if(!title){
        errors.push({text: 'Please insert a title'});
    }
    if(!description){
        errors.push({text: 'Please insert a description'});
    }
    //SI EXISTEN ERRORES, RENDERIZAMOS OTRAVES LA VISTA DEL FORM Y LE PASAMOS LA LISTA DE ERRORES
    if(errors.length > 0){
        response.render('notes/new-note', {
            errors,
            title,
            description
        });
    }
    else{
        response.send('ok');
    }
});

router.get('/notes', (request, response) => {
    response.send('TODAS LAS NOTAS');
});

module.exports = router;