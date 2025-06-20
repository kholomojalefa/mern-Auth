const jwt = require("jsonwebtoken");
const User = require("../models/User");

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ error: "Invalid email or password" });

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ error: "Invalid email or password" });

//     // Create JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "3d",
//     });

//     // Set cookie
//     res
//       .cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "Strict",
//         maxAge: 3 * 24 * 60 * 60 * 1000,
//       })
//       .status(200)
//       .json({ message: "Login successful" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password); //using comparePassword from model
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = login;
