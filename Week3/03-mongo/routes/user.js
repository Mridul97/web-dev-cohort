const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const { getCourses } = require("../util");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
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

router.get("/courses", userMiddleware, async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.json(courses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic

  // fetch the user
  const user = await User.findOne({
    username: req.headers["username"],
  });

  const courseId = req.params["courseId"];
  if (user.purchasedCourses) {
    // TODO: Check if a user has already purchased this course before adding
    // the course to purchased courses.
    user.purchasedCourses.push(courseId);
  } else {
    user["purchasedCourses"] = [courseId];
  }

  await user.save();
  res.json({
    message: "Course purchased successfully",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic

  // fetch the user
  const user = await User.findOne({
    username: req.headers["username"],
  });

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

module.exports = router;
