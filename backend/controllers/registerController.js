const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });

    // Create user
    const user = await User.create({
      username,
      email,
      password, //password hased form the model
    });

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // Send cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = register;
