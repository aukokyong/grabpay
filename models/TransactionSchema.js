const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    creditorID: { type: String, required: true }, // person receiving money
    creditorUsername: { type: String, required: true },
    debtorID: { type: String, required: true }, // person sending money
    debtorUsername: { type: String, required: true },
    transactionAmount_cents: { type: Number, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
