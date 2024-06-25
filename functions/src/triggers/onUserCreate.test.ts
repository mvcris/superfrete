import {onUserCreate} from "./onUserCreate";
import * as firebaseFunctionsTest from "firebase-functions-test";
import {firestore} from "../index";
import {WrappedV2Function} from "firebase-functions-test/lib/v2";
const test = firebaseFunctionsTest();

firestore.settings({
  host: process.env.FIRESTORE_EMULATOR_HOST,
  ssl: false,
});

describe("onUserCreate", () => {
  let wrapped: WrappedV2Function<any>;

  beforeAll(() => {
    wrapped = test.wrap(onUserCreate);
  });

  beforeEach(async () => {
    const usersCollection = firestore.collection("users");
    const documents = await usersCollection.get();
    const batch = firestore.batch();
    documents.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  });

  afterAll(() => {
    test.cleanup();
  });

  it("should increment sequence and set increment_id", async () => {
    const sequenceRef = firestore.collection("users").doc("sequence");
    await sequenceRef.set({nextId: 1});
    const userRef = firestore.collection("users").doc();
    await userRef.set({name: "Some Name"});
    const event = {
      params: {documentId: userRef.id},
      data: {
        ref: userRef,
      },
    };
    await wrapped(event);
    const sequenceDoc = await sequenceRef.get();
    const newUserDoc = await userRef.get();
    expect(sequenceDoc.data()?.nextId).toBe(2);
    expect(newUserDoc.data()?.increment_id).toBe(1);
  });

  it("should throw error when sequence document does not exist", async () => {
    const newUserRef = firestore.collection("users").doc();
    await newUserRef.set({name: "Some Name"});
    const event = {
      params: {documentId: newUserRef.id},
      data: {
        ref: newUserRef,
      },
    };
    await expect(wrapped(event)).rejects.toThrow("Sequence does not exists");
  });

  it("ignore when documentId is sequence", async () => {
    const sequenceRef = firestore.collection("users").doc("sequence");
    await sequenceRef.set({nextId: 1});
    const event = {
      params: {documentId: "sequence"},
      data: {
        ref: firestore.collection("users").doc("sequence"),
      },
    };
    await wrapped(event);
    const sequenceDoc = await firestore
      .collection("users")
      .doc("sequence")
      .get();
    expect(sequenceDoc.data()?.nextId).toBe(1);
  });
});
