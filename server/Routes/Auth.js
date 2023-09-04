const express = require("express");
const Router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const FetchUser = require("../middleware/Login");
const SCRET_KEY = "ILoveMyBacha@875";

// Route for Create new User Account Using Full Validation
Router.post(
  "/signup",
  [
    body("name").isLength({ min: 4 }),
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      //  if error occured during entering invalid credentials!!!!
      return res.status(400).json({ error: error.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        // if email already exists!!!!!
        return res.status(400).json({ err: "user already exists" });
      }
      const Salt = await bcrypt.genSalt(10);
      const SecPass = await bcrypt.hash(req.body.password, Salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const AuthToken = JWT.sign(data, SCRET_KEY);
      console.log(AuthToken);
      //   sending    Jwt Token!!!!!!!!!
      res.json({ AuthToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("error occured");
    }
  }
);

// Route for assign Token to User

Router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        // if User email not Found
        return res.status(400).json({ error: "User Not Found" });
      }
      const PassCompare = await bcrypt.compare(password, user.password);
      if (!PassCompare) {
        return res
          .status(400)
          .json({ error: "Please Enter Valid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const token = JWT.sign(data, SCRET_KEY);
      res.json({ token });
    } catch (error) {
      // Final Error
      console.log(error);
      res.status(500).json({ error: "Something Went Wrong" });
    }
  }
);
// Route for geting user details by jwt token!!!!!!
Router.post("/getuser", FetchUser, async (req, res) => {
  try {
    const UserId = req.user.id;
    const user = await User.findById(UserId).select("-password");
    res.send(user);
  } catch (error) {
    // Final Error
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

module.exports = Router;
