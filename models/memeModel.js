const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// "title": "Meme title 1",
//     "description": "Meme description 1",
//     "imageUrl": "https://example.com/path/to/image1.png",
//     "language": "Python"

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
