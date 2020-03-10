const express = require("express");
const router = express.Router();

const Item = require("../models/item");
const User = require("../models/user");

// set up our HTML page which React will render upon
router.get("/", (req, res) => {
  res.sendFile("index.html");
});

// create a new item
router.post("/api/items", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  });

  newItem
    .save()
    .then(item => {
      res.json(item);
    })
    .catch(err => res.send(err.message));
});

// create a new user
router.post("/api/users", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email
  });

  newUser
    .save()
    .then(user => {
      res.json(user);
    })
    .catch(err => res.send(err.message));
});

// fetch all items
router.get("/api/items", (req, res) => {
  Item.find().then(items => res.json(items));
});

// create a new charge
router.post("/api/charge", (req, res) => {});

module.exports = router;
