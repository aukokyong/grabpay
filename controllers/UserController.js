const express = require("express");
const router = express.Router();
const Users = require("../models/UserSchema");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("get");
});

router.post("/new", (req, res) => {
  Users.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      return res.send("Username Taken");
    } else {
      req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync()
      );
      Users.create(req.body, (err, user) => {
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
