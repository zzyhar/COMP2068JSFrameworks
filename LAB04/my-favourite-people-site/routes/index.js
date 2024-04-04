const express = require("express");
const router = express.Router();

// Define the home page route
router.get("/", (req, res) => {
  res.render("index");
});

// Define other routes as needed

router.get("/actor1", function (req, res, next) {
  res.render("actor1");
});

module.exports = router;
