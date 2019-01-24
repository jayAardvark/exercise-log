const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ test: "hey!" }));

//get username and return object with name and _id
router.post("/", (req, res) => {
  let userName = req.body.username;
  //   let userName = new User({
  //     username: req.body.username
  //   });
  //   userName.save((err, data) => {
  //     if (err) {
  //       console.log("error");
  //     } else {
  //       console.log(data);
  //     }
  //   });
  res.json(userName);
});

module.exports = router;
