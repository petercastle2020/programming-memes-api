require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const memeRoutes = require("./routes/memeRoute");
const userRoutes = require("./routes/userRoute");
const cloudinaryRoutes = require("./routes/cloudinaryRoute");

// express app
const app = express();

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
