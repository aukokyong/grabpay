const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("get");
});

router.post("/new", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      return res.send("Username Taken");
    } else {
      req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync()
      );
      User.create(req.body, (err, user) => {
        if (err) {
          res.status(500).send("Database error");
        } else {
          console.log("User created");
          res.status(200).send(user);
        }
      });
    }
  });
});

module.exports = router;
