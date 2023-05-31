const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const requireAdminRole = require("../middleware/requireAdminRole");
const rateLimiter = require("../middleware/rateLimiter");

const {
  postMemeArray,
  postMeme,
  deleteMeme,
  getSpecificLanguageMeme,
  getGeneralMeme,
  patchMeme,
} = require("../controllers/memeController");

router.post("/postMemeArray", requireAuth, requireAdminRole, postMemeArray);

router.post("/", requireAuth, requireAdminRole, postMeme);

router.delete("/:id", requireAuth, requireAdminRole, deleteMeme);

router.patch("/:id", requireAuth, requireAdminRole, patchMeme);

// get specific language meme
router.get("/language/:language", rateLimiter, getSpecificLanguageMeme);

// general meme
router.get("/general", rateLimiter, getGeneralMeme);

module.exports = router;
