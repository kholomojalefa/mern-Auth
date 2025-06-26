const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const sendToken = require("../utils/sendToken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    // If not, create one (you can add username generation logic)
    if (!user) {
      user = await User.create({
        email,
        username: name.split(" ")[0].toLowerCase() + Date.now(), // make a username e.g kholo1718890993052
        password: process.env.GOOGLE_SECRET_PASSWORD,
        role,
        authType: "google",
      });
    }

    // Send JWT in cookie
    sendToken(user, res);
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(401).json({ error: "Invalid Google token" });
  }
};

module.exports = googleAuth;
