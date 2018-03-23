import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title     : { type: String },
});

mongoose.model('Note', NoteSchema);
