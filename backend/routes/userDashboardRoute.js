const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const dashboard = require("../controllers/dashboardController");

// Route: GET /dashboard
router.get("/", verifyToken, dashboard);

module.exports = router;
