require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const db = mongoose.connection;
const dbconnection =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/grabpay";
mongoose.connect(dbconnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", dbconnection));
db.on("disconnected", () => console.log("mongo disconnected"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

const userController = require("./controllers/UserController");
app.use("/user", userController);

const sessionController = require("./controllers/SessionController");
app.use("/session", sessionController);

const BalanceController = require("./controllers/BalanceController");
app.use("/balance", BalanceController);

const TransferController = require("./controllers/TransferController");
app.use("/transfer", TransferController);

const TransactionController = require("./controllers/TransactionController");
app.use("/transaction", TransactionController);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 4000);
