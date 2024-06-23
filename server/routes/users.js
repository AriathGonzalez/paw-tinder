const express = require("express");
// const { MongoClient } = require("mongodb");
// const { v4: uuidv4 } = require("uuid");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();
const { createUser } = require("../services/userService");

const router = express.Router();

const signupHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await createUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === "User already exists. Please login.") {
      res.status(409).send(error.message);
    } else {
      console.log(error);
      res.status(500).send("Internal server error: Could not create new user.");
    }
  }
};

router.post("/signup", signupHandler);

module.exports = router;
