const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.json(req.user); //user info will be attached by the middleware
});

module.exports = router;
