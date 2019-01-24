const express = require("express");
const app = express();

const newUser = require("./routes/api/newUser");

app.get("/", (req, res) => res.send("Hello!"));

app.use("/api/exercise/new-user", newUser);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
