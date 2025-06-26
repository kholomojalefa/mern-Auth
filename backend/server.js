require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");

const app = express();

//middleware
app.use(cookieParser()); //enable reading cookies
app.use(express.json());
app.use(helmet()); //{crossOriginResourcePolicy: false} useful when serving images/files
app.use(cors(corsOptions)); //enable CORS
//app.use("/uploads", express.static("uploads")); - for files

//routes
//auth
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//dashboard
const dashboardRoutes = require("./routes/userDashboardRoute");
app.use("/api/dashboard", dashboardRoutes);

//admin
const adminRoutes = require("./routes/userManagementRoutes");
app.use("/api/admin", adminRoutes);

//global error handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

//connect to db and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("Connection failed!", err));
