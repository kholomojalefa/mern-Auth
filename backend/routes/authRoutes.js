const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const authLimiter = require("../middleware/rateLimiter");
const { validateRegister, validateLogin } = require("../middleware/validate");

const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const logout = require("../controllers/logoutController");
const me = require("../controllers/meController");
const forgotPassword = require("../controllers/forgotPassController");
const resetPassword = require("../controllers/resetPasswordController");
const googleAuth = require("../controllers/googleAuthController");

router.post("/register", authLimiter, validateRegister, register);
router.post("/login", authLimiter, validateLogin, login);
router.get("/logout", logout);
router.get("/me", verifyToken, me);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);
router.post("/google", googleAuth);

module.exports = router;
