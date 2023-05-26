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

const specificLanguage = async (req, res) => {
  const language = req.params.language;
  console.log(`from specific language - ${language}.`);
};
// general memes
const general = async (req, res) => {
  const query = req.params.general;
  console.log(`grom general memes. + ${query}`);
};

module.exports = { addMeme, specificLanguage, general };
