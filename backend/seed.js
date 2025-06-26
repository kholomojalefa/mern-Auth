const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    const email = "admin@gmail.com"; // 👈 change this to the actual user's email
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );

    if (updatedUser) {
      console.log("✅ User promoted to admin:", updatedUser);
    } else {
      console.log("⚠️ No user found with that email.");
    }

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
