require("dotenv").config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const fs = require("fs");
const crypto = require("crypto");
const indexRouter = require("./routes/index");

// Generate and store session secret
const sessionSecret = crypto.randomBytes(32).toString("hex");
fs.writeFileSync(".env", `SESSION_SECRET=${sessionSecret}\n`, { flag: "a" });

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.get("/auth1", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function loginWithGitHub() {
  window.location.assign(
    "https://github.com/login/oauth/authorize?client_id=" +
      process.env.GITHUB_CLIENT_ID
  );
}

module.exports = app;
