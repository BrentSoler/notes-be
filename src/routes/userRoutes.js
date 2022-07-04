const express = require("express");
const router = express.Router();
const { registerUser, logInUser, getInfo } = require("../controller/userController");
const PROTECT = require("../middleWare/authHandler");

router.route("/register").post(registerUser);
router.route("/login").post(logInUser);
router.route("/").get(PROTECT, getInfo);

module.exports = router;
