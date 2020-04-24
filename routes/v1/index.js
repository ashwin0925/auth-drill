var express = require('express');
var router = express.Router();
var studentRouter = require('./students')
var mentorRouter = require('./mentors')
var auth = require('../../modules/auth')
var Student = require('../../models/student')
var Mentor = require('../../models/mentor')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ index: true })
});

router.use('/students', studentRouter)
router.use('/mentors', mentorRouter)

module.exports = router;
