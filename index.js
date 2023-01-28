const express = require("express");
const { connection } = require("./config/db");
const userRouter = require("./router/user.router");
const app = express();
require("dotenv").config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/about", (req, res) => {
  res.send("About us");
});

app.use("/user", userRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to db succesfully");
  } catch (err) {
    console.log("Error connectiong to DB");
    console.log(err);
  }
  console.log(`Listening to http://localhost:${process.env.PORT}`);
});
