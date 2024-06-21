const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vjw0oxa.mongodb.net/`;

router.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login.");
    }

    const santizedEmail = email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: santizedEmail,
      hashed_password: hashedPassword,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, santizedEmail, {
      expiresIn: "1d",
    });

    console.log("SUCCESS: Created new user: ", insertedUser);
    res
      .status(201)
      .json({ token, userId: generatedUserId, email: santizedEmail });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error: Could not create new user.");
  } finally {
    await client.close();
  }
});

router.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
});

module.exports = router;
