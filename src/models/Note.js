const mongoose = require('mongoose');
//DE 'moongoose' SOLO QUEREMOS EL 'Schema' PARA CREAR DICHO Schema de datos
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: String }
});

module.exports = mongoose.model('NoteSchema', NoteSchema);
