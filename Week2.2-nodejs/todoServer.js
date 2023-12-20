const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { v4: uuidv4 } = require('uuid');

// Using middleware to get req body --> It parses the request and 
// makes the body available in req.body
app.use(bodyParser.json());
const todos = [];

function findId(todoId){
  /**
   * If Id is present return idx
   * otherwise return -1
   */

  for(let i = 0; i < todos.length; i++){
    if(todos[i]["id"] == todoId){
      return i;
    }
  }

  return -1;
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/todos", (req, res) => {
  res.status(200).send(todos);
});

app.get("/todos/:id", (req, res) => {
  // getting params from req
  const todoId = req.params["id"];

  // check if todoId is present in the todos list above
  todoIdx = findId(todoId);
  if(todoIdx == -1){
    // Express's built-in res.sendStatus(404) method to send just the status without a custom
    // message.
    res.sendStatus(404);
  } else {
    // To send a json object in Response Body
    res.status(200).json(todos[todoIdx]);
  }
});

app.post("/todos", (req, res) => {
  const todo = req.body;

  // add an id to the todo and add it to the todos list
  todo["id"] = uuidv4();
  todos.push(todo);
  res.status(201).json({
    "id": todo["id"]
  });
});

app.put("/todos/:id", (req, res) => {

  const todoId = req.params["id"];
  const todoItem = req.body;
  
  // find todoId in the todos list
  todoIdx = findId(todoId);

  if(todoIdx != -1){
    todoItem["id"] = todoId;
    todos[todoIdx] = todoItem;
    res.status(200).send();
  }

  res.sendStatus(404);
});

app.delete("/todos/:id", (req, res) => {
  const todoId = req.params["id"];

  // find the todoItem
  todoIdx = findId(todoId);

  if(todoIdx != -1){
    todos.splice(todoIdx, 1);
    res.status(200).send();
  } else {
    res.status(404).send("Item not found!");
  }
});

// The app.use((req, res, next) => { ... }) middleware is defined to handle all routes.
// This middleware will be triggered for any route that is not matched by previous route handlers,
// effectively serving as a catch-all for 404 errors.
// Inside the middleware, res.status(404) sets the HTTP status code to 404.
// res.send("Sorry, the requested page couldn't be found!"); sends a custom error message
// as the response body.
app.use((req, res, next) => {
  res.status(404).send("Sorry, the requested page couldn't be found!");
});

app.listen(3000, () => {
  console.log(`App is listening on port 3000`);
});
