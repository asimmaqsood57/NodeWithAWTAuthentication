//connection string

///mongodb+srv://new-user_31:<password>@cluster0.plewu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
mongoose
  .connect(
    "mongodb+srv://new-user_31:t2wNcoZ38skEKNuf@cluster0.plewu.mongodb.net/youtube?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log("database connection successful");
  });

const app = express();

app.get("/", (req, res) => {
  res.end("hello");
});

app.listen(80);
