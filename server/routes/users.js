const express = require("express");
const {
  createUser,
  loginUser,
  getUserById,
  getGenderedUsers,
  getMatchedUsers,
  updateUser,
  addMatchToUser,
} = require("../services/usersService");

const router = express.Router();

const signupHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await createUser(email, password);
    return res.status(201).json(user);
  } catch (error) {
    if (error.message === "User already exists. Please login.") {
      return res.status(409).send({ error: error.message });
    } else {
      console.error("Error during signup: ", error);
      res
        .status(500)
        .send({ error: "Internal server error: Could not create new user." });
    }
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    return res.status(201).json(user);
  } catch (error) {
    if (error.message === "Invalid credentials") {
      return res.status(400).json({ error: error.message });
    } else {
      console.error("Error during login:", error);
      return res
        .status(500)
        .json({ error: "Internal server error: Could not login user." });
    }
  }
};

const userHandler = async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await getUserById(userId);
    return res.status(200).json(user);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    } else {
      console.error("Error during getUser:", error);
      return res
        .status(500)
        .json({ error: "Internal server error: Could not retrieve user." });
    }
  }
};

const genderedUsersHandler = async (req, res) => {
  const gender = req.query.gender;

  try {
    const foundUsers = await getGenderedUsers(gender);
    return res.status(200).json(foundUsers);
  } catch (error) {
    if (error.message === "Gendered users not found") {
      return res.status(404).json({ error: error.message });
    } else {
      console.error("Error during getGenderedUsers:", error);
      return res.status(500).json({
        error: "Internal server error: Could not retrieve gendered users.",
      });
    }
  }
};

const matchedUsersHandler = async (req, res) => {
  const userIds = JSON.parse(req.query.userIds);
  try {
    const matchedUsers = await getMatchedUsers(userIds);
    return res.status(200).json(matchedUsers);
  } catch (error) {
    console.error("Error retrieving matched users:", error);
    return res.status(500).json({
      error: "Internal server error: Could not retrieve matched users.",
    });
  }
};

const updateUserHandler = async (req, res) => {
  const formData = req.body.formData;

  try {
    const updatedUser = await updateUser(formData);

    if (updatedUser.modifiedCount === 0) {
      return res.status(304).send("User details not modified");
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    } else {
      console.error("Error updating user details:", error);
      return res.status(500).json({
        error: "Internal server error: Could not update user details.",
      });
    }
  }
};

const addMatchToUserHandler = async (req, res) => {
  const { userId, matchedUserId } = req.body;
  try {
    const updatedUser = await addMatchToUser(userId, matchedUserId);
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ error: error.message });
    } else if (error.message === "User already matched") {
      return res.status(400).json({ error: error.message });
    } else {
      console.error("Error adding match to user:", error);
      return res
        .status(500)
        .json({ error: "Internal server error: Could not add match to user." });
    }
  }
};

router.post("/signup", signupHandler);
router.post("/login", loginHandler);

router.get("/user", userHandler);
router.get("/gendered_users", genderedUsersHandler);
router.get("/matched_users", matchedUsersHandler);

router.put("/", updateUserHandler);
router.put("/add_match", addMatchToUserHandler);

module.exports = router;
