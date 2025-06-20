const dashboard = (req, res) => {
  res.json({
    message: `Hello ${req.user.username}, this is your protected dashboard.`,
    user: req.user,
  });
};

module.exports = dashboard;
