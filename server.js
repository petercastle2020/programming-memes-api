require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const memeRoutes = require("./routes/memeRoute");
const userRoutes = require("./routes/userRoute");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log("path >", req.path, "body >", req.body, "method >", req.method);
  next();
});

// Routes

app.use("/api/user", userRoutes);

app.use("/api/meme", memeRoutes);

app.get("/hello", (req, res) => {
  res.send("hello world.");
});

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("server running on port: " + 4000);
    });
  })
  .catch((error) => {
    console.log(error);
  });
