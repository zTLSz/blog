const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title     : { type: String },
});

mongoose.model('Note', NoteSchema);

const Note = mongoose.model('Note');

return function setUpConnection() {
    mongoose.connect('mongodb://localhost:27017/test');
}

function listNotes(id) {
    return Note.find();
}

function createNote(data) {
    const note = new Note({
        title: data.title,
    });

    return note.save();
}

function deleteNote(id) {
    return Note.findById(id).remove();
}
