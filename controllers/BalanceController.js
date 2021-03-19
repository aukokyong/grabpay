const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

router.post("/", (req, res) => {
  User.findById(req.body, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({ database: "Database error" });
    } else {
      res.send({ accountBalance_cents: user.accountBalance_cents });
    }
  });
});

module.exports = router;
