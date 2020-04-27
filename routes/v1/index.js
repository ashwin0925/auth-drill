var express = require("express");
var router = express.Router();
var studentRouter = require("./students");
var mentorRouter = require("./mentors");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ index: true });
});

router.use("/students", studentRouter);
router.use("/mentors", mentorRouter);

module.exports = router;
