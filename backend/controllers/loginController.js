const sendToken = require("../utils/sendToken");
const User = require("../models/User");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    const isMatch = await user.comparePassword(password); //using comparePassword from model
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    sendToken(user, res, "Login successful");
  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = login;
