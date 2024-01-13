const mongoose = require("mongoose");
require("dotenv").config();

const dbName = "todos";

// Connect to MongoDB
mongoose.connect(process.env.MONGO_DB_URL + dbName);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("Todo", todoSchema);

module.exports = {
  todo,
};
