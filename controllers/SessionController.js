const express = require("express");
const router = express.Router();
const Users = require("../models/UserSchema");
const bcrypt = require("bcrypt");

// user logging in
router.post("/", (req, res) => {
  const filter = { username: req.body.username };
  //check database
  Users.findOne(filter, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).send({ database: "Database error" });
    } else if (!foundUser) {
      return res.status(401).send({ username: "Username not found" });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        console.log("logged in with " + req.body.password);
        console.log("current user", req.session.currentUser);
        res.status(200).send({
          _id: foundUser._id,
          username: foundUser.username,
        });
      } else {
        res.status(401).send({ password: "Password incorrect" });
      }
    }
  });
});

// check if user logged in
router.get("/check", (req, res) => {
  console.log("session data:", req.session.currentUser);
  if (req.session.currentUser) {
    res.status(200).send(true);
  } else {
    console.log("no session");
    res.send(false);
  }
});

// user logging out
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie(this.cookie, { path: "/" });
    res.status(200).send({ msg: "Logging out" });
  });
  // res.send("SESSION DELETE");
});

module.exports = router;
