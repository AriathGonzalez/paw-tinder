const PORT = 5000;

const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);

app.listen(PORT, () => console.log("Server running on port: ", PORT));
