const express = require("express");
const router = express.Router();

const { addMeme } = require("../controllers/memeController");

router.post("/", addMeme);

module.exports = router;
