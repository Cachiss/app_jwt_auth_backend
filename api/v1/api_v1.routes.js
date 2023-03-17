const router = require("express").Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../db/models/User");
const Todo = require("../../db/models/Todo");
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

// actualizar usuario
router.put("/updateUser", verifyToken, async (req, res) => {
  const { name, email, password, phone } = req.body;
  const id = req.user._id;

  // actualizar usuario
  await User.findByIdAndUpdate(id, req.body);
  res.status(200).json({ message: "User updated" });
});

router.delete("/deleteUser", verifyToken, async (req, res) => {
  const id = req.user._id;
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted" });
});

router.get("/users", verifyToken, async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});


// todo methods 
router.post('/createTodo', verifyToken, async (req, res) => {
  const { title, description, isCompleted } = req.body;
  const todo = new Todo({
    title,
    description,
    isCompleted,
    idUser: req.user._id
  });
  await todo.save();
  res.status(201).json({
    message: "Todo created",
    todo
  });
});

router.get('/todos', verifyToken, async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

router.get('/todosUser', verifyToken, async (req, res) => {
  const idUser = req.user._id;
  const todos = await Todo.find({idUser});
  res.status(200).json(todos);
});

router.put('/updateTodo', verifyToken, async (req, res) => {
  const { title, description, isCompleted } = req.body;
  const { id } = req.query;

  // actualizar todo
  await Todo.findByIdAndUpdate(id, {
    title,
    description,
    isCompleted,
  });
  res.status(200).json({ message: "Todo updated" });
});

router.delete('/deleteTodo/:id', verifyToken, async (req, res) => {
  const { id } = req.query;
  await Todo.findByIdAndDelete(id);
  res.status(200).json({ message: "Todo deleted" });
});


module.exports = router;