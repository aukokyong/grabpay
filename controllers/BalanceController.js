const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

router.get("/:id", (req, res) => {
  // // console.log(req.params.id);
  // res.send(req.params.id);
  const filter = { _id: req.params.id };

  User.findById(filter, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({ database: "Database error" });
    } else {
      res.send({ accountBalance_cents: user.accountBalance_cents });
    }
  });
});

module.exports = router;
