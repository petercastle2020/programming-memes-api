const express = require("express");

const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const requireAdminRole = require("../middleware/requireAdminRole");
const { getAllImageURLs } = require("../controllers/cloudinarycontroller");

router.get(
  "/resources/:collectionName",
  requireAuth,
  requireAdminRole,
  getAllImageURLs
);

module.exports = router;
