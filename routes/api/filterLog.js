const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//@route GET /api/exercise/filter-log
//@description GETs object of logs filtered by given dates
//@access PUBLIC
router.get("/", (req, res) => {
  let user = req.query.userId;
  let from = req.query.from;
  let to = req.query.to;

  User.findById(user, (err, data) => {
    if (err) {
      res.status(404).json({ error: "Could not find user!" });
    } else {
      //create logic for filtering exercise log by date
      let dataLog = data.log;
      let filteredLog = dataLog.filter(y => y.date >= from && y.date <= to);
      res.json({ user, filteredLog });
    }
  });
});
module.exports = router;
