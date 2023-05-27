const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const requireAdminRole = require("../middleware/requireAdminRole");

const {
  postMeme,
  deleteMeme,
  getSpecificLanguageMeme,
  getGeneralMeme,
} = require("../controllers/memeController");

router.post("/memes", requireAuth, requireAdminRole, postMeme);

router.delete("/memes/:id", deleteMeme);

// get specific language meme
router.get("/language/:language", getSpecificLanguageMeme);

// general meme
router.get("/:general", getGeneralMeme);

module.exports = router;
