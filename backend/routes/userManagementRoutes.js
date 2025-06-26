// routes/roleRoutes.js
const express = require("express");
const router = express.Router();
const {
  updateUserRole,
  getAllUsers,
} = require("../controllers/adminController");
const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

router.get("/users", verifyToken, checkRole("admin"), getAllUsers);
router.patch(
  "/users/:id/role",
  verifyToken,
  checkRole("admin"),
  updateUserRole
);

module.exports = router;
