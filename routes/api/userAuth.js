//this will deal with user authentication, passwords, emails, etc
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

//@route GET api/userAuth/test
//@description simple test for route
//@access Public
router.get("/test", (req, res) => res.json({ test: "userAuth test works!" }));

//@route POST api/userAuth/register
//@description the user can register
//@access Public
router.post("/register", (req, res) => {
  //we want to access the "errors" and "isValid" keys that are in the code within the register.js file
  // "req.body" here refers to everthing sent to this route (/register)
  const { errors, isValid } = validateRegisterInput(req.body);

  //check for errors. one way is to check if isValid is false
  //this code says that if the errors object created in the register.js file is NOT empty, then there is an error.  an
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //find an already existing e-mail if attempt to register with it. we will use promises here although callbacks can be used as well.
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      //meditate on this syntax. this is Cascading: chaining methods
      /* we might replace code below with 
        errors.email = 'This email has already been used!'
        return res.status(404).json(errors)
        */
      return res
        .status(404)
        .json({ email: "This email has already been used!" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
      );
    }
  });
});

// @route POST api/userAuth/login
// @description by returning a jwt token, a user can then log in
// @access PUBLIC
router.post("/login", (req, res) => {
  //we want to access the "errors" and "isValid" keys that are in the code within the register.js/login.js file
  // "req.body" here refers to everthing sent to this route (/register)
  const { errors, isValid } = validateLoginInput(req.body);

  //check for errors. one way is to check if isValid is false
  //this code says that if the errors object created in the register.js file is NOT empty, then there is an error.
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //search for user by email
  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.email = "No user with this email found!";
      res.status(404).json({ email: errors.email }); //may have to pass in simply "errors" vs email: errors.email
    } else {
      //check for correct password by using bcrypt method to compare
      bcrypt.compare(password, user.password).then(trueMatch => {
        if (trueMatch) {
          //generate jwt token for true match of password and hash.
          //first, generate "jwt payload". include what you think is necessary.
          const payload = { name: user.name, id: user.id };

          //then, sign token.
          //1st argument payload, 2nd private key, 3rd expiration (for security), 4th callback
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600000 },
            (err, token) => {
              res.json({
                //meditate on these key-value pairs. Meditate on 'Bearer'
                //verify in postman that the token is returned.  this token will be placed in header and used with passport later
                //meditate on the "Bearer" added to the token--why is this necessary?
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Wrong password!";
          return res.status(400).json({ password: errors.password });
        }
      });
    }
  });
});

// @route GET api/userAuth/current-user
// @description returns user for whom the token belongs
// @access PRIVATE
//include below passport.authenticate as the 2nd argument and pass in to that 'jwt' as the strategy and "session: false" because a session isn't being used.  the 3rd argument is the callback.  we cant think of the code below as any other route other than the fact that it's now protected.
router.get(
  "/current-user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //after authentication, we have access to the current user's stored data via req.user.  see config/passport.js
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id
    });
  }
);

module.exports = router;
