var Mentor = require("../models/mentor")
var auth = require("../modules/middleware")


module.exports = {
  signUp: async (req, res) => {
    try {
      var mentor = await Mentor.create(req.body);
      console.log(mentor);
      res.json(mentor);
    } catch (error) {
      res.json(error);
    }
  },
  login: async (req, res) => {
    var { email, password } = req.body;
    try {
      var mentor = await Mentor.findOne({ email });
      if (!mentor)
        return res.status(400).json({ error: "this email is not registered" });
      var result = await mentor.verifyPassword(password);
      if (!result) return res.status(400).json({ error: "password" });
      var token = await auth.generateJWT(mentor);
      res.json({
        Profile: { username: mentor.name, email: mentor.email, token: token },
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}