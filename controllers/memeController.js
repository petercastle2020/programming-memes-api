const mongoose = require("mongoose");
const Meme = require("../models/memeModel");

const postMeme = async (req, res) => {
  try {
    const newMeme = await Meme.create(req.body);
    if (newMeme) {
      res.status(200).json(newMeme);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to upload meme" });
  }
};

const deleteMeme = async (req, res) => {
  try {
    const { id } = req.params;

    const meme = await Meme.findById(id);

    if (!meme) {
      return res.status(404).json({ error: "Meme not found." });
    }

    await Meme.deleteOne({ _id: id });

    res.json({ message: "Meme deleted successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the meme." });
  }
};

const getSpecificLanguageMeme = async (req, res) => {
  const languageQuery = req.params.language;
  console.log(`QUERY IN SPECIFIC MEME - ${language}.`);
  try {
    const foundRandomLanguageMeme = await Meme.aggregate([
      { $match: { language: languageQuery } },
      { $sample: { size: 1 } },
    ]);

    if (!foundRandomLanguageMeme) {
      return res.status(404).json({ error: "Language meme not found." });
    }

    res.status(200).json(foundRandomLanguageMeme);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred fetching 'specificLanguage' meme." });
  }
};

const getGeneralMeme = async (req, res) => {
  try {
    const query = "general";
    const foundRandomGeneralMeme = await Meme.aggregate([
      { $match: { language: query } },
      { $sample: { size: 1 } },
    ]);

    if (!foundRandomGeneralMeme) {
      return res.status(404).json({ error: "general meme not found." });
    }
    res.status(200).json(foundRandomGeneralMeme);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred fetching 'general' meme." });
  }
};

module.exports = {
  postMeme,
  deleteMeme,
  getSpecificLanguageMeme,
  getGeneralMeme,
};
