const mongoose = require("mongoose");
require("dotenv").config();

const dbName = "CourseSellingWebsite";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL + dbName);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  courses: Array,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  purchasedCourses: Array,
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: String,
  imageLink: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
