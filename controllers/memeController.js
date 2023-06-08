const mongoose = require("mongoose");
const Meme = require("../models/memeModel");
const { extractPublicIdFromUrl } = require("./cloudinarycontroller");

const postMemeArray = async (req, res) => {
  try {
    const { urls, language } = req.body;

    const newMemesArray = [];
    const existingMemesArray = [];

    for (const url of urls) {
      const publicId = extractPublicIdFromUrl(url);

      const existingMeme = await Meme.findOne({ cloudinaryPublicId: publicId });

      if (existingMeme) {
        console.log(
          `Meme with public ID ${publicId} already exists. Skipping.`
        );
        existingMemesArray.push(existingMeme);
      } else {
        const newMeme = await Meme.create({
          imageUrl: url,
          language: language,
          cloudinaryPublicId: publicId,
        });
        console.log(`New meme with public ID ${publicId} created.`);
        newMemesArray.push(newMeme);
      }
    }

    res.status(200).json({ newMemesArray, existingMemesArray });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload meme array." });
  }
};

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

const patchMeme = async (req, res) => {
  try {
    const patchData = req.body;
    const { id } = req.params;

    const meme = await Meme.findById(id);

    if (!meme) {
      return res.status(404).json({ error: "Meme not found" });
    }

    const updatedMeme = await Meme.findByIdAndUpdate(
      { _id: id },
      { ...patchData },
      { new: true }
    );

    if (updatedMeme) {
      res.status(200).json(updatedMeme);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the meme" });
  }
};

const getSpecificLanguageMeme = async (req, res) => {
  const languageQuery = req.params.language;

  try {
    if (
      !languageQuery ||
      (languageQuery !== "python" && languageQuery !== "javascript")
    ) {
      res.status(400).json({ error: "Invalid language parameter" });
      return;
    }

    const foundRandomLanguageMeme = await Meme.aggregate([
      { $match: { language: languageQuery } },
      { $sample: { size: 1 } },
    ]);

    if (!foundRandomLanguageMeme || foundRandomLanguageMeme.length === 0) {
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

    if (!foundRandomGeneralMeme || !foundRandomGeneralMeme.length === 0) {
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
  postMemeArray,
  postMeme,
  deleteMeme,
  getSpecificLanguageMeme,
  getGeneralMeme,
  patchMeme,
};
