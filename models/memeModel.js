const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memeSchema = new Schema(
  {
    title: String,
    description: String,
    imageUrl: { type: String, require: true },
    cloudinaryPublicId: { type: String, require: true },
    language: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meme", memeSchema);
