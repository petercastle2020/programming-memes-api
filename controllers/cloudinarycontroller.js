const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// https://res.cloudinary.com/dbtdebbei/image/upload/v1685556682/general-programming-memes/kwfimzrwhoo6hetrzwdu.webp
const extractPublicIdFromUrl = (url) => {
  const publicId = url.split("/").pop().split(".")[0];
  return publicId;
};

const getAllImageURLs = (req, res) => {
  const collectionName = req.params.collectionName;
  const maxNumberOfURLs = 100;

  cloudinary.api.resources(
    {
      type: "upload",
      prefix: `${collectionName}/`,
      max_results: maxNumberOfURLs,
    },
    (error, result) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: "Failed to fetch image URLs from Cloudinary." });
      } else {
        const urls = result.resources.map((resource) => resource.url);
        res.status(200).json({ urls });
      }
    }
  );
};

module.exports = { getAllImageURLs, extractPublicIdFromUrl };
