const express = require("express");
const router = express.Router();

const {
  addMeme,
  specificLanguage,
  general,
} = require("../controllers/memeController");

router.post("/addMeme", addMeme);

// get specific language meme
router.get("/language/:language", specificLanguage);

// general meme
router.get("/:general", general);

module.exports = router;
