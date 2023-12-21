const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(express.json());

// connect to the database
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Connected!"));

// defining mongoose model
/**
 * The first argument is the singular name of the collection your model is for.
 * Mongoose automatically looks for the plural version of your model name.
 */
const User = mongoose.model("User", {
  username: String,
  password: String,
});
// User will use the users collection, not the user collection.

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/sign-in", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // check if user exists
  const user = await User.findOne({
    username: username,
  });

  if (!user || user["password"] != password) {
    res.status(400).send("There is some issue with username or password!");
    return;
  }

  const token = jwt.sign(
    {
      username: username,
    },
    "jwt-password"
  );

  res.json({
    token: token,
  });
});

app.get("/users", async function (req, res) {
  // check if the request is authenticated
  try {
    const token = req.headers["authorization"];
    decoded = jwt.verify(token, "jwt-password");
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
    return;
  }

  const users = await User.find({});
  const usernames = users.map((user) => {
    return user["username"];
  });
  const requiredUsernames = usernames.filter((username) => {
    return !(username == decoded["username"]);
  });

  res.json(requiredUsernames);
});

app.listen(3000, () => {
  console.log("listening!");
});
