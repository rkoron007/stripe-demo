const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURL;
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const path = require("path");

// if we don't have a database URL prompt the user
if (!db) {
  throw new Error("You must provide a string to connect to the Mongo Database");
}

// connect to our mongoDB database
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// set our port if we don't have one
const port = process.env.PORT || 3000;

// ensure our app is getting info parsed correctly
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for routing to the index.html
app.use(express.static(path.resolve(__dirname, "../client")));

// import our routes
app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

// for testing
module.exports = app;
