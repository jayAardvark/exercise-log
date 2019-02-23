//bring in mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create models. keep in mind, keys that will appear later were not added initially (may cause trouble).
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  count: Number,
  log: [{ description: String, duration: String, date: String }] //may need to refactor this with an object
  //log: []
});

//note that in mLab, our data will be stored as the first argument here: "users"
//let User = mongoose.model("User", userSchema);
User = mongoose.model("users", UserSchema);
module.exports = User;
