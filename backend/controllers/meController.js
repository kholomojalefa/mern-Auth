const me = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { _id, username, email, role, createdAt } = req.user;

    return res.status(200).json({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      createdAt: req.user.createdAt,
    });
  } catch (err) {
    console.error("Me route error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = me;
