const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/tasks-api"); 
const bodyParser = require("body-parser");
const Task = require("./taskModel");

const app = express();
app.use(bodyParser.json());

//check for cors
app.use(cors({
  domains: '*',
  methods: "*"
}));


app.post('/tasks', function (req, res){

  const task = new Task();

  task.title = req.body.title;
  task.description = req.body.description;

  if (task.title && task.description) {
    task.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the task', err)
        res.json({
          error: 'There was an error saving the task'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/tasks/?id=${task.id}`
      });
      res.json(task);
    });
  } else {
    res.status(422);
    console.log('error while saving the task')
    res.json({
      error: 'No valid data provided for task'
    });
  }
});


app.get('/tasks', function (req, res){

  if (req.query && req.query.id) {
    Task.findById(req.query.id, function (err, task) {
      if (err) {
        res.status(404);
        console.log('error while queryting the task', err)
        res.json({ error: "Task doesnt exist" })
      }
      res.json(task);
    });
  } else {
    // get all tasks
    Task.find(function (err, tasks) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(tasks);
    });

  }
});

app.patch('/tasks', function (req, res){

  if (req.query && req.query.id) {
    Task.findById(req.query.id, function (err, task) {
      if (err) {
        res.status(404);
        console.log('error while queryting the task', err)
        res.json({ error: "Task doesnt exist" })
      }

      task.title = req.body.title ? req.body.title : task.title;
      task.description = req.body.description ? req.body.description : task.description;

      task.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the task', err)
          res.json({
            error: 'There was an error saving the task'
          });
        }
        res.status(200); // OK
        res.json(task);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Task doesnt exist" })
  }
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`))