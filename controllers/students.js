var Student = require("../models/mentor")
var auth = require("../modules/auth")

module.exports = {
  signUp: async (req, res) => {
    try {
      var student = await Student.create(req.body);
      console.log(student);
      res.json(student);
    } catch (error) {
      res.json(error);
    }
  },
  login: async (req, res) => {
    var { email, password } = req.body;
    try {
      var student = await Student.findOne({ email });
      if (!student)
        return res.status(400).json({ error: "this email is not registered" });
      var result = await student.verifyPassword(password);
      if (!result) return res.status(400).json({ error: "password" });
      var token = await auth.generateJWT(student);
      res.json({
        Profile: {
          username: student.name,
          email: student.email,
          batchno: student.batchno,
          token: token,
        },
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}