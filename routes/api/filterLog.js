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

  res.json({ user, from, to });
});
module.exports = router;
