const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURL;
const routes = require("./routes");
const bodyParser = require("body-parser");

if (!db) {
  throw new Error("You must provide a string to connect to the Mongo Database");
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// ensure our app is getting info in the best way
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
