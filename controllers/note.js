const { validationResult } = require("express-validator");
const Note = require("../models/note");

let success = false;

async function fetchAllNotes(req, res) {
    try {
        const note = await Note.find({ user: req.user.id })

        success = true;
        return res.status(200).json({ success, note })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured" })
    }
}


async function addNotes(req, res) {
    try {
        //Destructure the request
        const { title, desc, tag } = req.body;

        //Validate the fields
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success, Error: errors.array()[0].msg })
        }

        //Add data in DB
        let note = await Note.create({
            title,
            desc,
            tag,
            user: req.user.id
        })

        note = await note.save();

        //Final
        success = true;
        return res.status(201).json({ success, note })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured" })
    }
}


async function updateNotes(req, res) {
    try {
        //Destructrue the request
        const { title, desc, tag } = req.body;

        //Create the new object
        const newNote = {};

        if (title) {
            newNote.title = title;
        }

        if (desc) {
            newNote.desc = desc;
        }

        if (tag) {
            newNote.tag = tag;
        }


        //Verified the note id first
        let note = await Note.findById(req.params.noteId)

        if (!note) {
            success = false;
            return res.status(404).json({ success, Error: "Note is not found" })
        }

        //Verified the note user and login user
        if (note.user.toString() !== req.user.id) {
            success = false;
            return res.status(404).json({ success, Error: "Not found" })
        }

        //Update note
        note = await Note.findByIdAndUpdate(req.params.noteId, { $set: newNote }, { new: true })

        //Final
        success = true;
        return res.status(200).json({ success, note })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured" })
    }
}


async function deleteNotes(req, res) {
    try {
        //Verified the note id first
        let note = await Note.findById(req.params.noteId)

        if (!note) {
            success = false;
            return res.status(404).json({ success, Error: "Note is not found" })
        }

        //Verified the note user and login user
        if (note.user.toString() !== req.user.id) {
            success = false;
            return res.status(404).json({ success, Error: "Not found" })
        }

        //Delete note
        note = await Note.findByIdAndDelete(req.params.noteId)

        //Final
        success = true;
        return res.status(200).json({ success, note })

    } catch (error) {
        console.log(error.message);
        success = false;
        return res.status(500).json({ success, Error: "Internal Server Error Occured" })
    }
}

module.exports = {
    fetchAllNotes,
    addNotes,
    updateNotes,
    deleteNotes,
}
