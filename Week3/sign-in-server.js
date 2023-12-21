const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [
  {
    username: "Mridul",
    password: "pass",
  },
  {
    username: "Uma",
    password: "pass",
  },
  {
    username: "Prishny",
    password: "pass",
  },
];

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/sign-in", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // check if user exists
  const user = users.find((user) => {
    if (user["username"] == username) return user;
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
