const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (email, password) => {
  const client = new MongoClient(process.env.MONGODB_URI);
  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists. Please login.");
    }

    const sanitizedEmail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    await users.insertOne(data);
    const token = jwt.sign({ userId: generatedUserId }, sanitizedEmail, {
      expiresIn: "1d",
    });

    return { token, userId: generatedUserId, email: sanitizedEmail };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.close();
  }
};

module.exports = { createUser };
