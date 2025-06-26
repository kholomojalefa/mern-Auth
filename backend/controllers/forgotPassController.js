const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15min
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const html = `
      <h2>Reset Password</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `;

    await sendEmail(user.email, "Password Reset", html);

    return res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    console.error("Forgot password error:", err.message);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = forgotPassword;
