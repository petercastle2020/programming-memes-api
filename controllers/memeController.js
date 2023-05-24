const mongoose = require("mongoose");
const Meme = require("../models/memeModel");

const addMeme = async (req, res) => {
  console.log("from addMeme func");

  try {
    const newMeme = await Meme.create(req.body);
    if (newMeme) {
      res.status(200).json(newMeme);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to upload meme" });
  }
};

module.exports = { addMeme };
