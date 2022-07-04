const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	title: { type: String, required: true },
	body: { type: String, required: true },
});

module.exports = mongoose.model("notes", NotesSchema);
