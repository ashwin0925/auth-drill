var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var auth = require("../../modules/middleware");
var Todo = mongoose.model("Todo")
var mentors = require("../../controllers/mentors")
var middleware = require("../../modules/middleware")

// register
router.post("/", mentors.signUp);

// login
router.post("/login", mentors.login);

// todos
router.post('/createtodo', middleware.isLogged, middleware.isMentor, async (req, res) => {
  try {
    console.log("todo")
    var todos = await Todo.create(req.body);
    res.json({ success: true, todos });

  } catch (err) {
    console.log(err);
    res.json({ success: false, err })
  }
})

//list todos
router.get("/todos", middleware.isLogged, async (req, res) => {
  try {
    var todos = await Todo.find();
    res.json({ success: true, todos });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
})

module.exports = router;
