const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//create GET that returns array of all users in DB
//@route GET /api/exercise/users
//@description allows access to users' exercise logs
//@access PUBLIC
router.get("/", (req, res) => {
  User.find((err, data) => {
    if (err) {
      console.log("error");
    }
    res.json(data);
  });
});

module.exports = router;
