const express = require("express");

const router = express.Router();

const { getAllImageURLs } = require("../controllers/cloudinarycontroller");

router.get("/resources/:collectionName", getAllImageURLs);

module.exports = router;
