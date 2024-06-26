const express = require("express");
const { getMessages, insertMessage } = require("../services/messagesService");
const router = express.Router();

const messagesHandler = async (req, res) => {
  const { userId, correspondingUserId } = req.query;

  try {
    const foundMessages = await getMessages(userId, correspondingUserId);
    res.status(200).json(foundMessages);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error: Could not retrieve messages." });
  }
};

const messageHandler = async (req, res) => {
  const message = req.body.message;

  try {
    const insertedMessage = await insertMessage(message);
    res.status(200).json(insertedMessage);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error: Could not insert message." });
  }
};

router.get("/", messagesHandler);
router.post("/message", messageHandler);

module.exports = router;
