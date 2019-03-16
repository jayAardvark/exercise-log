const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//for protected routes
const passport = require("passport");
const User = require("../../models/User");
const ExerciseLog = require("../../models/ExerciseLog");

router.get("/test", (req, res) => res.json({ test: "Hey!" }));

//@route POST /api/exercise/add
//@description user posts exercise data
//@access PRIVATE
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let description = req.body.description;
    let duration = req.body.duration;
    //let id = req.body.userId;
    /* ---------------------------------new id from token payload */
    let id = req.user.id;
    let userName;
    let date;
    let jsonDate;

    if (req.body.date == "" || req.body.date == null) {
      let generatedDate = new Date();
      let theYear = generatedDate.getFullYear().toString();
      let theMonth = generatedDate.getMonth();
      //must add one here because getMonth is 0-11.  Note: 1 is subtracted in "jsonDate" below
      theMonth += 1;
      theMonth = theMonth.toString();
      // console.log(theMonth);
      let theDate = generatedDate.getDate().toString();
      date = theYear.concat("-", theMonth, "-", theDate);
      //this variable of jsonDate is created so that the res.json contains a format that is, e.g., "Sat Dec 01 2018"
      jsonDate = date.split("-");
      jsonDate = new Date(jsonDate[0], jsonDate[1] - 1, jsonDate[2]);
      jsonDate = jsonDate.toDateString();
    } else {
      date = req.body.date;
      //this variable of jsonDate is created so that the res.json contains a format that is, e.g., "Sat Dec 01 2018"
      jsonDate = req.body.date.split("-");
      //note that the 2nd argument below must be subtracted by 1 to account for months starting with Jan = "0", Feb = "1", etc...
      jsonDate = new Date(jsonDate[0], jsonDate[1] - 1, jsonDate[2]);
      jsonDate = jsonDate.toDateString();
    }

    //try with find by name
    User.findById(id, (err, data) => {
      if (err) {
        res.status(404).json({ error: "Invalid input" });
        console.log("error");
      } else {
        //console.log(data.username);
        userName = data.username;
        data.log = data.log.concat({
          description: description,
          duration: duration,
          date: date
        });
        res.json({
          username: userName,
          description: description,
          duration: duration,
          _id: id,
          date: jsonDate
        });
        data.markModified(data.log);
        data.save((err, data) => {
          if (err) {
            res.status(404).json({ error: "Error saving" });
            console.log("error saving");
          } else {
            console.log("saved");
            //console.log(data);
          }
        });
      }
    });
  }
);

module.exports = router;
