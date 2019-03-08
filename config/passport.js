//create passport strategy here
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
//bring in mongoose as we'll be searching for user associated with any returned payloads
const mongoose = require("mongoose");
//since we need to have access to each User model in the "users" db we need to include the following...
const User = mongoose.model("users");
//bring in keys because we'll access the secretOrKey from it
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

//add exports
module.exports = passport => {
  //consult passport documentation
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      //access info of user
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false); // "false" because there is no user
          }
        })
        .catch(err => console.log(err));
    })
  );
};
