import {createUser} from "./createUser";


const addMock = jest.fn();
jest.mock("../../index", () => ({
  firestore: {
    collection: jest.fn(() => ({
      add: addMock,
    })),
  },
}));

describe("create user", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create user successfully", async () => {
    const inputData = {name: "Valid Name"};
    addMock.mockResolvedValueOnce({id: "someValidId"});
    const result = await createUser(inputData);
    expect(result).toEqual({name: inputData.name, success: true});
  });
});
