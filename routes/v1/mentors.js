var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var auth = require("../../modules/auth");
var Todo = mongoose.model("Todo")
var mentors = require("../../controllers/mentors")

// register
router.post("/", mentors.signUp);

// login
router.post("/login", mentors.login);

// todos
router.post('/createtodo', auth.verifyToken, async (req, res) => {
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
router.get("/todos", auth.verifyToken, async (req, res) => {
  try {
    var todos = await Todo.find();
    res.json({ success: true, todos });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
})

module.exports = router;
