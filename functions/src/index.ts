import {onRequest} from "firebase-functions/v2/https";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import server from "./http/server";
export * from "./triggers";

const app = initializeApp();

const firestore = getFirestore(app);

const httpApi = onRequest(server);

export {firestore, httpApi};
