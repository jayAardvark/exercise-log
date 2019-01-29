const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").MLAB_URI;
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
app.use("/api/exercise/new-user", newUser);
app.use("/api/exercise/users", getUsers);
app.use("/api/exercise/add", addExercise);
app.use("/api/exercise/log", getLog);
app.use("/api/exercise/filter-log", filterLog);

app.get("/", (req, res) => res.send("Hello!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
