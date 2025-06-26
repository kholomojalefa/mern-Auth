const dashboard = (req, res) => {
  return res.status(200).json({
    message: `Hello ${req.user.username}, this is your protected dashboard.`,
    user: req.user,
  });
};

module.exports = dashboard;
