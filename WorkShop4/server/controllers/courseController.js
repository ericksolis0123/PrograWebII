const Course = require("../models/courseModel");

/**
 * Creates a courses
 *
 * @param {*} req
 * @param {*} res
 */
const coursePost = (req, res) => {
  var course = new Course();

  course.name = req.body.name;
  course.code = req.body.code;

  if (course.name && course.code) {
    course.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the course', err)
        res.json({
          error: 'There was an error saving the course'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/courses/?id=${course.id}`
      });
      res.json(course);
    });
  } else {
    res.status(422);
    console.log('error while saving the course')
    res.json({
      error: 'No valid data provided for course'
    });
  }
};

/**
 * Get all courses
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Course.findById(req.query.id, function (err, course) {
      if (err) {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      }
      res.json(course);
    });
  } else {
    // get all courses
    Course.find(function (err, course) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(course);
    });

  }
};

/**
 * Delete one course
 *
 * @param {*} req
 * @param {*} res
 */
const courseDelete = (req, res) => {
  // if an specific course is required
  if (req.query && req.query.id) {
    Course.findById(req.query.id, function (err, course) {
      if (err) {
        res.status(500);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      }
      //if the course exists
      if(course) {
        course.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the course"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a Course ID" });
  }
};

/**
 * Updates a course
 *
 * @param {*} req
 * @param {*} res
 */
const coursePatch = (req, res) => {
  // get course by id
  if (req.query && req.query.id) {
    Course.findById(req.query.id, function (err, course) {
      if (err) {
        res.status(404);
        console.log('error while queryting the course', err)
        res.json({ error: "Course doesnt exist" })
      }

      // update the course object (patch)
      course.name = req.body.name ? req.body.name : course.name;
      course.code = req.body.code ? req.body.code : course.code;

      course.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the course', err)
          res.json({
            error: 'There was an error saving the course'
          });
        }
        res.status(200); // OK
        res.json(course);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Course doesnt exist" })
  }
};

module.exports = {
  courseGet,
  coursePost,
  coursePatch,
  courseDelete
}