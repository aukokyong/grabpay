const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    userID: { type: String, required: true, unique: true },
    type: { type: String },
    amount: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
