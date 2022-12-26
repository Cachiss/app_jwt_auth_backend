const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../db/models/User");

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) return res.status(401).json({ message: "No authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.userId;
    const user = await User.findById(id);

    // si pongo un 404 de user not found pueden vulnerar a un usuario?
    if (!user) return res.status(401).json({ message: "No authorized" });

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

module.exports = verifyToken;
