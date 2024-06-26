const express = require("express");
const cors = require("cors");
const usersRouter = require("../routes/users");
const messagesRouter = require("../routes/messages");

const createServer = (uri) => {
  process.env.MONGODB_URI = uri;

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/users", usersRouter);
  app.use("/messages", messagesRouter);

  return app;
};

module.exports = createServer;
