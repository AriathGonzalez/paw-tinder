const express = require("express");
const cors = require("cors");
const usersRouter = require("../routes/users");

const createServer = (uri) => {
  process.env.MONGODB_URI = uri;

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/users", usersRouter);

  return app;
};

module.exports = createServer;
