const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    accountBalance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", UserSchema);

module.exports = User;
