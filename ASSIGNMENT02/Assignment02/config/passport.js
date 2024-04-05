const express = require("express");
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const session = require("express-session");
const app = express();

// Configure GitHub authentication
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/",
    },
    function (accessToken, refreshToken, profile, done) {
      // Use the profile information (e.g., profile.id) to create or authenticate a user
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Middleware for session management
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

// Route for GitHub authentication
app.get("/auth/github", passport.authenticate("github"));

// Callback route after GitHub authentication
app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to the home page
    res.redirect("/");
  }
);

// Ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Example protected route
app.get("/profile", ensureAuthenticated, (req, res) => {
  res.send(`Welcome, ${req.user.username}`);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
