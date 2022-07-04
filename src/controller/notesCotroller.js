const asyncHandler = require("express-async-handler");
const Notes = require("../models/notesModel");

const createNotes = asyncHandler(async (req, res) => {
	const { title, body } = req.body;

	if (!title && !body) {
		res.status(400);
		throw new Error("ERROR: missing fields");
	}

	const notesData = await Notes.create({ user_id: req.user.id, title: title, body: body });

	res.status(200).json({ message: "SUCCESS:successfully posted", data: notesData });
});

const getNotes = asyncHandler(async (req, res) => {
	const notesData = await Notes.find({ user_id: req.user.id });

	res.status(200).json({
		message: "SUCCESS: collected data",
		data: { count: notesData.length, posts: notesData },
	});
});

const updateNote = asyncHandler(async (req, res) => {
	const { id } = req.query;
	const { title, body } = req.body;

	if (!id) {
		res.status(400);
		throw new Error("ERROR: no id sent");
	}
	const noteData = await Notes.findById(id);

	if (!noteData) {
		res.status(400);
		throw new Error("ERROR: no id exists");
	}

	if (req.user.id != noteData.user_id) {
		res.status(400);
		throw new Error("CAUTION: you do not own this post");
	}

	if (!title && !body) {
		res.status(400);
		throw new Error("ERROR: missing fields");
	}

	const updatedNote = await Notes.findByIdAndUpdate(id, {
		user_id: req.user.id,
		title: !title ? noteData.title : title,
		body: !body ? noteData.body : body,
	});

	res.status(200).json({
		message: "SUCCESS: updated data",
		data: updatedNote,
	});
});

const deleteNote = asyncHandler(async (req, res) => {
	const { id } = req.query;

	if (!id) {
		res.status(400);
		throw new Error("ERROR: no id sent");
	}

	const noteData = await Notes.findById(id);

	if (!noteData) {
		res.status(400);
		throw new Error("ERROR: no id exists");
	}

	if (req.user.id != noteData.user_id) {
		res.status(400);
		throw new Error("CAUTION: you do not own this post");
	}

	const updatedNote = await Notes.findByIdAndDelete(id);

	res.status(200).json({
		message: "SUCCESS: deleted data",
		data: noteData,
	});
});

module.exports = { createNotes, getNotes, updateNote, deleteNote };
