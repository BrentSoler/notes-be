const express = require("express");
const router = express.Router();
const { createNotes, getNotes, updateNote, deleteNote } = require("../controller/notesCotroller");
const PROTECT = require("../middleWare/authHandler");

router
	.route("/")
	.get(PROTECT, getNotes)
	.post(PROTECT, createNotes)
	.put(PROTECT, updateNote)
	.delete(PROTECT, deleteNote);

module.exports = router;
