const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date
    }
})

const Note = model("note", noteSchema);

module.exports = Note;