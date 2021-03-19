const express = require("express");
const router = express.Router();
const Transaction = require("../models/TransactionSchema");

router.get("/:id", (req, res) => {
  // res.send(req.params.id);
  const query = {
    $or: [{ creditor: req.params.id }, { debtor: req.params.id }],
  };
  Transaction.find(query, (err, doc) => {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.status(200).send(doc);
    }
  });
});

router.post("/seed", (req, res) => {
  Transaction.create(req.body, (err, user) => {
    if (err) {
      res.status(500).send("Database error");
    } else {
      console.log("Transaction created");
      res.status(200).send("success");
    }
  });
});

module.exports = router;
