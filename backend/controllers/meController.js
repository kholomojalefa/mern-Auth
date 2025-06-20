const me = async (req, res) => {
  try {
    // req.user is already populated by the middleware
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.status(200).json({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      createdAt: req.user.createdAt,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = me;
