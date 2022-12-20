const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../db/models/User");

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

    res.status(201).json(user);
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

router.post('/token', async (req, res) => {
	const token = req.headers['authorization'].split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: "Token not found" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token" });
		}
		res.status(200).json({ message: "Token valid", userId: decoded.userId });
	}
	);

});

router.get("/user", async (req, res) => {

	const token = req.headers['authorization'].split(' ')[1];

	try {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
			if (err) {
				return res.status(403).json({ message: "Invalid token" });
			}
			
			const user = await User.findById(decoded.userId).exec();
			if (!user) {
				return res.status(404).json({ message: "User not found" }); //status 404 = not found
			}
			res.status(200).json(user);
		});
	} catch (error) {
			console.log(error.message);
			res.status(500).json({ message: "Internal server error" }); //status 500 = internal server error
	}
});

module.exports = router;