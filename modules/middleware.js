var Student = require("../models/student")
var Mentor = require("../models/mentor")

exports.isLogged = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.json({ success: false, msg: "You need to login first" });
  }
};

exports.loggedUsers = (req, res, next) => {
  if (req.session && req.session.userId) {
    Student.findById(req.session.userId, { password: 0 }, (err, student) => {
      if (err) return next(err);
      if (student) {
        req.user = student;
        next();
      }
      if (!student) {
        Mentor.findById(req.session.userId, { password: 0 }, (err, mentor) => {
          if (err) return next(err);
          req.user = mentor;
          next();
        });
      }
    });
  } else {
    req.user = null;
    next();
  }
};

exports.isMentor = (req, res, next) => {
  if (req.user.isMentor) {
    next();
  } else if (req.user.isMentor == false) {
    res.json({ success: false, msg: "not authorised" });
  }
};