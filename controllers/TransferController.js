const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const Transaction = require("../models/TransactionSchema");

// Check if receiver is valid
router.post("/check", (req, res) => {
  console.log(req.body);
  User.findOne(req.body, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send({ database: "Database error" });
    }
    if (!user) {
      res.status(401).send({ msg: "User not found", status: false });
    } else {
      res.send(true);
    }
  });
});

// Create new transaction data
router.post("/new", (req, res) => {
  User.findOne({ username: req.body.username }, (err, getCreditorID) => {
    if (err) {
      console.log(err);
      res.status(500).send({ database: "Database error" });
    } else {
      const transactionData = {
        creditorID: getCreditorID._id,
        creditorUsername: req.body.username,
        debtorID: req.body.debtorID,
        debtorUsername: req.body.debtorUsername,
        transactionAmount_cents: req.body.transactionAmount_dollars * 100,
        description: req.body.description,
      };

      Transaction.create(transactionData, (err, user) => {
        if (err) {
          res.status(500).send("Database error");
        } else {
          console.log("Transaction created");
          res.status(200).send("success");
        }
      });
    }
  });
});

module.exports = router;
