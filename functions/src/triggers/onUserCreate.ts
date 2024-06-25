import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {firestore} from "..";
import {FieldValue} from "firebase-admin/firestore";

export const onUserCreate = onDocumentCreated("users/{documentId}",
  async (event) => {
    if (event.params.documentId === "sequence") return;
    const counterRef = firestore
      .collection("users")
      .doc("sequence");
    const counterDoc = await counterRef.get();
    if (!counterDoc.exists) {
      throw new Error("Sequence does not exists");
    }
    const currentId = counterDoc.data()?.nextId;
    await counterRef.update({nextId: FieldValue.increment(1)});
    await event.data?.ref.update({increment_id: currentId});
  });
