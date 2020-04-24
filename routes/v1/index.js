var express = require('express');
var router = express.Router();
var studentRouter = require('./students')
var auth = require('../../modules/auth')
var Student = require('../../models/student')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ index: true })
});

router.use('/students', studentRouter)

module.exports = router;
