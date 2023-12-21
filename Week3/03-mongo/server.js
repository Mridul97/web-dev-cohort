const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Course Selling Website");
});

const dbName = "CourseSellingWebsite";

mongoose.connect(process.env.MONGO_DB_URL + dbName).then(() => {
  console.log("Connected to DB!");
});

// Create Admin model
const Admin = mongoose.model("Admin", {
  username: String,
  password: String,
});

// Creates a new admin account
app.post("/admin/signup", async function (req, res) {
  const username = req.body["username"];
  const password = req.body["password"];

  // check if an user already exists with this username
  const user = await Admin.findOne({
    username: username,
  });

  if (user) {
    res.status(400).json({
      msg: "username already exists!",
    });
    return;
  }

  // create a user in the database
  // newAdmin here is a document, which is created using the Admin model
  const newAdmin = new Admin({
    username,
    password,
  });
  // saving the document to MongoDB instance
  await newAdmin.save();
  res.json({
    message: "Admin created successfully",
  });
});

app.listen(3000);
