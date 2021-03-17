const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    username: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
