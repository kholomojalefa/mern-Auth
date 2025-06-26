const User = require("../models/User");
const sendToken = require("../utils/sendToken");

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

    //token
    sendToken(user, res, "Registration Successful!");
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = register;
