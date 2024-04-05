const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  githubId: String,
  username: String,
  email: String,
  displayName: String,
  status: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

//  zigarzahar rfRO6jndoupCIOyn
// mongodb+srv://zigarzahar:<password>@cluster0.by9mfhy.mongodb.net/
