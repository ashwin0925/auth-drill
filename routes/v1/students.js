var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var student = require("../../controllers/students")

// register
router.post("/", student.signUp);

// login
router.post("/login", student.login);

module.exports = router;
