const express = require("express");
const UserModel = require("../models/user.model");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    let isPresent = await UserModel.findOne({ email });
    if (isPresent) {
      res.status(401).send("User Already Exists");
    } else {
      try {
        bcrypt.hash(password, 5, async function (err, hash) {
          const user = new UserModel({ email, password: hash });
          await user.save();
          res.send("Signup Successful");
        });
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong, Please try again later");
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  // console.log(user);
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      console.log(user);
      const hashed_password = user.password;
      bcrypt.compare(password, hashed_password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: user._id }, process.env.KEY);
          res.send({ msg: "Login successfull", token: token });
        } else {
          res.send("Login failed");
        }
      });
    } else {
      res.send("Login failed");
    }
  } catch {
    res.send("Something went wrong, please try again later");
  }
});

app.post("getProfile", async(req,res) => {
    
})

module.exports = app;
