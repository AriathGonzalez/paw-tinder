const PORT = 5000;
const dotenv = require("dotenv");
dotenv.config();
const createServer = require("./utils/server");
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vjw0oxa.mongodb.net/`;
const app = createServer(uri);

app.listen(PORT, () => console.log("Server running on port: ", PORT));
