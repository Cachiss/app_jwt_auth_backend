const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../db/models/User");
const verifyToken = require('../../middlewares/auth.middleware')

router.get("/", (req, res) => {
  res.send("<h1>API v1 for JWT app</h1>");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = new User({
      name,
      email,
      password,
      phone,
    });
    await user.save();

    res.status(201).json({
		message:"User created",
		user
	});
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/login", async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

	if (!user || !await(user.isValidPassword(password))) { 
    return res.status(403).json({ message: "email or password incorrect" });
  }
	const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
	res.status(200).json({ message: "Login success", token });
});

router.post('/token', verifyToken, (req, res) => {
	const token = req.token;
	res.status(200).json({
		message: "Token valid",
		token
	})
});

router.get("/getUser", verifyToken, (req, res) => {
	const user = req.user;
	res.status(200).json(user)
});

module.exports = router;