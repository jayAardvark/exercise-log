const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ test: "hey!" }));

//@route POST /api/exercise/new-user
//@description allows user to post name to db. returns user data
//@access PUBLIC
router.post("/", (req, res) => {
  let userName = new User({
    username: req.body.username
  });
  //   userName.save((err, data) => {
  //     if (err) {
  //       console.log("error");
  //     } else {
  //       console.log(data);
  //     }
  //   });
  //   res.json(userName);
  userName
    .save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

module.exports = router;
