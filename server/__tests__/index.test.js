const supertest = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const createServer = require("../utils/server");

let app;
let mongoServer;

const userData = {
  email: "api_test_email@text_example.com",
  password: "api_test_password",
};

describe("/users", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    app = createServer(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.db.collection("users").deleteMany({
      email: userData.email,
    });
  });

  describe("/signup", () => {
    describe("given an email and password", () => {
      it("should create a new user and respond with a 201 status code", async () => {
        const response = await supertest(app)
          .post("/users/signup")
          .send(userData)
          .expect(201);

        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("userId");
        expect(response.body).toHaveProperty("email");
      });
    });
    describe("when the email and password is missing", () => {
      it("should respond with a status code of 500", async () => {
        const response = await supertest(app)
          .post("/users/signup")
          .send({})
          .expect(500);

        expect(response.text).toBe(
          "Internal server error: Could not create new user."
        );
      });
    });
  });

  describe("/", () => {
    describe("when user already exists", () => {
      it("should return 409 if user already exists", async () => {
        await supertest(app).post("/users/signup").send(userData);

        // Try to create the same user again
        const response = await supertest(app)
          .post("/users/signup")
          .send(userData)
          .expect(409);

        expect(response.text).toBe("User already exists. Please login.");
      });
    });
  });
});
