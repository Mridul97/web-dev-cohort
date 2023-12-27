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
  courses: Array,
});

// Create Course model
const Course = mongoose.model("Course", {
  title: String,
  description: String,
  price: String,
  imageLink: String,
});

// Create User model
const User = mongoose.model("User", {
  username: String,
  password: String,
  purchasedCourses: Array,
});

// Creates a new admin account
app.post("/admin/signup", async function (req, res) {
  const username = req.body["username"];
  const password = req.body["password"];

  // check if a user already exists with this username
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
    courses: [],
  });
  // saving the document to MongoDB instance
  await newAdmin.save();
  res.json({
    message: "Admin created successfully",
  });
});

// Create a new course
app.post("/admin/courses", async function (req, res) {
  // check the admin credentials
  const username = req.headers["username"];
  const password = req.headers["password"];

  const admin = await Admin.findOne({
    username,
    password,
  });

  if (!admin) {
    res.status(403).json({
      msg: "Incorrect Admin Credentials!",
    });
    return;
  }

  // creating a new course
  const { title, description, price, imageLink } = req.body;
  const course = new Course({
    title,
    description,
    price,
    imageLink,
  });
  await course.save();
  // Update admin object
  if (admin["courses"]) {
    admin["courses"].push(course._id);
  }
  await admin.save();
  res.json({
    msg: "Course created successfully",
    courseId: course._id,
  });
});

/**
 * Gets courses information from the DB, given a list of course Ids.
 * @param {*} courses : list of course Ids
 * @returns a promise that gets resolved when the information is available for all the course Ids
 */
async function getCourses(courses) {
  const coursePromises = [];
  courses.forEach((courseId) => {
    const coursePromise = Course.findById(courseId);
    coursePromises.push(coursePromise);
  });
  return Promise.all(coursePromises);
}

// return all the courses for an admin
app.get("/admin/courses", async (req, res) => {
  // check the admin credentials
  const username = req.headers["username"];
  const password = req.headers["password"];

  const admin = await Admin.findOne({
    username,
    password,
  });

  if (!admin) {
    res.status(403).json({
      msg: "Incorrect Admin Credentials!",
    });
    return;
  }

  // return the courses list
  let courses = [];
  if (admin["courses"]) {
    courses = await getCourses(admin["courses"]);
  }
  res.json(courses);
});

// Create a new user
app.post("/users/signup", async (req, res) => {
  const username = req.body["username"];
  const password = req.body["password"];

  // check if a user already exists with this username
  const user = await User.findOne({
    username: username,
  });

  if (user) {
    res.status(400).json({
      msg: "username already exists!",
    });
    return;
  }

  // create a user in the database
  // newUser here is a document, which is created using the User model
  const newUser = new User({
    username,
    password,
  });
  // saving the document to MongoDB instance
  await newUser.save();
  res.json({
    message: "User created successfully",
  });
});

// Get the courses
app.get("/users/courses", async (req, res) => {
  console.log(req.headers);
  const username = req.headers["username"];
  const password = req.headers["password"];

  const user = await User.findOne({
    username,
    password,
  });

  if (!user) {
    res.status(403).json({
      msg: "Incorrect User Credentials!",
    });
    return;
  }

  const courses = await Course.find({});
  console.log(courses);
  res.json(courses);
});

// Purchasing a course
app.post("/users/courses/:courseId", async (req, res) => {
  const username = req.headers["username"];
  const password = req.headers["password"];

  const user = await User.findOne({
    username,
    password,
  });

  if (!user) {
    res.status(403).json({
      msg: "Incorrect User Credentials!",
    });
    return;
  }

  const courseId = req.params["courseId"];
  if (user.purchasedCourses) {
    user.purchasedCourses.push(courseId);
  } else {
    user["purchasedCourses"] = [courseId];
  }

  await user.save();
  res.json({
    message: "Course purchased successfully",
  });
});

// Lists all the courses purchased by the user
app.get("/users/purchasedCourses", async (req, res) => {
  const username = req.headers["username"];
  const password = req.headers["password"];

  const user = await User.findOne({
    username,
    password,
  });

  if (!user) {
    res.status(403).json({
      msg: "Incorrect User Credentials!",
    });
    return;
  }

  if (!user["purchasedCourses"]) {
    res.json({
      purchasedCourses: [],
    });
    return;
  }

  const purchasedCourses = await getCourses(user["purchasedCourses"]);
  res.json({
    purchasedCourses: purchasedCourses,
  });
});

app.listen(3000);
