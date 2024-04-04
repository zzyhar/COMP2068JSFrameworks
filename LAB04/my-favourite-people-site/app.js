const express = require("express");
const app = express();

app.use(express.static("img"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Define routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/actor1", (req, res) => {
  res.render("actor1", { title: " Ryan Gosling" });
});

app.get("/actor2", (req, res) => {
  res.render("actor2", { title: "Cillian Murphy" });
});

app.get("/actor3", (req, res) => {
  res.render("actor3", { title: "Greg Plitt" });
});

app.get("/actor4", (req, res) => {
  res.render("actor4", { title: "Matthew McConaughey" });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
