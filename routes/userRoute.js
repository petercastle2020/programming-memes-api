const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const requireAdminRole = require("../middleware/requireAdminRole");
const { signupUser, loginUser } = require("../controllers/userController");

router.post("/signup", requireAuth, requireAdminRole, signupUser);

router.post("/login", loginUser);

module.exports = router;
