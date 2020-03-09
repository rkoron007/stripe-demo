const express = require("express");
const router = express.Router();

const Item = require("./models/item");
const User = require("./models/user");

router.get("/", (req, res) => res.send("hello!"));

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

router.get("/api/items", (req, res) => {
  Item.find().then(items => res.json(items));
});

router.delete("/api/items/:itemId", (req, res) => {
  Item.deleteOne({ id: req.params.itemId }).then(() =>
    res.send("Item deleted!")
  );
});

router.post("/api/charge", (req, res) => {
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

module.exports = router;
