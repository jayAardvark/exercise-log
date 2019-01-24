const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").MLAB_URI;
mongoose
  .connect(db)
  .then(() => console.log("db connection successful!"))
  .catch(err => console.log(err));

const newUser = require("./routes/api/newUser");
app.use("/api/exercise/new-user", newUser);

app.get("/", (req, res) => res.send("Hello!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
