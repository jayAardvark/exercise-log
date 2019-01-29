const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//@route GET /api/exercise/filter-log
//@description GETs object of logs filtered by given dates
//@access PUBLIC
router.get("/", (req, res) => {
  let user = req.body.userId;
  let from = req.body.from;
  let to = req.body.to;

  User.findById(user, (err, data) => {
    if (err) {
      res.status(404).json({ error: "Could not find user!" });
      console.log("error");
    } else {
      //create logic for filtering exercise log by date
      let dataLog = data.log;
      let filtereLog = dataLog.filter(y => y.date >= from && y.date <= to);
      res.json({ filtereLog });
    }
  });
});
module.exports = router;
