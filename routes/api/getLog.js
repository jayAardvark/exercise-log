const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//get exercise log and count
//@route GET /api/exercise/log
//@description get customizable log of user
//@access PUBLIC
router.get("/", (req, res) => {
  let user = req.query.userId;
  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;

  User.findById(user, (err, data) => {
    if (err) {
      res.status(404).json({ error: "Could not find user!" });
      console.log("error");
    } else if (from == "" || from == null || (to == "" || to == null)) {
      //logic for limiting length of log-array
      if (limit == undefined || limit == null || limit == "") {
        //may need to map data.log to polish up the res.json
        res.json({
          _id: data._id,
          username: data.username,
          count: data.log.length,
          log: data.log
        });
      }
      while (limit < data.log.length) {
        //will using pop() here actually alter the log array stored in the database if nothing is saved?
        data.log.pop();
      }
      //may need to map data.log to polish up the res.json
      res.json({
        _id: data._id,
        username: data.username,
        count: data.log.length,
        log: data.log
      });
    } else {
      //create logic for filtering exercise log by date
      let dataLog = data.log;
      let filterLog = dataLog.filter(y => y.date > from && y.date < to);
      //logic for limiting length of log-array
      if (limit == undefined || limit == null || limit == "") {
        res.json({
          _id: data._id,
          username: data.username,
          count: filterLog.length,
          log: filterLog
        });
      }
      while (limit < filterLog.length) {
        filterLog.pop();
      }
      res.json({
        _id: data._id,
        username: data.username,
        count: filterLog.length,
        log: filterLog
      });
    }
  });
});

module.exports = router;
