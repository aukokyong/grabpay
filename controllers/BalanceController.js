const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

router.get("/", (req, res) => {
  // Find one
  // Return balance amount
  res.send("balance");
});

module.exports = router;
