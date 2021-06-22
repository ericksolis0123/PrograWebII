const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/tasks-api");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const {
  taskPatch,
  taskPost,
  taskGet,
  taskDelete
} = require("./controllers/taskController");

const {
  coursePatch,
  coursePost,
  courseGet,
  courseDelete
} = require("./controllers/courseController");

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// listen to the task request
app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);
app.delete("/api/tasks", taskDelete);

app.get("/api/courses", courseGet);
app.post("/api/courses", coursePost);
app.patch("/api/courses", coursePatch);
app.put("/api/courses", coursePatch);
app.delete("/api/courses", courseDelete);

app.listen(3000, () => console.log(`Example app listening on port 3000!`))