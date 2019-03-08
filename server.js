const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const db = require("./config/keys").MLAB_URI;
const passport = require("passport");

mongoose
  .connect(db)
  .then(() => console.log("db connection successful!"))
  .catch(err => console.log(err));
const bodyParser = require("body-parser");
//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//api routes
const newUser = require("./routes/api/newUser");
const getUsers = require("./routes/api/getUsers");
const addExercise = require("./routes/api/addExercise");
const getLog = require("./routes/api/getLog");
const filterLog = require("./routes/api/filterLog");
const getAllLogs = require("./routes/api/getAllLogs");
const returnUser = require("./routes/api/returnUser");
const userAuth = require("./routes/api/userAuth");

//Create Passport Middleware
app.use(passport.initialize());
//passport-related code/strategy is in config.  meditate on this syntax.  we pass in "passport" which enables use of it in ./config/passport
require("./config/passport")(passport);

app.use("/api/exercise/new-user", newUser);
app.use("/api/exercise/returning-user", returnUser);
app.use("/api/exercise/users", getUsers);
app.use("/api/exercise/add", addExercise);
app.use("/api/exercise/log", getLog);
app.use("/api/exercise/filter-log", filterLog);
app.use("/api/exercise/all-logs", getAllLogs);
app.use("/api/userAuth", userAuth);

//if in production, we serve the static assets
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build "));

  //for any route that gets hit '*', load the react index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", (req, res) => res.send("Hello!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
