const express = require("express");
const { fetchUser } = require("../middlewares/fetchUser");
const { fetchAllNotes, addNotes, updateNotes, deleteNotes } = require("../controllers/note");
const { body } = require("express-validator");

const router = express.Router();

router.get("/fetchallnotes", fetchUser, fetchAllNotes)

router.post("/addnotes", [
    body("title", "Title must be 3 characters").isLength({ min: 3 }),
    body("desc", "Description must be 4 characters").isLength({ min: 4 })
], fetchUser, addNotes)

router.put("/updatenotes/:noteId", fetchUser, updateNotes)

router.delete("/deletenotes/:noteId", fetchUser, deleteNotes)

module.exports = router;