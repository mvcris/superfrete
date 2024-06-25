import * as request from "supertest";
import app from "./server";
import {createUser} from "./cases/createUser";
import {ApiError} from "./middlewares/errorHandler";

jest.mock("./cases/createUser");

describe("server", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create user successfully", async () => {
    const inputData = {name: "Valid Name"};
    const mockOutput = {name: "Valid Name", success: true};
    (createUser as jest.Mock).mockResolvedValueOnce(mockOutput);

    const response = await request(app)
      .post("/users")
      .send(inputData)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockOutput);
    expect(createUser).toHaveBeenCalledTimes(1);
  });

  it("should be return bad request", async () => {
    const inputData = {};
    const response = await request(app)
      .post("/users")
      .send(inputData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(createUser).toHaveBeenCalledTimes(0);
  });

  it("should handle error", async () => {
    const inputData = {name: "Valid Name"};
    (createUser as jest.Mock)
      .mockRejectedValueOnce(new ApiError("firestore error", 500));
    const response = await request(app)
      .post("/users")
      .send(inputData);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({success: false, error: "firestore error"});
    expect(createUser).toHaveBeenCalledTimes(1);
  });
});
