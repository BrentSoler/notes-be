const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
	const { name, password } = req.body;

	if (!name && !password) {
		res.status(400);
		throw new Error("missing credentials");
	}

	const findUser = await User.find({ name: name });

	if (findUser.length > 0) {
		res.status(400);
		throw new Error("name already exists");
	}

	const salt = await bcrypt.genSalt(10);
	const hashPass = await bcrypt.hash(password, salt);

	const userCreate = await User.create({ name: name, password: hashPass });

	res.status(200).json({
		message: "successfully made an account!",
		data: {
			name: userCreate.name,
			token: generateToken(userCreate._id),
		},
	});
});

const logInUser = asyncHandler(async (req, res) => {
	const { name, password } = req.body;

	if (!name && !password) {
		res.status(400);
		throw new Error("missing credentials");
	}

	const findUser = await User.findOne({ name: name });

	if (!findUser) {
		res.status(400);
		throw new Error("no users does not exists");
	}

	if (!(await bcrypt.compare(password, findUser.password))) {
		res.status(400);
		throw new Error("wrong password");
	}

	res.status(200).json({
		message: "successfully logged in!",
		data: {
			name: findUser.name,
			token: generateToken(findUser._id),
		},
	});
});

const getInfo = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, logInUser, getInfo };
