const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const Transaction = require("../models/TransactionSchema");

// Check if receiver is valid
router.post("/check", (req, res) => {
  // console.log(req.body);
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
  User.findOne(
    { username: req.body.creditorUsername },
    (err, getCreditorID) => {
      if (err) {
        console.log(err);
        res.status(500).send({ database: "Database error" });
      } else {
        const transactionData = {
          creditorID: getCreditorID._id,
          creditorUsername: req.body.creditorUsername,
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
            updateBalance(user.debtorID);
            updateBalance(user.creditorID);
            res.status(200).send("success");
          }
        });
      }
    }
  );
});

const updateBalance = (id) => {
  Transaction.aggregate()
    .match({ creditorID: id })
    .group({
      _id: null,
      totalCredit: {
        $sum: "$transactionAmount_cents",
      },
    })
    .exec((err, credit) => {
      Transaction.aggregate()
        .match({ debtorID: id })
        .group({
          _id: null,
          totalDebit: {
            $sum: "$transactionAmount_cents",
          },
        })
        .exec((err, debit) => {
          // console.log(credit);
          const totalCredit = credit.length === 0 ? 0 : credit[0].totalCredit;
          const totalDebit = debit.length === 0 ? 0 : debit[0].totalDebit;
          // console.log(totalCredit - totalDebit);
          // console.log(totalCredit);
          // console.log(totalDebit);

          User.findByIdAndUpdate(
            { _id: id },
            {
              $set: { accountBalance_cents: totalCredit - totalDebit },
            },
            (err, userBalance) => {
              if (err) {
                console.log(err);
              }
            }
          );
        });
    });
};

module.exports = router;
