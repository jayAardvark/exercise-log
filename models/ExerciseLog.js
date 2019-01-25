//bring in mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Think about the consequences of not including these keys here initially.
let exerciseSchema = new Schema({
  username: String,
  description: String,
  duration: String, //may need to change this data-type
  /*_id: {
      type: String,
      ref: 'User'
    },*/
  _id: String,
  date: String
});

let ExerciseLog = mongoose.model("ExerciseLog", exerciseSchema);
module.exports = ExerciseLog;
