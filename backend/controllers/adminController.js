const User = require("../models/User");

// PATCH /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  const { id } = req.params; // userId from URL
  const { role } = req.body; // newRole from body

  const allowedRoles = ["user", "admin"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role specified" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: `User role updated to ${role}`,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Update role error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password
    return res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

module.exports = { updateUserRole, getAllUsers };
