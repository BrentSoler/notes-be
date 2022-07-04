const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const PROTECT = asyncHandler(async (req, res, next) => {
	if (!req.headers.authorization) {
		res.status(400);
		throw new Error("ERROR:not authorized");
	}

	if (!req.headers.authorization.startsWith("Bearer")) {
		res.status(400);
		throw new Error("ERROR:not authorized");
	}

	try {
		const token = req.headers.authorization.split(" ")[1];

		const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

		const userData = await User.findById(decodedToken.id).select("-password");

		req.user = userData;

		next();
	} catch {
		res.status(400);
		throw new Error("ERROR:not authorized");
	}
});

module.exports = PROTECT;
