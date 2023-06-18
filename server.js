require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const memeRoutes = require("./routes/memeRoute");
const userRoutes = require("./routes/userRoute");
const cloudinaryRoutes = require("./routes/cloudinaryRoute");

// express app
const app = express();

// Serve static files from the public folder
app.use(express.static("public"));

// middleware
app.use(express.json());

// KEEP IT HERE WITHOUT SHOWING ON LIVE LOGS.
// app.use((req, res, next) => {
//   console.log(
//     "path >",
//     req.path,
//     "||| body >",
//     req.body,
//     "||| method >",
//     req.method
//   );
//   next();
// });

// Routes

app.use("/api/cloudinary", cloudinaryRoutes);

app.use("/api/user", userRoutes);

app.use("/api/meme", memeRoutes);

// Catch-all route to redirect to the documentation page
app.get("*", (req, res) => {
  res.redirect("/documentation.html");
});

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("server running on port: " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
