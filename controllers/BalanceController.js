const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const Transaction = require("../models/TransactionSchema");

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

router.get("/update/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id);

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
            (err, user) => {
              if (err) {
                res.status(500).send("Balance update error");
              } else {
                res.send("Update success");
              }
            }
          );
        });
    });
});

module.exports = router;
