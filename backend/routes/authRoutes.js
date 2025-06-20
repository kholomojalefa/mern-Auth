const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const logout = require("../controllers/logoutController");
const me = require("../controllers/meController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyToken, me); // Route: GET /auth/me

module.exports = router;
