var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student = mongoose.model('Student');
var auth = require('../../modules/auth');


// register
router.post('/', async (req, res) => {
  try {
    var student = await Student.create(req.body);
    console.log(student);
    res.json(student);
  } catch (error) {
    res.json(error);
  }
})

router.post('/login', async (req, res) => {
  var { email, password } = req.body;
  try {
    var student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ error: "this email is not registered" });
    var result = await student.verifyPassword(password);
    if (!result) return res.status(400).json({ error: "password" });
    var token = await auth.generateJWT(student);
    res.json({ Profile: { username: student.name, batchno: student.batchno, token: token } })
  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router;