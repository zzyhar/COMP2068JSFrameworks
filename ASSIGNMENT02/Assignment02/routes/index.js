var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Assignment02" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Assignment02" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Assignment02" });
});

module.exports = router;
