const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const { getCourses } = require("../util");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body["username"];
  const password = req.body["password"];

  // check if a user already exists with this username
  const admin = await Admin.findOne({
    username: username,
  });

  if (admin) {
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

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, price, imageLink } = req.body;
  const course = new Course({
    title,
    description,
    price,
    imageLink,
  });
  await course.save();

  // Update admin object
  const admin = await Admin.findOne({
    username: req.headers["username"],
  });
  if (admin["courses"]) {
    admin["courses"].push(course._id);
  }
  await admin.save();

  // send response
  res.json({
    msg: "Course created successfully",
    courseId: course._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  // fetch admin
  const admin = await Admin.findOne({
    username: req.headers["username"],
  });

  let courses = [];
  if (admin["courses"]) {
    courses = await getCourses(admin["courses"]);
  }
  res.json(courses);
});

module.exports = router;
