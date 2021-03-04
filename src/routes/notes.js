const { response, request } = require('express');
const express = require('express');
const router = express.Router();
const { isAuth } = require('../helpers/auth');
const Note = require('../models/Note');

router.get('/notes/add', (request, response) => {
    response.render('notes/new-note');
});

router.post('/notes/new-note', async (request, response) => {
    //DESESTRUCT
    const {title, description} = request.body;
    //VALIDACIÓN DE ERRORES
    const errors = [];
    if(!title){
        errors.push({text: 'Please insert a title'});
    }
    if(!description){
        errors.push({text: 'Please insert a description'});
    }
    //SI EXISTEN ERRORES, RENDERIZAMOS OTRA VEZ LA VISTA DEL FORM Y LE PASAMOS LA LISTA DE ERRORES
    if(errors.length > 0){
        response.render('notes/new-note', {
            errors,
            title,
            description
        });
    }
    else{
        const newNote = new Note({title, description});
        await newNote.save();
        request.flash('success_msg', 'Note added successfully!');
        response.redirect('/notes');
    }
});

router.get('/notes', async (request, response) => {
    //EL '.lean()' PARA OBTENERLO EN FORMATO JSON-OBJECT
    const datosNotes = await Note.find().lean().sort({date: 'desc'});
    response.render('notes/all-notes', { datosNotes });
});

router.get('/notes/edit/:id', async (request, response) => {
    const note = await Note.findById(request.params.id).lean();
    response.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', async (request, response) => {
    const {title, description} = request.body;
    await Note.findByIdAndUpdate(request.params.id, {title, description});
    request.flash('success_msg', 'Note updated successfully!');
    response.redirect('/notes');
});

router.delete('/notes/delete/:id', async (request, response) => {
    await Note.findByIdAndDelete(request.params.id);
    request.flash('success_msg', 'Note deleted successfully!');
    response.redirect('/notes');
})

module.exports = router;