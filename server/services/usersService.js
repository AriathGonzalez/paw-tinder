const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

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

    return { token, userId: generatedUserId };
  } catch (error) {
    console.error("Caught error in createUser:", error);
    throw error;
  } finally {
    await client.close();
  }
};

const loginUser = async (email, password) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("app-data");
    const usersCollection = database.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.hashed_password
    );
    if (!passwordMatches) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.user_id }, email, {
      expiresIn: "1d",
    });

    return { token, userId: user.user_id };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  } finally {
    await client.close();
  }
};

const getUserById = async (userId) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("app-data");
    const usersCollection = database.collection("users");

    const user = await usersCollection.findOne({ user_id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  } finally {
    await client.close();
  }
};

const getGenderedUsers = async (gender) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("app-data");
    const usersCollection = database.collection("users");

    const query = { gender_identity: { $eq: gender } };
    const foundUsers = await usersCollection.find(query).toArray();

    if (!foundUsers.length) {
      throw new Error("Gendered users not found");
    }

    return foundUsers;
  } catch (error) {
    console.error("Error retrieving gendered users:", error);
    throw error;
  } finally {
    await client.close();
  }
};

const getMatchedUsers = async (userIds) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("app-data");
    const usersCollection = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const matchedUsers = await usersCollection.aggregate(pipeline).toArray();
    console.log("services-MatchedUsers: ", matchedUsers);
    return matchedUsers;
  } catch (error) {
    console.error("Error fetching matched users:", error);
    throw error;
  } finally {
    await client.close();
  }
};

const updateUser = async (formData) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("app-data");
    const usersCollection = database.collection("users");

    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };

    const updatedUser = await usersCollection.updateOne(query, updateDocument);

    if (updatedUser.matchedCount === 0) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  } finally {
    await client.close();
  }
};

const addMatchToUser = async (userId, matchedUserId) => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db("app-data");
    const usersCollection = database.collection("users");

    const query = { user_id: userId };
    const user = await usersCollection.findOne(query);

    if (!user) {
      throw new Error("User not found");
    }

    const alreadyMatched = user.matches.some(
      (match) => match.user_id === matchedUserId
    );

    if (alreadyMatched) {
      throw new Error("User already matched");
    }

    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };

    const updatedUser = await usersCollection.updateOne(query, updateDocument);
    return updatedUser;
  } catch (error) {
    console.error("Error adding match to user:", error);
    throw error;
  } finally {
    await client.close();
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserById,
  getGenderedUsers,
  getMatchedUsers,
  updateUser,
  addMatchToUser,
};
