const jwt = require("jsonwebtoken");

const sendToken = (user, res, message = null) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // send only on HTTPS in prod
    sameSite: "Lax",
    maxAge: 3600000, // 1 hour
  });

  //send user data back and a message
  const responseData = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };

  if (message) {
    responseData.message = message;
  }

  res.status(200).json(responseData);
};

module.exports = sendToken;
