const requireAdminRole = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          message: "Access denied. Only admin users can create new accounts.",
        });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { requireAdminRole };
