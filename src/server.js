const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");

const DBCONN = require("./config/database");
const errHandler = require("./middleWare/errHandler");
const UserRoutes = require("./routes/userRoutes");
const NotesRoutes = require("./routes/notesRoutes");

DBCONN();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/user", UserRoutes);
app.use("/notes", NotesRoutes);

app.use(errHandler);

app.use("*", (req, res) => {
	res.json({ message: "no url like that boi" });
});

mongoose.connection.once("open", () => {
	app.listen(PORT, () => {
		console.log(PORT);
	});
});
