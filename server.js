require("dotenv").config();
const express = require("express");
const app = express();

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

app.get("/", (req, res) => {
  res.send("Hello");
});

const userController = require("./controllers/UsersController");
app.use("/user", userController);

app.listen(process.env.PORT || 4000);
