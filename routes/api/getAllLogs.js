const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//for protected routes
const passport = require("passport");
const User = require("../../models/User");

//get exercise log and count
//@route GET /api/exercise/all-logs
//@description gets all logs
//@access PRIVATE
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let user = req.user.id;

    User.findById(user, (err, data) => {
      if (err) {
        res.status(404).json({ error: "Could not find user!" });
        console.log("error");
      }
      //may need to map data.log to polish up the res.json
      else
        res.json({
          _id: data._id,
          username: data.username,
          count: data.log.length,
          log: data.log
        });
    });
  }
);

module.exports = router;
