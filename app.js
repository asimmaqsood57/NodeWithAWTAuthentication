//connection string

///mongodb+srv://new-user_31:<password>@cluster0.plewu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const jwt = require("jsonwebtoken");

jwtKey = "jwt";
var crypto = require("crypto");

var key = "password";
var algo = "aes256";
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

app.post("/register", jsonParser, (req, res) => {
  var cipher = crypto.createCipher(algo, key);
  var encrypted =
    cipher.update(req.body.password, "utf8", "hex") + cipher.final("hex");
  console.log(req.body, encrypted);

  const data = new User({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
    password: encrypted,
  });

  data
    .save()
    .then((result) => {
      jwt.sign({ result }, jwtKey, { expiresIn: "300s" }, (err, token) => {
        res.status(201).json({ token });
      });

      //   res.status(201).json(result);
    })
    .catch((err) => console.log(err));
});

app.listen(80);
